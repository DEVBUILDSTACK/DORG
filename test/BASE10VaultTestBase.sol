// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {console2} from "forge-std/console2.sol";

import {BASE10Vault} from "../src/BASE10Vault.sol";
import {PriceOracle} from "../src/PriceOracle.sol";
import {MockERC20} from "../src/mocks/MockERC20.sol";
import {MockSwapRouter} from "../src/mocks/MockSwapRouter.sol";
import {MockChainlinkOracle} from "../src/mocks/MockChainlinkOracle.sol";

import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

/**
 * @title BASE10VaultTestBase
 * @notice Base test contract with all setup logic
 * @dev Provides common test infrastructure for all test suites
 */
abstract contract BASE10VaultTestBase is Test {
    /* ========== STATE VARIABLES ========== */

    BASE10Vault public vault;
    BASE10Vault public implementation;
    ERC1967Proxy public proxy;
    PriceOracle public priceOracle;
    MockSwapRouter public swapRouter;

    MockERC20 public usdc;

    // 10 Base ecosystem tokens
    MockERC20 public aero; // Aerodrome
    MockERC20 public bswp; // BaseSwap
    MockERC20 public seam; // Seamless
    MockERC20 public well; // MoonWell
    MockERC20 public extra; // Extra Finance
    MockERC20 public paint; // BasePaint
    MockERC20 public degen; // Degen
    MockERC20 public brett; // Brett
    MockERC20 public toshi; // Toshi
    MockERC20 public normie; // Normie

    // Chainlink oracles for each token
    MockChainlinkOracle public aeroOracle;
    MockChainlinkOracle public bswpOracle;
    MockChainlinkOracle public seamOracle;
    MockChainlinkOracle public wellOracle;
    MockChainlinkOracle public extraOracle;
    MockChainlinkOracle public paintOracle;
    MockChainlinkOracle public degenOracle;
    MockChainlinkOracle public brettOracle;
    MockChainlinkOracle public toshiOracle;
    MockChainlinkOracle public normieOracle;

    /* ========== TEST ACTORS ========== */

    address public admin;
    address public keeper;
    address public rebalancer;
    address public feeCollector;
    address public emergencyAdmin;
    address public alice;
    address public bob;
    address public charlie;
    address public attacker;

    /* ========== CONSTANTS ========== */

    uint256 constant INITIAL_USDC_SUPPLY = 1_000_000e6; // 1M USDC
    uint256 constant INITIAL_TOKEN_SUPPLY = 10_000_000e18; // 10M tokens

    /* ========== SETUP ========== */

    function setUp() public virtual {
        // Setup test actors
        admin = makeAddr("admin");
        keeper = makeAddr("keeper");
        rebalancer = makeAddr("rebalancer");
        feeCollector = makeAddr("feeCollector");
        emergencyAdmin = makeAddr("emergencyAdmin");
        alice = makeAddr("alice");
        bob = makeAddr("bob");
        charlie = makeAddr("charlie");
        attacker = makeAddr("attacker");

        // Deploy USDC (6 decimals)
        usdc = new MockERC20("USD Coin", "USDC", 6);

        // Deploy 10 Base ecosystem tokens (18 decimals)
        aero = new MockERC20("Aerodrome", "AERO", 18);
        bswp = new MockERC20("BaseSwap", "BSWP", 18);
        seam = new MockERC20("Seamless", "SEAM", 18);
        well = new MockERC20("MoonWell", "WELL", 18);
        extra = new MockERC20("Extra Finance", "EXTRA", 18);
        paint = new MockERC20("BasePaint", "PAINT", 18);
        degen = new MockERC20("Degen", "DEGEN", 18);
        brett = new MockERC20("Brett", "BRETT", 18);
        toshi = new MockERC20("Toshi", "TOSHI", 18);
        normie = new MockERC20("Normie", "NORMIE", 18);

        // Deploy Chainlink oracles (8 decimals)
        aeroOracle = new MockChainlinkOracle(8, "AERO/USD");
        bswpOracle = new MockChainlinkOracle(8, "BSWP/USD");
        seamOracle = new MockChainlinkOracle(8, "SEAM/USD");
        wellOracle = new MockChainlinkOracle(8, "WELL/USD");
        extraOracle = new MockChainlinkOracle(8, "EXTRA/USD");
        paintOracle = new MockChainlinkOracle(8, "PAINT/USD");
        degenOracle = new MockChainlinkOracle(8, "DEGEN/USD");
        brettOracle = new MockChainlinkOracle(8, "BRETT/USD");
        toshiOracle = new MockChainlinkOracle(8, "TOSHI/USD");
        normieOracle = new MockChainlinkOracle(8, "NORMIE/USD");

        // Set initial prices (all $1.00)
        _setInitialPrices();

        // Deploy price oracle
        priceOracle = new PriceOracle(admin);

        // Setup price feeds
        vm.startPrank(admin);
        priceOracle.setPriceFeed(address(aero), address(aeroOracle));
        priceOracle.setPriceFeed(address(bswp), address(bswpOracle));
        priceOracle.setPriceFeed(address(seam), address(seamOracle));
        priceOracle.setPriceFeed(address(well), address(wellOracle));
        priceOracle.setPriceFeed(address(extra), address(extraOracle));
        priceOracle.setPriceFeed(address(paint), address(paintOracle));
        priceOracle.setPriceFeed(address(degen), address(degenOracle));
        priceOracle.setPriceFeed(address(brett), address(brettOracle));
        priceOracle.setPriceFeed(address(toshi), address(toshiOracle));
        priceOracle.setPriceFeed(address(normie), address(normieOracle));
        vm.stopPrank();

        // Deploy swap router
        swapRouter = new MockSwapRouter();

        // Deploy vault implementation
        implementation = new BASE10Vault();

        // Deploy proxy
        bytes memory initData = abi.encodeWithSelector(
            BASE10Vault.initialize.selector,
            address(usdc), // asset
            "BASE10 Vault", // name
            "BASE10", // symbol
            address(priceOracle), // oracle
            address(swapRouter), // router
            feeCollector, // fee recipient
            200, // 2% annual management fee
            admin // admin
        );

        proxy = new ERC1967Proxy(address(implementation), initData);
        vault = BASE10Vault(address(proxy));

        // Grant additional roles
        vm.startPrank(admin);
        vault.grantRole(vault.KEEPER_ROLE(), keeper);
        vault.grantRole(vault.REBALANCER_ROLE(), rebalancer);
        vault.grantRole(vault.EMERGENCY_ROLE(), emergencyAdmin);
        vault.grantRole(vault.FEE_COLLECTOR_ROLE(), feeCollector);
        vm.stopPrank();

        // Mint initial tokens to test users
        _mintInitialTokens();
    }

    /* ========== HELPER FUNCTIONS ========== */

    function _setInitialPrices() internal {
        // Set all tokens to $1.00 (8 decimals = 1e8)
        aeroOracle.setPrice(1e8);
        bswpOracle.setPrice(1e8);
        seamOracle.setPrice(1e8);
        wellOracle.setPrice(1e8);
        extraOracle.setPrice(1e8);
        paintOracle.setPrice(1e8);
        degenOracle.setPrice(1e8);
        brettOracle.setPrice(1e8);
        toshiOracle.setPrice(1e8);
        normieOracle.setPrice(1e8);
    }

    function _mintInitialTokens() internal {
        // Mint USDC to users
        usdc.mint(alice, INITIAL_USDC_SUPPLY);
        usdc.mint(bob, INITIAL_USDC_SUPPLY);
        usdc.mint(charlie, INITIAL_USDC_SUPPLY);
        usdc.mint(attacker, INITIAL_USDC_SUPPLY);

        // Mint portfolio tokens for swap router
        aero.mint(address(swapRouter), INITIAL_TOKEN_SUPPLY);
        bswp.mint(address(swapRouter), INITIAL_TOKEN_SUPPLY);
        seam.mint(address(swapRouter), INITIAL_TOKEN_SUPPLY);
        well.mint(address(swapRouter), INITIAL_TOKEN_SUPPLY);
        extra.mint(address(swapRouter), INITIAL_TOKEN_SUPPLY);
        paint.mint(address(swapRouter), INITIAL_TOKEN_SUPPLY);
        degen.mint(address(swapRouter), INITIAL_TOKEN_SUPPLY);
        brett.mint(address(swapRouter), INITIAL_TOKEN_SUPPLY);
        toshi.mint(address(swapRouter), INITIAL_TOKEN_SUPPLY);
        normie.mint(address(swapRouter), INITIAL_TOKEN_SUPPLY);
    }

    function _addAllTokens() internal {
        vm.startPrank(admin);

        // Add all 10 tokens with equal weights (700 bps each = 7000 total = 70%)
        vault.addToken(address(aero), 700);
        vault.addToken(address(bswp), 700);
        vault.addToken(address(seam), 700);
        vault.addToken(address(well), 700);
        vault.addToken(address(extra), 700);
        vault.addToken(address(paint), 700);
        vault.addToken(address(degen), 700);
        vault.addToken(address(brett), 700);
        vault.addToken(address(toshi), 700);
        vault.addToken(address(normie), 700);

        vm.stopPrank();
    }

    function _deposit(address user, uint256 amount) internal returns (uint256 shares) {
        vm.startPrank(user);
        usdc.approve(address(vault), amount);
        shares = vault.deposit(amount, user);
        vm.stopPrank();
    }

    function _withdraw(address user, uint256 assets) internal returns (uint256 shares) {
        vm.prank(user);
        shares = vault.withdraw(assets, user, user);
    }

    /* ========== ASSERTION HELPERS ========== */

    function assertApproxEqRelDecimal(
        uint256 a,
        uint256 b,
        uint256 maxPercentDelta, // in basis points (100 = 1%)
        string memory err
    ) internal pure {
        uint256 delta = a > b ? a - b : b - a;
        uint256 maxDelta = (b * maxPercentDelta) / 10000;

        require(delta <= maxDelta, err);
    }
}
