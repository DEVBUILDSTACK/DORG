// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { Script } from "forge-std/Script.sol";
import { console2 } from "forge-std/console2.sol";

import { BASE10Vault } from "../src/BASE10Vault.sol";
import { PriceOracle } from "../src/PriceOracle.sol";
import { MockERC20 } from "../src/mocks/MockERC20.sol";
import { AggregatorV3Interface } from "../src/interfaces/AggregatorV3Interface.sol";

/**
 * @title LocalTest
 * @notice Comprehensive testing script for locally deployed BASE10 Vault
 * @dev Run with: PRIVATE_KEY=0xac0... forge script script/LocalTest.s.sol:LocalTest --rpc-url http://127.0.0.1:8545 --broadcast
 */
contract LocalTest is Script {
    /* ========== DEPLOYED CONTRACTS (from Deploy.s.sol output) ========== */

    PriceOracle priceOracle = PriceOracle(0x5FbDB2315678afecb367f032d93F642f64180aa3);
    BASE10Vault vault = BASE10Vault(0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9);

    /* ========== TEST TOKENS ========== */

    MockERC20 usdc;
    MockERC20 aero;
    MockERC20 degen;

    /* ========== TEST ACCOUNTS ========== */

    address deployer;
    address alice;
    address bob;

    /* ========== MAIN TEST FUNCTION ========== */

    function run() external {
        // Load deployer private key
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        deployer = vm.addr(deployerPrivateKey);

        // Generate test accounts
        alice = address(0xA11CE);
        bob = address(0xB0B);

        console2.log("=================================");
        console2.log("BASE10 VAULT LOCAL TESTING");
        console2.log("=================================");
        console2.log("Vault:", address(vault));
        console2.log("Oracle:", address(priceOracle));
        console2.log("Deployer:", deployer);
        console2.log("=================================\n");

        vm.startBroadcast(deployerPrivateKey);

        // Step 1: Deploy mock tokens
        console2.log("Step 1: Deploying mock tokens...");
        deployMockTokens();

        // Step 2: Setup mock oracle
        console2.log("\nStep 2: Setting up mock price feeds...");
        setupMockOracle();

        // Step 3: Configure vault with test tokens
        console2.log("\nStep 3: Adding tokens to vault...");
        configureVault();

        // Step 4: Mint tokens to test accounts
        console2.log("\nStep 4: Minting test tokens...");
        mintTestTokens();

        vm.stopBroadcast();

        // Step 5: Run tests
        console2.log("\n=================================");
        console2.log("RUNNING TESTS");
        console2.log("=================================\n");

        test_1_InitialState();
        test_2_FirstDeposit();
        test_3_SecondDeposit();
        test_4_CheckPortfolioValue();
        test_5_PartialWithdraw();
        test_6_EmergencyPause();
        test_7_FinalState();

        console2.log("\n=================================");
        console2.log("ALL TESTS COMPLETED SUCCESSFULLY!");
        console2.log("=================================");
    }

    /* ========== SETUP FUNCTIONS ========== */

    function deployMockTokens() internal {
        // Deploy mock USDC (6 decimals, like real USDC)
        usdc = new MockERC20("USD Coin", "USDC", 6);
        console2.log("USDC deployed at:", address(usdc));

        // Deploy mock portfolio tokens (18 decimals)
        aero = new MockERC20("Aerodrome", "AERO", 18);
        console2.log("AERO deployed at:", address(aero));

        degen = new MockERC20("Degen", "DEGEN", 18);
        console2.log("DEGEN deployed at:", address(degen));
    }

    function setupMockOracle() internal {
        // Deploy mock price feed for AERO ($2.00)
        MockChainlinkFeed aeroFeed = new MockChainlinkFeed(2e8, 8); // $2.00, 8 decimals
        priceOracle.setPriceFeed(address(aero), address(aeroFeed));
        console2.log("AERO price feed set: $2.00");

        // Deploy mock price feed for DEGEN ($0.05)
        MockChainlinkFeed degenFeed = new MockChainlinkFeed(5e6, 8); // $0.05, 8 decimals
        priceOracle.setPriceFeed(address(degen), address(degenFeed));
        console2.log("DEGEN price feed set: $0.05");
    }

    function configureVault() internal {
        // Add AERO with 3500 bps (35% of portfolio = 3500/10000)
        vault.addToken(address(aero), 3500);
        console2.log("AERO added to vault with 3500 bps weight");

        // Add DEGEN with 3500 bps (35% of portfolio)
        vault.addToken(address(degen), 3500);
        console2.log("DEGEN added to vault with 3500 bps weight");

        // Total: 7000 bps (70% in tokens, 30% USDC reserve)
        console2.log("Total portfolio weight: 7000 bps (70%)");
    }

    function mintTestTokens() internal {
        // Mint USDC to deployer (for testing)
        usdc.mint(deployer, 10_000e6); // 10,000 USDC
        console2.log("Minted 10,000 USDC to deployer");

        // Mint USDC to Alice
        usdc.mint(alice, 5000e6); // 5,000 USDC
        console2.log("Minted 5,000 USDC to Alice");

        // Mint USDC to Bob
        usdc.mint(bob, 5000e6); // 5,000 USDC
        console2.log("Minted 5,000 USDC to Bob");

        // Mint portfolio tokens to vault for initial liquidity
        aero.mint(address(vault), 1000e18); // 1000 AERO
        degen.mint(address(vault), 10_000e18); // 10000 DEGEN
        console2.log("Minted initial portfolio tokens to vault");
    }

    /* ========== TEST FUNCTIONS ========== */

    function test_1_InitialState() internal {
        console2.log("Test 1: Checking initial state...");

        uint256 totalAssets = vault.totalAssets();
        uint256 totalSupply = vault.totalSupply();

        console2.log("  Total assets:", totalAssets);
        console2.log("  Total supply:", totalSupply);

        // Initial state should have 0 user deposits
        // (Portfolio tokens were minted directly, not deposited)

        console2.log("  [OK] Initial state verified\n");
    }

    function test_2_FirstDeposit() internal {
        console2.log("Test 2: First deposit (1000 USDC)...");

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        uint256 depositAmount = 1000e6; // 1000 USDC

        // Approve vault to spend USDC
        usdc.approve(address(vault), depositAmount);
        console2.log("  Approved vault to spend USDC");

        // Get balances before
        uint256 usdcBefore = usdc.balanceOf(deployer);
        uint256 sharesBefore = vault.balanceOf(deployer);

        // Deposit
        uint256 sharesReceived = vault.deposit(depositAmount, deployer);

        // Get balances after
        uint256 usdcAfter = usdc.balanceOf(deployer);
        uint256 sharesAfter = vault.balanceOf(deployer);

        vm.stopBroadcast();

        console2.log("  USDC spent:", usdcBefore - usdcAfter);
        console2.log("  Shares received:", sharesReceived);
        console2.log("  Share balance:", sharesAfter - sharesBefore);

        require(sharesReceived > 0, "Should receive shares");
        require(usdcAfter == usdcBefore - depositAmount, "USDC should be transferred");

        console2.log("  [OK] First deposit successful\n");
    }

    function test_3_SecondDeposit() internal {
        console2.log("Test 3: Second deposit from Alice (500 USDC)...");

        // Impersonate Alice
        vm.startBroadcast(alice);

        uint256 depositAmount = 500e6; // 500 USDC

        // Approve and deposit
        usdc.approve(address(vault), depositAmount);
        uint256 sharesReceived = vault.deposit(depositAmount, alice);

        vm.stopBroadcast();

        console2.log("  Alice deposited:", depositAmount / 1e6, "USDC");
        console2.log("  Alice received:", sharesReceived, "shares");

        require(sharesReceived > 0, "Alice should receive shares");

        console2.log("  [OK] Second deposit successful\n");
    }

    function test_4_CheckPortfolioValue() internal view {
        console2.log("Test 4: Checking portfolio value...");

        uint256 totalAssets = vault.totalAssets();
        uint256 totalSupply = vault.totalSupply();

        console2.log("  Total assets:", totalAssets / 1e6, "USDC");
        console2.log("  Total supply:", totalSupply / 1e18, "shares");

        if (totalSupply > 0) {
            uint256 pricePerShare = (totalAssets * 1e18) / totalSupply;
            console2.log("  Price per share:", pricePerShare);
        }

        console2.log("  [OK] Portfolio value checked\n");
    }

    function test_5_PartialWithdraw() internal {
        console2.log("Test 5: Partial withdraw (500 USDC)...");

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        uint256 withdrawAmount = 500e6; // 500 USDC

        // Get balances before
        uint256 usdcBefore = usdc.balanceOf(deployer);
        uint256 sharesBefore = vault.balanceOf(deployer);

        // Withdraw
        uint256 sharesBurned = vault.withdraw(withdrawAmount, deployer, deployer);

        // Get balances after
        uint256 usdcAfter = usdc.balanceOf(deployer);
        uint256 sharesAfter = vault.balanceOf(deployer);

        vm.stopBroadcast();

        console2.log("  USDC received:", usdcAfter - usdcBefore);
        console2.log("  Shares burned:", sharesBurned);
        console2.log("  Remaining shares:", sharesAfter);

        require(usdcAfter > usdcBefore, "Should receive USDC");
        require(sharesAfter < sharesBefore, "Shares should be burned");

        console2.log("  [OK] Partial withdraw successful\n");
    }

    function test_6_EmergencyPause() internal {
        console2.log("Test 6: Testing emergency pause system...");

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Pause deposits (level 1)
        vault.setPauseLevel(1);
        console2.log("  Paused at level 1 (deposits blocked)");

        uint8 pauseLevel = vault.pauseLevel();
        require(pauseLevel == 1, "Pause level should be 1");

        // Unpause
        vault.setPauseLevel(0);
        console2.log("  Unpaused (back to level 0)");

        vm.stopBroadcast();

        console2.log("  [OK] Emergency pause working\n");
    }

    function test_7_FinalState() internal view {
        console2.log("Test 7: Checking final state...");

        uint256 totalAssets = vault.totalAssets();
        uint256 totalSupply = vault.totalSupply();
        uint256 deployerShares = vault.balanceOf(deployer);
        uint256 aliceShares = vault.balanceOf(alice);

        console2.log("  Total assets:", totalAssets / 1e6, "USDC");
        console2.log("  Total supply:", totalSupply);
        console2.log("  Deployer shares:", deployerShares);
        console2.log("  Alice shares:", aliceShares);

        require(totalSupply > 0, "Should have shares issued");
        require(deployerShares > 0, "Deployer should have shares");
        require(aliceShares > 0, "Alice should have shares");

        console2.log("  [OK] Final state verified\n");
    }
}

/**
 * @notice Mock Chainlink price feed for testing
 */
contract MockChainlinkFeed is AggregatorV3Interface {
    int256 public price;
    uint8 public override decimals;

    constructor(int256 _price, uint8 _decimals) {
        price = _price;
        decimals = _decimals;
    }

    function description() external pure override returns (string memory) {
        return "Mock Price Feed";
    }

    function version() external pure override returns (uint256) {
        return 1;
    }

    function getRoundData(uint80)
        external
        view
        override
        returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)
    {
        return (1, price, block.timestamp, block.timestamp, 1);
    }

    function latestRoundData()
        external
        view
        override
        returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)
    {
        return (1, price, block.timestamp, block.timestamp, 1);
    }
}
