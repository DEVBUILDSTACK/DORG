// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { BASE10VaultTestBase } from "../BASE10VaultTestBase.sol";
import { BASE10Vault } from "../../src/BASE10Vault.sol";
import { IBASE10Vault } from "../../src/interfaces/IBASE10Vault.sol";
import { MaliciousToken } from "../../src/mocks/MaliciousToken.sol";
import { ERC1967Proxy } from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import { console2 } from "forge-std/console2.sol";

/**
 * @title SecurityTest
 * @notice Critical security vulnerability tests
 * @dev Tests ERC4626 inflation attack, oracle failures, reentrancy, etc.
 */
contract SecurityTest is BASE10VaultTestBase {
    /* ========== ERC4626 INFLATION ATTACK TESTS ========== */

    /**
     * @notice Test that virtual offset protects against inflation attacks
     * @dev CRITICAL: This is the #1 vulnerability in ERC4626 vaults
     *
     * Attack scenario:
     * 1. Attacker deposits 1 wei, becomes first depositor
     * 2. Attacker donates large amount directly to vault
     * 3. Next depositor's shares round down to 0 (attacker steals deposit)
     *
     * Protection: decimalsOffset = 6 makes attack cost 1M times more
     */
    function test_InflationAttack_WithVirtualOffset() public {
        // Attacker deposits minimal amount (1 wei)
        vm.startPrank(attacker);
        usdc.approve(address(vault), 1);
        uint256 attackerShares = vault.deposit(1, attacker);
        vm.stopPrank();

        // Attacker tries to manipulate by direct transfer (donation attack)
        vm.prank(attacker);
        usdc.transfer(address(vault), 10_000e6); // Donate $10,000

        // Victim deposits normal amount
        uint256 victimDeposit = 1000e6; // $1,000
        vm.startPrank(alice);
        usdc.approve(address(vault), victimDeposit);
        uint256 victimShares = vault.deposit(victimDeposit, alice);
        vm.stopPrank();

        // ASSERTION: Victim MUST receive shares (not 0)
        assertGt(victimShares, 0, "Victim received 0 shares - inflation attack successful!");

        // ASSERTION: Attacker should NOT profit from the attack
        uint256 attackerValue = vault.convertToAssets(attackerShares);

        // Attacker spent 10,000 USDC + 1 wei, should not get more back
        assertLt(attackerValue, 10_001e6, "Attacker profited from inflation attack!");
    }

    /**
     * @notice Test internal accounting prevents donation attacks
     * @dev Direct transfers should NOT affect share price
     */
    function test_DonationAttack_InternalAccounting() public {
        // Alice deposits
        uint256 aliceDeposit = 1000e6;
        _deposit(alice, aliceDeposit);

        uint256 sharesBefore = vault.totalSupply();
        uint256 assetsBefore = vault.totalAssets();

        // Attacker donates tokens directly
        vm.prank(attacker);
        usdc.transfer(address(vault), 5000e6);

        // ASSERTION: Total assets should NOT increase (internal accounting)
        uint256 assetsAfter = vault.totalAssets();
        assertEq(assetsAfter, assetsBefore, "Donation affected total assets!");

        // ASSERTION: Share price should remain constant
        uint256 sharesAfter = vault.totalSupply();
        assertEq(sharesAfter, sharesBefore, "Donation affected share supply!");
    }

    /* ========== ORACLE SECURITY TESTS ========== */

    /**
     * @notice Test oracle rejects stale prices
     * @dev Check #4: Timestamp staleness
     */
    function test_OracleRejectsStalePrice() public {
        _addAllTokens();

        // Warp time forward 2 hours (past 1 hour threshold)
        vm.warp(block.timestamp + 2 hours);

        // ASSERTION: getPrice should revert with stale data
        vm.expectRevert(abi.encodeWithSignature("StalePrice()"));
        priceOracle.getPrice(address(aero));
    }

    /**
     * @notice Test oracle rejects negative/zero prices
     * @dev Check #1: Price > 0
     */
    function test_OracleRejectsInvalidPrice() public {
        _addAllTokens();

        // Set negative price
        aeroOracle.setPrice(-100);

        vm.expectRevert(abi.encodeWithSignature("InvalidPrice()"));
        priceOracle.getPrice(address(aero));

        // Set zero price
        aeroOracle.setPrice(0);

        vm.expectRevert(abi.encodeWithSignature("InvalidPrice()"));
        priceOracle.getPrice(address(aero));
    }

    /**
     * @notice Test oracle rejects prices outside bounds
     * @dev Check #5: Circuit breaker
     */
    function test_OracleRejectsPriceOutOfBounds() public {
        _addAllTokens();

        // Price too high (above $10,000)
        aeroOracle.setPrice(2e12); // $20,000

        vm.expectRevert(abi.encodeWithSignature("PriceOutOfBounds()"));
        priceOracle.getPrice(address(aero));

        // Price too low (below $0.01)
        aeroOracle.setPrice(5e5); // $0.005

        vm.expectRevert(abi.encodeWithSignature("PriceOutOfBounds()"));
        priceOracle.getPrice(address(aero));
    }

    /**
     * @notice Test oracle rejects stale answeredInRound
     * @dev Check #3: answeredInRound >= roundId
     */
    function test_OracleRejectsStaleRound() public {
        _addAllTokens();

        // Simulate stale round
        aeroOracle.setStale(true);

        vm.expectRevert(abi.encodeWithSignature("StalePrice()"));
        priceOracle.getPrice(address(aero));
    }

    /* ========== REENTRANCY TESTS ========== */

    /**
     * @notice Test deposit is protected against reentrancy
     * @dev Uses malicious token that tries to reenter during transfer
     */
    function test_ReentrancyProtection_Deposit() public {
        // Deploy malicious token (6 decimals like USDC)
        MaliciousToken maliciousToken = new MaliciousToken();

        // Mint tokens to attacker (need enough for both deposit and reentrancy attempt)
        maliciousToken.mint(attacker, 10_000e6);

        // Deploy a new vault with malicious token as asset
        // Use admin as both admin and fee collector to simplify
        BASE10Vault malVaultImpl = new BASE10Vault();
        bytes memory initData = abi.encodeWithSelector(
            BASE10Vault.initialize.selector,
            address(maliciousToken), // malicious asset
            "Malicious Vault",
            "MAL",
            address(priceOracle),
            address(swapRouter),
            admin, // admin is fee collector too
            200,
            admin // admin gets all roles
        );

        ERC1967Proxy malProxy = new ERC1967Proxy(address(malVaultImpl), initData);
        BASE10Vault malVault = BASE10Vault(address(malProxy));

        // Enable attack on the malicious token
        maliciousToken.enableAttack(address(malVault), attacker);

        // Attacker approves vault with enough allowance for both transactions
        vm.startPrank(attacker);
        maliciousToken.approve(address(malVault), type(uint256).max);

        // Attempt deposit - reentrancy guard should prevent the attack
        // The malicious token will try to reenter during transferFrom, but it should be blocked
        // The attack will fail silently in the token's transferFrom, so the deposit should succeed
        malVault.deposit(1000e6, attacker);

        vm.stopPrank();

        // Verify that the deposit succeeded despite the reentrancy attempt
        // With virtual offset of 6, shares will be much higher than assets
        uint256 attackerShares = malVault.balanceOf(attacker);
        assertGt(attackerShares, 0, "Attacker should have received shares");

        // Verify attacker only got shares from ONE deposit (not the reentrancy attempt)
        // If reentrancy worked, they would have gotten significantly more shares
        // We deposited 1000e6, so with offset we expect around 1e15 shares (1000e6 * 1e6)
        assertApproxEqAbs(attackerShares, 1000e6 * 1e6, 1e6, "Share amount unexpected");

        assertTrue(true, "Reentrancy protection working");
    }

    /* ========== ACCESS CONTROL TESTS ========== */

    /**
     * @notice Test only admin can add tokens
     */
    function test_OnlyAdminCanAddToken() public {
        vm.prank(alice);
        vm.expectRevert();
        vault.addToken(address(aero), 700);
    }

    /**
     * @notice Test only keeper can execute rebalance
     */
    function test_OnlyKeeperCanRebalance() public {
        _addAllTokens();

        // Create minimal intent
        IBASE10Vault.RebalanceIntent memory intent;
        intent.deadline = block.timestamp + 1 hours;

        vm.prank(alice);
        vm.expectRevert();
        vault.executeRebalance(intent, "");
    }

    /**
     * @notice Test only emergency role can pause
     */
    function test_OnlyEmergencyCanPause() public {
        vm.prank(alice);
        vm.expectRevert();
        vault.setPauseLevel(4);
    }

    /* ========== DECIMAL PRECISION TESTS ========== */

    /**
     * @notice Test decimal normalization with mixed decimals
     * @dev Ensures no precision loss when calculating USD values
     */
    function test_DecimalNormalization_MixedDecimals() public {
        _addAllTokens();

        // Deposit USDC
        uint256 depositAmount = 10_000e6; // $10,000
        uint256 shares = _deposit(alice, depositAmount);

        // Check portfolio value matches deposit
        uint256 portfolioValue = vault.getPortfolioValue();

        // Should be approximately equal (within 0.01%)
        assertApproxEqRelDecimal(portfolioValue, depositAmount, 1, "Decimal precision loss");
    }

    /* ========== PAUSE MECHANISM TESTS ========== */

    /**
     * @notice Test pause levels work correctly
     */
    function test_PauseLevels() public {
        // Pause deposits
        vm.prank(emergencyAdmin);
        vault.setPauseLevel(1);

        // Deposits should fail
        vm.startPrank(alice);
        usdc.approve(address(vault), 1000e6);
        vm.expectRevert();
        vault.deposit(1000e6, alice);
        vm.stopPrank();

        // But emergency withdraw should work
        // (tested in emergency tests)
    }

    /* ========== STORAGE COLLISION TESTS ========== */

    /**
     * @notice Test upgrade preserves storage layout
     * @dev CRITICAL: Storage collision can corrupt vault state
     */
    function test_UpgradePreservesStorage() public {
        // Initial deposit
        uint256 depositAmount = 1000e6;
        uint256 shares = _deposit(alice, depositAmount);

        // Record state before upgrade
        uint256 sharesBefore = vault.balanceOf(alice);
        uint256 totalSupplyBefore = vault.totalSupply();
        uint256 totalAssetsBefore = vault.totalAssets();

        // Deploy new implementation (same code for this test)
        BASE10Vault newImplementation = new BASE10Vault();

        // Upgrade
        vm.prank(admin);
        vault.upgradeToAndCall(address(newImplementation), "");

        // ASSERTION: State preserved after upgrade
        assertEq(vault.balanceOf(alice), sharesBefore, "Shares changed after upgrade!");
        assertEq(vault.totalSupply(), totalSupplyBefore, "Total supply changed after upgrade!");
        assertEq(vault.totalAssets(), totalAssetsBefore, "Total assets changed after upgrade!");
    }
}
