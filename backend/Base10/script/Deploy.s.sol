// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { Script } from "forge-std/Script.sol";
import { console2 } from "forge-std/console2.sol";

import { BASE10Vault } from "../src/BASE10Vault.sol";
import { PriceOracle } from "../src/PriceOracle.sol";
import { ERC1967Proxy } from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

/**
 * @title Deploy
 * @notice Deployment script for BASE10 Vault on Base Sepolia
 * @dev Run with: forge script script/Deploy.s.sol --rpc-url $BASE_SEPOLIA_RPC_URL --broadcast --verify
 */
contract Deploy is Script {
    /* ========== CONSTANTS ========== */

    // Base Sepolia USDC (official testnet deployment)
    address constant USDC = 0x036CbD53842c5426634e7929541eC2318f3dCF7e;

    // Base Sepolia Chainlink Price Feeds (official testnet deployment)
    // Note: Using ETH/USD as proxy for now, replace with actual token feeds when available
    address constant CHAINLINK_ETH_USD = 0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1;

    // Swap Router - Using mock for Phase 1 (replace with 1inch in Phase 2)
    // For testnet, we'll deploy our own MockSwapRouter
    address mockSwapRouter;

    // Deployment Configuration
    uint256 constant MANAGEMENT_FEE_BPS = 200; // 2% annual fee
    string constant VAULT_NAME = "BASE10 Vault";
    string constant VAULT_SYMBOL = "BASE10";

    /* ========== STATE VARIABLES ========== */

    address deployer;
    address admin;
    address keeper;
    address rebalancer;
    address emergencyAdmin;
    address feeCollector;

    BASE10Vault public implementation;
    ERC1967Proxy public proxy;
    BASE10Vault public vault;
    PriceOracle public priceOracle;

    /* ========== MAIN DEPLOYMENT ========== */

    function run() external {
        // Load deployer private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        deployer = vm.addr(deployerPrivateKey);

        console2.log("=================================");
        console2.log("BASE10 VAULT DEPLOYMENT");
        console2.log("=================================");
        console2.log("Network: Base Sepolia");
        console2.log("Deployer:", deployer);
        console2.log("=================================\n");

        // Setup roles (for testnet, deployer gets all roles)
        admin = deployer;
        keeper = deployer;
        rebalancer = deployer;
        emergencyAdmin = deployer;
        feeCollector = deployer;

        vm.startBroadcast(deployerPrivateKey);

        // Step 1: Deploy PriceOracle
        console2.log("Step 1: Deploying PriceOracle...");
        priceOracle = new PriceOracle(admin);
        console2.log("PriceOracle deployed at:", address(priceOracle));

        // Step 2: Deploy MockSwapRouter (temporary for Phase 1)
        console2.log("\nStep 2: Deploying MockSwapRouter...");
        mockSwapRouter = deployMockSwapRouter();
        console2.log("MockSwapRouter deployed at:", mockSwapRouter);

        // Step 3: Deploy Vault Implementation
        console2.log("\nStep 3: Deploying BASE10Vault implementation...");
        implementation = new BASE10Vault();
        console2.log("Implementation deployed at:", address(implementation));

        // Step 4: Deploy Proxy with Initialization
        console2.log("\nStep 4: Deploying ERC1967Proxy...");
        bytes memory initData = abi.encodeWithSelector(
            BASE10Vault.initialize.selector,
            USDC, // asset
            VAULT_NAME, // name
            VAULT_SYMBOL, // symbol
            address(priceOracle), // oracle
            mockSwapRouter, // router
            feeCollector, // fee recipient
            MANAGEMENT_FEE_BPS, // management fee (2%)
            admin // admin (gets all roles)
        );

        proxy = new ERC1967Proxy(address(implementation), initData);
        vault = BASE10Vault(address(proxy));
        console2.log("Proxy deployed at:", address(proxy));
        console2.log("Vault initialized successfully");

        // Step 5: Grant Additional Roles (if different addresses)
        console2.log("\nStep 5: Setting up roles...");
        if (keeper != admin) {
            vault.grantRole(vault.KEEPER_ROLE(), keeper);
            console2.log("Granted KEEPER_ROLE to:", keeper);
        }
        if (rebalancer != admin) {
            vault.grantRole(vault.REBALANCER_ROLE(), rebalancer);
            console2.log("Granted REBALANCER_ROLE to:", rebalancer);
        }
        if (emergencyAdmin != admin) {
            vault.grantRole(vault.EMERGENCY_ROLE(), emergencyAdmin);
            console2.log("Granted EMERGENCY_ROLE to:", emergencyAdmin);
        }
        if (feeCollector != admin) {
            vault.grantRole(vault.FEE_COLLECTOR_ROLE(), feeCollector);
            console2.log("Granted FEE_COLLECTOR_ROLE to:", feeCollector);
        }

        vm.stopBroadcast();

        // Print deployment summary
        printDeploymentSummary();
    }

    /* ========== HELPER FUNCTIONS ========== */

    function deployMockSwapRouter() internal returns (address) {
        // Deploy inline MockSwapRouter for testnet
        // In production, this would be replaced with 1inch or Paraswap
        bytes memory bytecode = type(MockSwapRouter).creationCode;
        address router;
        assembly {
            router := create(0, add(bytecode, 0x20), mload(bytecode))
        }
        require(router != address(0), "MockSwapRouter deployment failed");
        return router;
    }

    function printDeploymentSummary() internal view {
        console2.log("\n=================================");
        console2.log("DEPLOYMENT SUMMARY");
        console2.log("=================================");
        console2.log("PriceOracle:", address(priceOracle));
        console2.log("SwapRouter:", mockSwapRouter);
        console2.log("Implementation:", address(implementation));
        console2.log("Proxy:", address(proxy));
        console2.log("Vault:", address(vault));
        console2.log("=================================");
        console2.log("\nVault Configuration:");
        console2.log("- Asset:", USDC);
        console2.log("- Name:", VAULT_NAME);
        console2.log("- Symbol:", VAULT_SYMBOL);
        console2.log("- Management Fee:", MANAGEMENT_FEE_BPS, "bps (2%)");
        console2.log("=================================");
        console2.log("\nRoles:");
        console2.log("- Admin:", admin);
        console2.log("- Keeper:", keeper);
        console2.log("- Rebalancer:", rebalancer);
        console2.log("- Emergency Admin:", emergencyAdmin);
        console2.log("- Fee Collector:", feeCollector);
        console2.log("=================================");
        console2.log("\nNext Steps:");
        console2.log("1. Verify contracts on Basescan");
        console2.log("2. Configure Chainlink price feeds");
        console2.log("3. Add portfolio tokens");
        console2.log("4. Run smoke tests");
        console2.log("=================================\n");
    }
}

/**
 * @title MockSwapRouter
 * @notice Temporary mock router for testnet (Phase 1)
 * @dev Performs 1:1 swaps for testing. Replace with 1inch/Paraswap in Phase 2
 */
contract MockSwapRouter {
    function exactInputSingle(bytes calldata) external pure returns (uint256) {
        // Mock implementation - just return input amount
        return 0;
    }
}
