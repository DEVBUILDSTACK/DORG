// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {BASE10VaultTestBase} from "../BASE10VaultTestBase.sol";
import {console2} from "forge-std/console2.sol";

/**
 * @title DepositWithdrawTest
 * @notice Tests for ERC4626 deposit/withdraw functionality
 */
contract DepositWithdrawTest is BASE10VaultTestBase {
    /* ========== DEPOSIT TESTS ========== */

    function test_Deposit_FirstDeposit() public {
        uint256 depositAmount = 1000e6; // $1,000

        vm.startPrank(alice);
        usdc.approve(address(vault), depositAmount);
        uint256 shares = vault.deposit(depositAmount, alice);
        vm.stopPrank();

        // With decimalsOffset=6, first deposit gets scaled shares
        assertGt(shares, 0, "No shares minted");
        assertEq(vault.balanceOf(alice), shares);
        assertEq(vault.totalAssets(), depositAmount);
    }

    function test_Deposit_MultipleUsers() public {
        // Alice deposits
        uint256 aliceDeposit = 1000e6;
        uint256 aliceShares = _deposit(alice, aliceDeposit);

        // Bob deposits same amount
        uint256 bobDeposit = 1000e6;
        uint256 bobShares = _deposit(bob, bobDeposit);

        // Both should get same shares (1:1 ratio initially)
        assertEq(aliceShares, bobShares);
        assertEq(vault.totalAssets(), aliceDeposit + bobDeposit);
    }

    function test_Deposit_UpdatesInternalBalance() public {
        uint256 depositAmount = 1000e6;
        _deposit(alice, depositAmount);

        // Internal balance should be updated
        uint256 internalBalance = vault.getInternalBalance(address(usdc));
        assertEq(internalBalance, depositAmount);
    }

    function test_Deposit_RevertsWhenPaused() public {
        vm.prank(emergencyAdmin);
        vault.setPauseLevel(1); // PAUSE_DEPOSITS

        vm.startPrank(alice);
        usdc.approve(address(vault), 1000e6);
        vm.expectRevert();
        vault.deposit(1000e6, alice);
        vm.stopPrank();
    }

    function test_Deposit_RevertsOnZeroAmount() public {
        vm.startPrank(alice);
        usdc.approve(address(vault), 0);
        vm.expectRevert();
        vault.deposit(0, alice);
        vm.stopPrank();
    }

    /* ========== WITHDRAW TESTS ========== */

    function test_Withdraw_FullWithdrawal() public {
        // Deposit
        uint256 depositAmount = 1000e6;
        uint256 shares = _deposit(alice, depositAmount);

        // Withdraw all
        uint256 balanceBefore = usdc.balanceOf(alice);

        vm.prank(alice);
        uint256 sharesRedeemed = vault.withdraw(depositAmount, alice, alice);

        uint256 balanceAfter = usdc.balanceOf(alice);

        assertEq(sharesRedeemed, shares);
        assertEq(balanceAfter - balanceBefore, depositAmount);
        assertEq(vault.balanceOf(alice), 0);
    }

    function test_Withdraw_PartialWithdrawal() public {
        // Deposit
        uint256 depositAmount = 1000e6;
        _deposit(alice, depositAmount);

        // Withdraw half
        uint256 withdrawAmount = 500e6;

        vm.prank(alice);
        vault.withdraw(withdrawAmount, alice, alice);

        // Alice should still have some shares
        assertGt(vault.balanceOf(alice), 0);

        // Total assets reduced
        assertApproxEqRelDecimal(vault.totalAssets(), depositAmount - withdrawAmount, 1, "Assets mismatch");
    }

    function test_Withdraw_RevertsWhenPaused() public {
        _deposit(alice, 1000e6);

        vm.prank(emergencyAdmin);
        vault.setPauseLevel(3); // PAUSE_WITHDRAWALS

        vm.prank(alice);
        vm.expectRevert();
        vault.withdraw(500e6, alice, alice);
    }

    function test_Withdraw_RevertsOnInsufficientBalance() public {
        _deposit(alice, 1000e6);

        // Try to withdraw more than deposited
        vm.prank(alice);
        vm.expectRevert();
        vault.withdraw(2000e6, alice, alice);
    }

    /* ========== SHARE PRICE TESTS ========== */

    function test_SharePrice_RemainsStableWithMultipleDeposits() public {
        // First deposit
        _deposit(alice, 1000e6);
        uint256 price1 = vault.convertToAssets(1e18); // Price per 1e18 shares

        // Second deposit
        _deposit(bob, 500e6);
        uint256 price2 = vault.convertToAssets(1e18);

        // Price should remain approximately stable
        assertApproxEqRelDecimal(price1, price2, 10, "Share price changed");
    }

    function test_SharePrice_IncreasesWithFees() public {
        // Alice deposits
        _deposit(alice, 1000e6);
        uint256 priceInitial = vault.convertToAssets(1e18);

        // Warp time forward 1 year
        vm.warp(block.timestamp + 365 days);

        // Bob deposits (triggers fee accrual)
        _deposit(bob, 1000e6);

        uint256 priceFinal = vault.convertToAssets(1e18);

        // Price should be slightly lower due to management fees
        // (more shares minted for fees, dilutes existing shareholders)
        assertLt(priceFinal, priceInitial);
    }

    /* ========== EMERGENCY WITHDRAW TESTS ========== */

    function test_EmergencyWithdraw_ProRataDistribution() public {
        _addAllTokens();

        // Deposit
        uint256 depositAmount = 10_000e6;
        _deposit(alice, depositAmount);

        // Emergency withdraw
        vm.prank(alice);
        uint256[] memory amounts = vault.emergencyWithdraw(alice);

        // Should receive USDC
        assertGt(amounts[0], 0, "No USDC received");

        // Alice should have no shares left
        assertEq(vault.balanceOf(alice), 0);
    }

    function test_EmergencyWithdraw_WorksDuringFullPause() public {
        _deposit(alice, 1000e6);

        // Full pause
        vm.prank(emergencyAdmin);
        vault.setPauseLevel(4);

        // Emergency withdraw should still work
        vm.prank(alice);
        vault.emergencyWithdraw(alice);

        assertEq(vault.balanceOf(alice), 0);
    }

    /* ========== FEE ACCRUAL TESTS ========== */

    function test_FeeAccrual_Continuous() public {
        // Deposit
        _deposit(alice, 10_000e6);

        // Get initial fee amount
        uint256 feesBefore = vault.getAccruedFees();

        // Warp forward 6 months
        vm.warp(block.timestamp + 180 days);

        // Trigger fee accrual with another action
        _deposit(bob, 100e6);

        uint256 feesAfter = vault.getAccruedFees();

        // Fees should have accrued
        assertGt(feesAfter, feesBefore, "Fees did not accrue");
    }

    function test_FeeAccrual_CalculationAccuracy() public {
        // Deposit $100,000
        uint256 depositAmount = 100_000e6;
        _deposit(alice, depositAmount);

        uint256 totalSharesBefore = vault.totalSupply();

        // Warp exactly 1 year
        vm.warp(block.timestamp + 365 days);

        // Trigger fee accrual by depositing
        _deposit(bob, 1e6);

        // Collect fees
        vm.prank(feeCollector);
        vault.collectFees();

        // Fee collector should have accrued fees
        uint256 feeShares = vault.balanceOf(feeCollector);
        
        // Fees should be greater than 0
        assertGt(feeShares, 0, "No fees collected");
        
        // With 200 bps annual fee on 100k deposit, after 1 year we expect ~2k in fees
        // This is ~2% of the original deposit value
        // However, due to continuous accrual and share dilution, the exact percentage will vary
        // We check that fees are in a reasonable range (1.5% to 2.5%)
        uint256 totalSharesAfter = vault.totalSupply();
        uint256 feePercentageBps = (feeShares * 10000) / totalSharesAfter;
        
        assertGt(feePercentageBps, 150, "Fee too low"); // At least 1.5%
        assertLt(feePercentageBps, 250, "Fee too high"); // At most 2.5%
    }

    function test_FeeCollection_MintsToRecipient() public {
        _deposit(alice, 10_000e6);

        // Warp time
        vm.warp(block.timestamp + 180 days);

        // Trigger accrual
        _deposit(bob, 100e6);

        uint256 recipientBalanceBefore = vault.balanceOf(feeCollector);

        // Collect fees
        vm.prank(feeCollector);
        vault.collectFees();

        uint256 recipientBalanceAfter = vault.balanceOf(feeCollector);

        assertGt(recipientBalanceAfter, recipientBalanceBefore, "No fees minted");
    }

    /* ========== PRECISION TESTS ========== */

    function test_Precision_LargeDeposit() public {
        // Test with large amounts
        uint256 largeAmount = 999_999e6; // ~$1M

        vm.startPrank(alice);
        usdc.approve(address(vault), largeAmount);
        uint256 shares = vault.deposit(largeAmount, alice);
        vm.stopPrank();

        // Should be able to withdraw exact amount
        uint256 withdrawable = vault.convertToAssets(shares);

        assertApproxEqRelDecimal(withdrawable, largeAmount, 1, "Precision loss on large deposit");
    }

    function test_Precision_SmallDeposit() public {
        // Test with small amounts
        uint256 smallAmount = 1e6; // $1

        vm.startPrank(alice);
        usdc.approve(address(vault), smallAmount);
        uint256 shares = vault.deposit(smallAmount, alice);
        vm.stopPrank();

        assertGt(shares, 0, "No shares for small deposit");

        uint256 withdrawable = vault.convertToAssets(shares);
        assertGt(withdrawable, 0, "Cannot withdraw small deposit");
    }
}
