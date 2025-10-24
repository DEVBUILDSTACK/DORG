// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { MockERC20 } from "./MockERC20.sol";
import { BASE10Vault } from "../BASE10Vault.sol";

/**
 * @title MaliciousToken
 * @notice Malicious ERC20 token that attempts reentrancy attacks
 * @dev Used for testing reentrancy protection
 */
contract MaliciousToken is MockERC20 {
    address public attackTarget;
    bool public shouldAttack;
    address public attackBeneficiary;

    constructor() MockERC20("Malicious Token", "MAL", 6) { }

    /**
     * @notice Enable reentrancy attack
     * @param target The vault to attack
     * @param beneficiary Who receives the attack shares
     */
    function enableAttack(address target, address beneficiary) external {
        attackTarget = target;
        attackBeneficiary = beneficiary;
        shouldAttack = true;
    }

    /**
     * @notice Disable attack
     */
    function disableAttack() external {
        shouldAttack = false;
    }

    /**
     * @notice Override transfer to trigger reentrancy
     */
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        // If attack is enabled and we're transferring to the target vault
        if (shouldAttack && to == attackTarget) {
            // Try to reenter the deposit function
            // This should fail due to ReentrancyGuard
            try BASE10Vault(attackTarget).deposit(1e6, attackBeneficiary) {
                // If this succeeds, the reentrancy guard failed
                revert("Reentrancy attack succeeded - GUARD FAILED!");
            } catch {
                // Expected: reentrancy guard should block this
            }
        }

        return super.transfer(to, amount);
    }

    /**
     * @notice Override transferFrom to trigger reentrancy
     */
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        // If attack is enabled and we're transferring to the target vault
        if (shouldAttack && to == attackTarget) {
            // Try to reenter the deposit function
            // This should fail due to ReentrancyGuard
            try BASE10Vault(attackTarget).deposit(1e6, attackBeneficiary) {
                // If this succeeds, the reentrancy guard failed
                revert("Reentrancy attack succeeded - GUARD FAILED!");
            } catch {
                // Expected: reentrancy guard should block this
            }
        }

        return super.transferFrom(from, to, amount);
    }
}
