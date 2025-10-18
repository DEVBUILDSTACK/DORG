// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";

import {BASE10Vault} from "../src/BASE10Vault.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title SmokeTest
 * @notice Execute smoke tests on deployed BASE10 Vault
 * @dev Tests basic deposit/withdraw flows with real transactions
 * 
 * Prerequisites:
 * - Vault deployed and configured
 * - Deployer wallet has testnet USDC
 * - Get testnet USDC from: https://faucet.circle.com/
 * 
 * Usage:
 *   forge script script/SmokeTest.s.sol \
 *     --rpc-url $BASE_SEPOLIA_RPC_URL \
 *     --broadcast \
 *     --sig "run(address)" \
 *     <VAULT_ADDRESS>
 */
contract SmokeTest is Script {
    /* ========== CONSTANTS ========== */

    // Base Sepolia USDC
    address constant USDC = 0x036CbD53842c5426634e7929541eC2318f3dCF7e;

    // Test amounts
    uint256 constant INITIAL_DEPOSIT = 100e6; // $100 USDC
    uint256 constant SECOND_DEPOSIT = 50e6; // $50 USDC
    uint256 constant WITHDRAW_AMOUNT = 75e6; // $75 USDC

    /* ========== STATE VARIABLES ========== */

    BASE10Vault vault;
    IERC20 usdc;
    address tester;

    /* ========== SMOKE TESTS ========== */

    function run(address vaultAddress) external {
        uint256 testerPrivateKey = vm.envUint("PRIVATE_KEY");
        tester = vm.addr(testerPrivateKey);

        vault = BASE10Vault(vaultAddress);
        usdc = IERC20(USDC);

        console2.log("=================================");
        console2.log("BASE10 VAULT SMOKE TESTS");
        console2.log("=================================");
        console2.log("Vault:", vaultAddress);
        console2.log("Tester:", tester);
        console2.log("USDC Balance:", usdc.balanceOf(tester) / 1e6, "USDC");
        console2.log("=================================\n");

        // Check if tester has USDC
        uint256 usdcBalance = usdc.balanceOf(tester);
        if (usdcBalance < INITIAL_DEPOSIT + SECOND_DEPOSIT) {
            console2.log("ERROR: Insufficient USDC balance");
            console2.log("Required:", (INITIAL_DEPOSIT + SECOND_DEPOSIT) / 1e6, "USDC");
            console2.log("Available:", usdcBalance / 1e6, "USDC");
            console2.log("\nGet testnet USDC from: https://faucet.circle.com/");
            return;
        }

        // Run smoke tests
        vm.startBroadcast(testerPrivateKey);

        test_1_InitialState();
        test_2_FirstDeposit();
        test_3_SecondDeposit();
        test_4_PartialWithdraw();
        test_5_CheckFinalState();

        vm.stopBroadcast();

        console2.log("\n=================================");
        console2.log("ALL SMOKE TESTS PASSED [OK]");
        console2.log("=================================\n");
    }

    /* ========== TEST CASES ========== */

    function test_1_InitialState() internal view {
        console2.log("Test 1: Check initial state...");

        uint256 totalAssets = vault.totalAssets();
        uint256 totalSupply = vault.totalSupply();

        console2.log("  Total Assets:", totalAssets / 1e6, "USDC");
        console2.log("  Total Supply:", totalSupply / 1e18, "shares");

        require(totalAssets >= 0, "Total assets should be >= 0");
        require(totalSupply >= 0, "Total supply should be >= 0");

        console2.log("  [OK] Initial state valid\n");
    }

    function test_2_FirstDeposit() internal {
        console2.log("Test 2: First deposit ($100 USDC)...");

        uint256 balanceBefore = usdc.balanceOf(tester);
        uint256 sharesBefore = vault.balanceOf(tester);

        // Approve and deposit
        usdc.approve(address(vault), INITIAL_DEPOSIT);
        uint256 shares = vault.deposit(INITIAL_DEPOSIT, tester);

        uint256 balanceAfter = usdc.balanceOf(tester);
        uint256 sharesAfter = vault.balanceOf(tester);

        console2.log("  USDC spent:", (balanceBefore - balanceAfter) / 1e6, "USDC");
        console2.log("  Shares received:", (sharesAfter - sharesBefore) / 1e18, "shares");
        console2.log("  Total shares received:", shares / 1e18, "shares");

        require(balanceBefore - balanceAfter == INITIAL_DEPOSIT, "USDC not transferred");
        require(shares > 0, "No shares received");
        require(sharesAfter == sharesBefore + shares, "Share balance mismatch");

        console2.log("  [OK] First deposit successful\n");
    }

    function test_3_SecondDeposit() internal {
        console2.log("Test 3: Second deposit ($50 USDC)...");

        uint256 sharesBefore = vault.balanceOf(tester);

        // Approve and deposit
        usdc.approve(address(vault), SECOND_DEPOSIT);
        uint256 shares = vault.deposit(SECOND_DEPOSIT, tester);

        uint256 sharesAfter = vault.balanceOf(tester);

        console2.log("  Shares received:", shares / 1e18, "shares");
        console2.log("  Total shares:", sharesAfter / 1e18, "shares");

        require(shares > 0, "No shares received");
        require(sharesAfter == sharesBefore + shares, "Share balance mismatch");

        console2.log("  [OK] Second deposit successful\n");
    }

    function test_4_PartialWithdraw() internal {
        console2.log("Test 4: Partial withdraw ($75 USDC)...");

        uint256 sharesBefore = vault.balanceOf(tester);
        uint256 usdcBefore = usdc.balanceOf(tester);

        // Calculate shares needed to withdraw WITHDRAW_AMOUNT
        uint256 sharesToBurn = vault.previewWithdraw(WITHDRAW_AMOUNT);

        // Withdraw
        uint256 assets = vault.withdraw(WITHDRAW_AMOUNT, tester, tester);

        uint256 sharesAfter = vault.balanceOf(tester);
        uint256 usdcAfter = usdc.balanceOf(tester);

        console2.log("  Shares burned:", (sharesBefore - sharesAfter) / 1e18, "shares");
        console2.log("  USDC received:", (usdcAfter - usdcBefore) / 1e6, "USDC");
        console2.log("  Assets withdrawn:", assets / 1e6, "USDC");

        require(assets == WITHDRAW_AMOUNT, "Withdraw amount mismatch");
        require(usdcAfter - usdcBefore == WITHDRAW_AMOUNT, "USDC not received");
        require(sharesBefore - sharesAfter == sharesToBurn, "Shares not burned correctly");

        console2.log("  [OK] Partial withdraw successful\n");
    }

    function test_5_CheckFinalState() internal view {
        console2.log("Test 5: Check final state...");

        uint256 myShares = vault.balanceOf(tester);
        uint256 myAssets = vault.convertToAssets(myShares);
        uint256 totalAssets = vault.totalAssets();
        uint256 totalSupply = vault.totalSupply();

        console2.log("  My Shares:", myShares / 1e18, "shares");
        console2.log("  My Assets:", myAssets / 1e6, "USDC");
        console2.log("  Total Assets:", totalAssets / 1e6, "USDC");
        console2.log("  Total Supply:", totalSupply / 1e18, "shares");

        // Expected: deposited 150 USDC, withdrew 75 USDC, should have ~75 USDC worth
        uint256 expectedAssets = INITIAL_DEPOSIT + SECOND_DEPOSIT - WITHDRAW_AMOUNT;
        uint256 tolerance = 1e6; // 1 USDC tolerance

        require(myShares > 0, "Should have shares remaining");
        require(myAssets > 0, "Should have assets remaining");

        // Check if within tolerance
        uint256 diff = myAssets > expectedAssets ? myAssets - expectedAssets : expectedAssets - myAssets;
        require(diff <= tolerance, "Final assets outside tolerance");

        console2.log("  Expected Assets:", expectedAssets / 1e6, "USDC");
        console2.log("  Actual Assets:", myAssets / 1e6, "USDC");
        console2.log("  Difference:", diff / 1e6, "USDC (within tolerance)");

        console2.log("  [OK] Final state valid\n");
    }
}
