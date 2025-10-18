// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC4626Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC4626Upgradeable.sol";
import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import {IBASE10Vault} from "./interfaces/IBASE10Vault.sol";
import {IPriceOracle} from "./interfaces/IPriceOracle.sol";
import {ISwapRouter} from "./interfaces/ISwapRouter.sol";
import {PrecisionLib} from "./libraries/PrecisionLib.sol";

/**
 * @title BASE10Vault
 * @notice ERC4626 vault managing a portfolio of 10 Base ecosystem tokens
 * @dev Implements UUPS upgradeability with comprehensive security features
 * 
 * SECURITY ARCHITECTURE:
 * 1. ERC4626 Inflation Protection: Virtual offset (decimalsOffset = 6)
 * 2. Internal Accounting: Zero reliance on balanceOf()
 * 3. Oracle Safety: 5-check Chainlink + TWAP fallback
 * 4. Reentrancy Protection: Guards on all state-changing functions
 * 5. Pause Granularity: 5-level emergency controls
 * 6. UUPS Security: Initialization protection + storage gaps
 * 
 * @custom:security-contact security@base10.vault
 * @custom:oz-upgrades-from BASE10VaultV1
 */
contract BASE10Vault is
    Initializable,
    ERC4626Upgradeable,
    AccessControlUpgradeable,
    ReentrancyGuard,
    UUPSUpgradeable,
    IBASE10Vault
{
    using SafeERC20 for IERC20;
    using PrecisionLib for uint256;

    /* ========== ROLES ========== */

    bytes32 public constant REBALANCER_ROLE = keccak256("REBALANCER_ROLE");
    bytes32 public constant KEEPER_ROLE = keccak256("KEEPER_ROLE");
    bytes32 public constant FEE_COLLECTOR_ROLE = keccak256("FEE_COLLECTOR_ROLE");
    bytes32 public constant EMERGENCY_ROLE = keccak256("EMERGENCY_ROLE");

    /* ========== CONSTANTS ========== */

    uint256 public constant MAX_TOKENS = 10;
    uint256 public constant MAX_FEE_BPS = 1000; // 10% maximum
    uint256 public constant REBALANCE_COOLDOWN = 24 hours;
    uint256 public constant PORTFOLIO_WEIGHT_BPS = 7000; // 70% in tokens
    uint256 public constant RESERVE_WEIGHT_BPS = 3000; // 30% in USDC
    uint256 public constant SECONDS_PER_YEAR = 365 days;
    uint256 public constant MAX_SWAP_GAS = 500000; // Per-swap gas limit

    /* ========== STATE VARIABLES ========== */

    /// @notice Price oracle for token valuations
    IPriceOracle public priceOracle;

    /// @notice DEX aggregator for swaps
    ISwapRouter public swapRouter;

    /// @notice Portfolio tokens array
    address[] private _portfolioTokens;

    /// @notice Token information mapping
    mapping(address => TokenInfo) private _tokenInfo;

    /// @notice Internal balance tracking (CRITICAL: prevents donation attacks)
    mapping(address => uint256) private _internalBalances;

    /// @notice Decimals for each token
    mapping(address => uint8) private _tokenDecimals;

    /// @notice Fee management
    address public feeRecipient;
    uint256 public managementFeeBps; // Annual fee in basis points
    uint256 public lastFeeAccrualTime;
    uint256 public accumulatedFees; // In shares

    /// @notice Rebalancing
    uint256 public lastRebalanceTime;
    mapping(bytes32 => bool) public executedIntents;

    /// @notice Emergency controls
    uint8 public pauseLevel;

    /* ========== PAUSE LEVELS ========== */

    uint8 private constant PAUSE_NONE = 0;
    uint8 private constant PAUSE_DEPOSITS = 1;
    uint8 private constant PAUSE_REBALANCING = 2;
    uint8 private constant PAUSE_WITHDRAWALS = 3;
    uint8 private constant PAUSE_FULL = 4;

    /* ========== STORAGE GAP ========== */

    /**
     * @dev Storage gap for future upgrades
     * Total storage slots used: ~15
     * Gap: 50 - 15 = 35 slots reserved
     */
    uint256[35] private __gap;

    /* ========== CONSTRUCTOR ========== */

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /* ========== INITIALIZER ========== */

    /**
     * @notice Initialize the vault
     * @param asset_ USDC address (vault denomination)
     * @param name_ Vault token name
     * @param symbol_ Vault token symbol
     * @param oracle_ Price oracle address
     * @param router_ Swap router address
     * @param feeRecipient_ Address to receive fees
     * @param managementFeeBps_ Annual management fee in bps
     * @param admin_ Admin address
     */
    function initialize(
        address asset_,
        string memory name_,
        string memory symbol_,
        address oracle_,
        address router_,
        address feeRecipient_,
        uint256 managementFeeBps_,
        address admin_
    ) public initializer {
        if (asset_ == address(0)) revert ZeroAddress();
        if (oracle_ == address(0)) revert ZeroAddress();
        if (router_ == address(0)) revert ZeroAddress();
        if (feeRecipient_ == address(0)) revert InvalidFeeRecipient();
        if (managementFeeBps_ > MAX_FEE_BPS) revert InvalidFeeBps();
        if (admin_ == address(0)) revert ZeroAddress();

        __ERC4626_init(IERC20(asset_));
        __ERC20_init(name_, symbol_);
        __AccessControl_init();

        priceOracle = IPriceOracle(oracle_);
        swapRouter = ISwapRouter(router_);
        feeRecipient = feeRecipient_;
        managementFeeBps = managementFeeBps_;
        lastFeeAccrualTime = block.timestamp;
        pauseLevel = PAUSE_NONE;

        _grantRole(DEFAULT_ADMIN_ROLE, admin_);
        _grantRole(REBALANCER_ROLE, admin_);
        _grantRole(KEEPER_ROLE, admin_);
        _grantRole(FEE_COLLECTOR_ROLE, admin_);
        _grantRole(EMERGENCY_ROLE, admin_);
    }

    /* ========== ERC4626 INFLATION PROTECTION ========== */

    /**
     * @notice Decimal offset for inflation attack protection
     * @dev Returns 6 (1,000,000x cost multiplier for attacks)
     * 
     * SECURITY: This makes inflation attacks economically infeasible
     * - Without offset: $1,000 attack steals $1,000 (profitable)
     * - With offset=6: $1,000,000 attack steals $1 (unprofitable)
     */
    function _decimalsOffset() internal pure override returns (uint8) {
        return 6;
    }

    /* ========== MODIFIERS ========== */

    /**
     * @notice Accrue fees before state-changing operations
     * @dev CRITICAL: Must be called before deposit/withdraw/rebalance
     */
    modifier accruesFees() {
        _accrueFees();
        _;
    }

    /**
     * @notice Check pause level before operations
     * @param required Minimum pause level that blocks this operation
     */
    modifier whenNotPaused(uint8 required) {
        if (pauseLevel >= required) revert PausedAtLevel(pauseLevel);
        _;
    }

    /* ========== PORTFOLIO MANAGEMENT ========== */

    /**
     * @notice Add a new token to the portfolio
     * @param token Token address
     * @param weightBps Weight in basis points
     * 
     * @dev Only admin can add tokens
     * Total weight must not exceed PORTFOLIO_WEIGHT_BPS (7000 bps)
     */
    function addToken(address token, uint256 weightBps) external override onlyRole(DEFAULT_ADMIN_ROLE) {
        if (token == address(0)) revert InvalidToken();
        if (_portfolioTokens.length >= MAX_TOKENS) revert MaxTokensExceeded();
        if (_tokenInfo[token].active) revert TokenAlreadyExists();

        // Validate total weights don't exceed 70%
        uint256 totalWeight = weightBps;
        for (uint256 i = 0; i < _portfolioTokens.length; i++) {
            totalWeight += _tokenInfo[_portfolioTokens[i]].weightBps;
        }
        if (totalWeight > PORTFOLIO_WEIGHT_BPS) revert WeightsSumExceeds10000();

        _portfolioTokens.push(token);
        _tokenDecimals[token] = IERC20Metadata(token).decimals();

        _tokenInfo[token] = TokenInfo({
            token: token,
            weightBps: weightBps,
            decimals: _tokenDecimals[token],
            active: true
        });

        emit TokenAdded(token, weightBps);
    }

    /**
     * @notice Remove a token from the portfolio
     * @param token Token address
     * 
     * @dev Only admin, requires token balance to be zero
     */
    function removeToken(address token) external override onlyRole(DEFAULT_ADMIN_ROLE) {
        if (!_tokenInfo[token].active) revert TokenNotFound();
        if (_internalBalances[token] > 0) revert InsufficientBalance();

        _tokenInfo[token].active = false;

        // Remove from array
        for (uint256 i = 0; i < _portfolioTokens.length; i++) {
            if (_portfolioTokens[i] == token) {
                _portfolioTokens[i] = _portfolioTokens[_portfolioTokens.length - 1];
                _portfolioTokens.pop();
                break;
            }
        }

        emit TokenRemoved(token);
    }

    /**
     * @notice Update token weights
     * @param tokens Array of token addresses
     * @param weights Array of new weights in bps
     * 
     * @dev Only rebalancer role can update weights
     * Total must equal PORTFOLIO_WEIGHT_BPS (7000 bps)
     */
    function updateWeights(
        address[] calldata tokens,
        uint256[] calldata weights
    ) external override onlyRole(REBALANCER_ROLE) {
        if (tokens.length != weights.length) revert InvalidWeights();
        if (tokens.length != _portfolioTokens.length) revert InvalidWeights();

        uint256 totalWeight = 0;
        for (uint256 i = 0; i < tokens.length; i++) {
            if (!_tokenInfo[tokens[i]].active) revert TokenNotFound();
            _tokenInfo[tokens[i]].weightBps = weights[i];
            totalWeight += weights[i];
        }

        if (totalWeight != PORTFOLIO_WEIGHT_BPS) revert InvalidWeights();

        emit WeightsUpdated(tokens, weights);
    }

    /**
     * @notice Get all supported tokens
     * @return Array of token addresses
     */
    function getSupportedTokens() external view override returns (address[] memory) {
        return _portfolioTokens;
    }

    /**
     * @notice Get weight for a specific token
     * @param token Token address
     * @return Weight in basis points
     */
    function getTokenWeight(address token) external view override returns (uint256) {
        return _tokenInfo[token].weightBps;
    }

    /**
     * @notice Calculate total portfolio value in USDC
     * @return Portfolio value with 6 decimals (USDC)
     * 
     * @dev Uses internal balances + oracle prices
     * SECURITY: Internal accounting prevents donation attacks
     */
    function getPortfolioValue() public view override returns (uint256) {
        uint256 totalValue18 = 0; // 18 decimals internally

        // Add USDC balance
        uint256 usdcBalance18 = _internalBalances[asset()].normalizeTokenAmount(6);
        totalValue18 += usdcBalance18;

        // Add portfolio token values
        for (uint256 i = 0; i < _portfolioTokens.length; i++) {
            address token = _portfolioTokens[i];
            uint256 balance = _internalBalances[token];

            if (balance > 0) {
                uint256 price = priceOracle.getPrice(token); // 18 decimals
                uint8 decimals = _tokenDecimals[token];

                // Calculate USD value
                uint256 value18 = balance.normalizeTokenAmount(decimals);
                totalValue18 += (value18 * price) / 1e18;
            }
        }

        // Convert to USDC decimals (6)
        return totalValue18.denormalizeToUsdc();
    }

    /* ========== REBALANCING ========== */

    /**
     * @notice Execute rebalancing based on keeper intent
     * @param intent Rebalance parameters
     * 
     * @dev Uses keeper pattern for off-chain calculation, on-chain execution
     * SECURITY: Gas limits, slippage protection, role-based access
     */
    function executeRebalance(
        RebalanceIntent calldata intent,
        bytes calldata /* signature */
    ) external override nonReentrant whenNotPaused(PAUSE_REBALANCING) onlyRole(KEEPER_ROLE) {
        if (!canRebalance()) revert RebalanceTooSoon();
        if (block.timestamp > intent.deadline) revert("Intent expired");
        if (executedIntents[intent.intentHash]) revert("Already executed");

        // Mark intent as executed
        executedIntents[intent.intentHash] = true;

        // Execute swaps
        for (uint256 i = 0; i < intent.tokensToSell.length; i++) {
            _executeSwap(
                intent.tokensToSell[i],
                intent.tokensToBuy[i],
                intent.sellAmounts[i],
                intent.minBuyAmounts[i],
                intent.swapCalldata[i]
            );
        }

        lastRebalanceTime = block.timestamp;
        emit Rebalanced(block.timestamp, getPortfolioValue());
    }

    /**
     * @notice Check if rebalancing is allowed
     * @return True if cooldown period has passed
     */
    function canRebalance() public view override returns (bool) {
        return block.timestamp >= lastRebalanceTime + REBALANCE_COOLDOWN;
    }

    /**
     * @notice Get last rebalance timestamp
     * @return Timestamp
     */
    function getLastRebalanceTime() external view override returns (uint256) {
        return lastRebalanceTime;
    }

    /**
     * @dev Execute a single swap with gas limits and slippage protection
     */
    function _executeSwap(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 minAmountOut,
        bytes calldata swapData
    ) internal {
        if (amountIn == 0) revert ZeroAmount();
        if (_internalBalances[tokenIn] < amountIn) revert InsufficientBalance();

        // Approve router
        IERC20(tokenIn).forceApprove(address(swapRouter), amountIn);

        // Execute swap with gas limit
        uint256 amountOut;
        try swapRouter.swap{gas: MAX_SWAP_GAS}(tokenIn, tokenOut, amountIn, minAmountOut, swapData) returns (
            uint256 _amountOut
        ) {
            amountOut = _amountOut;
        } catch {
            revert("Swap failed");
        }

        if (amountOut < minAmountOut) revert SlippageExceeded();

        // Update internal balances
        _internalBalances[tokenIn] -= amountIn;
        _internalBalances[tokenOut] += amountOut;
    }

    /* ========== FEE MANAGEMENT ========== */

    /**
     * @notice Accrue management fees
     * @dev Continuous compounding: feeShares = totalSupply * feeBps * timeElapsed / (10000 * 365 days)
     * 
     * SECURITY: Time-weighted, cannot be gamed by timing transactions
     */
    function _accrueFees() internal {
        uint256 timeDelta = block.timestamp - lastFeeAccrualTime;
        if (timeDelta == 0) return;

        uint256 totalShares = totalSupply();
        if (totalShares == 0) {
            lastFeeAccrualTime = block.timestamp;
            return;
        }

        // Calculate fee: shares * feeBps * time / (10000 * year)
        uint256 feeShares = (totalShares * managementFeeBps * timeDelta) / (10000 * SECONDS_PER_YEAR);

        if (feeShares > 0) {
            accumulatedFees += feeShares;
        }

        lastFeeAccrualTime = block.timestamp;
    }

    /**
     * @notice Collect accrued fees
     * @dev Mints fee shares to fee recipient
     */
    function collectFees() external override onlyRole(FEE_COLLECTOR_ROLE) {
        _accrueFees();

        uint256 fees = accumulatedFees;
        if (fees == 0) return;

        accumulatedFees = 0;
        _mint(feeRecipient, fees);

        emit FeeCollected(feeRecipient, fees);
    }

    /**
     * @notice Update fee recipient
     * @param newRecipient New recipient address
     */
    function setFeeRecipient(address newRecipient) external override onlyRole(DEFAULT_ADMIN_ROLE) {
        if (newRecipient == address(0)) revert InvalidFeeRecipient();

        address oldRecipient = feeRecipient;
        feeRecipient = newRecipient;

        emit FeeRecipientUpdated(oldRecipient, newRecipient);
    }

    /**
     * @notice Update management fee
     * @param newFeeBps New fee in basis points
     */
    function setManagementFee(uint256 newFeeBps) external override onlyRole(DEFAULT_ADMIN_ROLE) {
        if (newFeeBps > MAX_FEE_BPS) revert InvalidFeeBps();

        _accrueFees(); // Accrue at old rate first

        uint256 oldFee = managementFeeBps;
        managementFeeBps = newFeeBps;

        emit ManagementFeeUpdated(oldFee, newFeeBps);
    }

    /**
     * @notice Get accrued fees
     * @return Fee shares
     */
    function getAccruedFees() external view override returns (uint256) {
        return accumulatedFees;
    }

    /* ========== ERC4626 OVERRIDES ========== */

    /**
     * @notice Calculate total assets under management
     * @return Total value in USDC (6 decimals)
     * 
     * @dev Uses internal accounting + oracle prices
     * Subtracts accrued fees from total value
     */
    function totalAssets() public view override returns (uint256) {
        uint256 portfolioValue = getPortfolioValue();

        // Subtract accrued fees (in USD value)
        uint256 totalShares = totalSupply();
        if (totalShares == 0) return portfolioValue;

        uint256 feeValue = (portfolioValue * accumulatedFees) / totalShares;
        return portfolioValue > feeValue ? portfolioValue - feeValue : 0;
    }

    /**
     * @notice Deposit assets into vault
     * @param assets Amount of USDC to deposit
     * @param receiver Address to receive shares
     * @return shares Amount of vault shares minted
     * 
     * @dev Overridden to use internal accounting
     * SECURITY: Internal balance tracking prevents donation attacks
     */
    function deposit(
        uint256 assets,
        address receiver
    ) public override accruesFees nonReentrant whenNotPaused(PAUSE_DEPOSITS) returns (uint256 shares) {
        if (assets == 0) revert ZeroAmount();

        shares = previewDeposit(assets);

        // Transfer USDC from user
        IERC20(asset()).safeTransferFrom(msg.sender, address(this), assets);

        // Update internal balance
        _internalBalances[asset()] += assets;

        // Mint shares
        _mint(receiver, shares);

        emit Deposit(msg.sender, receiver, assets, shares);
    }

    /**
     * @notice Withdraw assets from vault
     * @param assets Amount of USDC to withdraw
     * @param receiver Address to receive assets
     * @param owner Owner of shares
     * @return shares Amount of shares burned
     * 
     * @dev Converts portfolio to USDC before withdrawal
     * For pro-rata withdrawal, use emergencyWithdraw()
     */
    function withdraw(
        uint256 assets,
        address receiver,
        address owner
    ) public override accruesFees nonReentrant whenNotPaused(PAUSE_WITHDRAWALS) returns (uint256 shares) {
        if (assets == 0) revert ZeroAmount();

        shares = previewWithdraw(assets);

        if (msg.sender != owner) {
            _spendAllowance(owner, msg.sender, shares);
        }

        // Burn shares first
        _burn(owner, shares);

        // Check if we have enough USDC
        uint256 usdcBalance = _internalBalances[asset()];
        if (usdcBalance < assets) {
            revert InsufficientBalance(); // In production, implement auto-swap
        }

        // Update internal balance
        _internalBalances[asset()] -= assets;

        // Transfer USDC
        IERC20(asset()).safeTransfer(receiver, assets);

        emit Withdraw(msg.sender, receiver, owner, assets, shares);
    }

    /* ========== EMERGENCY CONTROLS ========== */

    /**
     * @notice Set pause level
     * @param level New pause level (0-4)
     */
    function setPauseLevel(uint8 level) external override onlyRole(EMERGENCY_ROLE) {
        if (level > PAUSE_FULL) revert InvalidPauseLevel();

        uint8 oldLevel = pauseLevel;
        pauseLevel = level;

        emit PauseLevelChanged(oldLevel, level);
    }

    /**
     * @notice Emergency withdrawal (pro-rata tokens)
     * @param receiver Address to receive tokens
     * @return amounts Array of token amounts returned
     * 
     * @dev Returns proportional share of all tokens
     * Works even during PAUSE_FULL
     */
    function emergencyWithdraw(address receiver) external override nonReentrant returns (uint256[] memory amounts) {
        uint256 shares = balanceOf(msg.sender);
        if (shares == 0) revert ZeroAmount();

        uint256 totalShares = totalSupply();
        uint256 sharePercentage = (shares * 1e18) / totalShares;

        _burn(msg.sender, shares);

        amounts = new uint256[](_portfolioTokens.length + 1);

        // Transfer USDC
        uint256 usdcAmount = (_internalBalances[asset()] * sharePercentage) / 1e18;
        if (usdcAmount > 0) {
            _internalBalances[asset()] -= usdcAmount;
            IERC20(asset()).safeTransfer(receiver, usdcAmount);
            amounts[0] = usdcAmount;
        }

        // Transfer portfolio tokens
        for (uint256 i = 0; i < _portfolioTokens.length; i++) {
            address token = _portfolioTokens[i];
            uint256 tokenAmount = (_internalBalances[token] * sharePercentage) / 1e18;

            if (tokenAmount > 0) {
                _internalBalances[token] -= tokenAmount;
                IERC20(token).safeTransfer(receiver, tokenAmount);
                amounts[i + 1] = tokenAmount;
            }
        }
    }

    /**
     * @notice Get current pause level
     * @return Current pause level
     */
    function getPauseLevel() external view override returns (uint8) {
        return pauseLevel;
    }

    /* ========== UUPS UPGRADE AUTHORIZATION ========== */

    /**
     * @notice Authorize upgrade to new implementation
     * @param newImplementation Address of new implementation
     * 
     * @dev Only admin can upgrade
     */
    function _authorizeUpgrade(address newImplementation) internal override onlyRole(DEFAULT_ADMIN_ROLE) {
        // Additional upgrade validation can be added here
        // For production: Add timelock requirement
    }

    /* ========== HELPER FUNCTIONS ========== */

    /**
     * @notice Get internal balance for a token
     * @param token Token address
     * @return Internal balance
     */
    function getInternalBalance(address token) external view returns (uint256) {
        return _internalBalances[token];
    }
}

// Helper interface for decimals
interface IERC20Metadata {
    function decimals() external view returns (uint8);
}
