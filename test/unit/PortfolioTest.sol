// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {BASE10VaultTestBase} from "../BASE10VaultTestBase.sol";
import {MockERC20} from "../../src/mocks/MockERC20.sol";
import {console2} from "forge-std/console2.sol";

/**
 * @title PortfolioTest
 * @notice Tests for portfolio management functionality
 */
contract PortfolioTest is BASE10VaultTestBase {
    /* ========== TOKEN MANAGEMENT TESTS ========== */

    function test_AddToken_Success() public {
        vm.prank(admin);
        vault.addToken(address(aero), 700);

        address[] memory tokens = vault.getSupportedTokens();
        assertEq(tokens.length, 1);
        assertEq(tokens[0], address(aero));
        assertEq(vault.getTokenWeight(address(aero)), 700);
    }

    function test_AddToken_RevertsIfNotAdmin() public {
        vm.prank(alice);
        vm.expectRevert();
        vault.addToken(address(aero), 700);
    }

    function test_AddToken_RevertsIfExceedsMaxTokens() public {
        _addAllTokens(); // Adds 10 tokens

        vm.prank(admin);
        MockERC20 extraToken = new MockERC20("Extra", "EXT", 18);
        vm.expectRevert();
        vault.addToken(address(extraToken), 700);
    }

    function test_AddToken_RevertsIfWeightExceeds7000() public {
        vm.startPrank(admin);

        // Add first token with 7000 bps (max)
        vault.addToken(address(aero), 7000);

        // Try to add another token
        vm.expectRevert();
        vault.addToken(address(bswp), 700);

        vm.stopPrank();
    }

    function test_UpdateWeights_Success() public {
        _addAllTokens();

        // Create new weights (totaling exactly 7000)
        address[] memory tokens = vault.getSupportedTokens();
        uint256[] memory newWeights = new uint256[](10);
        newWeights[0] = 1000; // 10% to AERO
        newWeights[1] = 500; // 5% 
        newWeights[2] = 500; // 5%
        newWeights[3] = 500; // 5%
        newWeights[4] = 500; // 5%
        newWeights[5] = 500; // 5%
        newWeights[6] = 1000; // 10%
        newWeights[7] = 1000; // 10%
        newWeights[8] = 1000; // 10%
        newWeights[9] = 500; // 5% to NORMIE
        // Sum: 1000 + 500*5 + 1000*3 + 500 = 1000 + 2500 + 3000 + 500 = 7000 ✓

        vm.prank(rebalancer);
        vault.updateWeights(tokens, newWeights);

        assertEq(vault.getTokenWeight(address(aero)), 1000);
        assertEq(vault.getTokenWeight(address(normie)), 500);
    }

    function test_UpdateWeights_RevertsIfNotEqual7000() public {
        _addAllTokens();

        address[] memory tokens = vault.getSupportedTokens();
        uint256[] memory badWeights = new uint256[](10);
        // Total = 8000 (too high)
        for (uint256 i = 0; i < 10; i++) {
            badWeights[i] = 800;
        }

        vm.prank(rebalancer);
        vm.expectRevert();
        vault.updateWeights(tokens, badWeights);
    }

    /* ========== PORTFOLIO VALUE TESTS ========== */

    function test_PortfolioValue_OnlyUSDC() public {
        uint256 depositAmount = 10_000e6;
        _deposit(alice, depositAmount);

        uint256 portfolioValue = vault.getPortfolioValue();
        assertEq(portfolioValue, depositAmount);
    }

    function test_PortfolioValue_MixedTokens() public {
        _addAllTokens();
        uint256 depositAmount = 10_000e6; // $10,000
        _deposit(alice, depositAmount);

        // Portfolio value should equal deposit (all in USDC, no rebalancing yet)
        uint256 portfolioValue = vault.getPortfolioValue();
        
        // Use approximate equality to handle rounding (within 1 USDC)
        assertApproxEqAbs(portfolioValue, depositAmount, 1e6, "Portfolio value mismatch");
    }

    function test_TotalAssets_SubtractsFees() public {
        _deposit(alice, 10_000e6);

        // Warp time forward 6 months
        vm.warp(block.timestamp + 180 days);

        // Trigger fee accrual
        _deposit(bob, 100e6);

        uint256 totalAssets = vault.totalAssets();
        uint256 portfolioValue = vault.getPortfolioValue();

        // Total assets should be less than portfolio value due to fees
        assertLt(totalAssets, portfolioValue);
    }
}
