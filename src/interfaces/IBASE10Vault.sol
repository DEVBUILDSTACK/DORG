// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title IBASE10Vault
 * @notice Interface for the BASE10 Vault
 * @dev Extends ERC4626 with multi-token portfolio management
 */
interface IBASE10Vault {
    /* ========== EVENTS ========== */

    event TokenAdded(address indexed token, uint256 weightBps);
    event TokenRemoved(address indexed token);
    event WeightsUpdated(address[] tokens, uint256[] weights);
    event Rebalanced(uint256 timestamp, uint256 portfolioValue);
    event FeeCollected(address indexed recipient, uint256 amount);
    event PauseLevelChanged(uint8 indexed previousLevel, uint8 indexed newLevel);
    event FeeRecipientUpdated(address indexed oldRecipient, address indexed newRecipient);
    event ManagementFeeUpdated(uint256 oldFeeBps, uint256 newFeeBps);

    /* ========== ERRORS ========== */

    error InvalidToken();
    error TokenAlreadyExists();
    error TokenNotFound();
    error InvalidWeights();
    error WeightsSumExceeds10000();
    error RebalanceTooSoon();
    error SlippageExceeded();
    error InvalidFeeRecipient();
    error InvalidFeeBps();
    error MaxTokensExceeded();
    error InsufficientBalance();
    error ZeroAmount();
    error ZeroAddress();
    error PausedAtLevel(uint8 level);
    error InvalidPauseLevel();

    /* ========== STRUCTS ========== */

    struct TokenInfo {
        address token;
        uint256 weightBps; // Basis points (10000 = 100%)
        uint8 decimals;
        bool active;
    }

    struct RebalanceIntent {
        address[] tokensToSell;
        address[] tokensToBuy;
        uint256[] sellAmounts;
        uint256[] minBuyAmounts;
        bytes[] swapCalldata;
        uint256 deadline;
        bytes32 intentHash;
    }

    /* ========== PORTFOLIO MANAGEMENT ========== */

    function addToken(address token, uint256 weightBps) external;
    function removeToken(address token) external;
    function updateWeights(address[] calldata tokens, uint256[] calldata weights) external;
    function getSupportedTokens() external view returns (address[] memory);
    function getTokenWeight(address token) external view returns (uint256);
    function getPortfolioValue() external view returns (uint256);

    /* ========== REBALANCING ========== */

    function executeRebalance(RebalanceIntent calldata intent, bytes calldata signature) external;
    function canRebalance() external view returns (bool);
    function getLastRebalanceTime() external view returns (uint256);

    /* ========== FEE MANAGEMENT ========== */

    function collectFees() external;
    function setFeeRecipient(address newRecipient) external;
    function setManagementFee(uint256 newFeeBps) external;
    function getAccruedFees() external view returns (uint256);

    /* ========== EMERGENCY CONTROLS ========== */

    function setPauseLevel(uint8 level) external;
    function emergencyWithdraw(address receiver) external returns (uint256[] memory amounts);
    function getPauseLevel() external view returns (uint8);
}
