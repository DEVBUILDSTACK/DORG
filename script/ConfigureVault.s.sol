// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { Script } from "forge-std/Script.sol";
import { console2 } from "forge-std/console2.sol";

import { BASE10Vault } from "../src/BASE10Vault.sol";
import { PriceOracle } from "../src/PriceOracle.sol";

/**
 * @title ConfigureVault
 * @notice Post-deployment configuration script for BASE10 Vault
 * @dev Run after Deploy.s.sol to configure price feeds and add tokens
 *
 * Usage:
 *   forge script script/ConfigureVault.s.sol \
 *     --rpc-url $BASE_SEPOLIA_RPC_URL \
 *     --broadcast \
 *     --sig "run(address,address)" \
 *     <VAULT_ADDRESS> <ORACLE_ADDRESS>
 */
contract ConfigureVault is Script {
    /* ========== CONFIGURATION ========== */

    // Base Sepolia Testnet Tokens (to be replaced with actual Base tokens)
    // For testnet Phase 1, we'll use placeholder addresses
    // In Phase 2, replace with real Base ecosystem tokens

    struct TokenConfig {
        address token;
        address priceFeed;
        uint256 weightBps;
        string name;
    }

    /* ========== MAIN CONFIGURATION ========== */

    function run(address vaultAddress, address oracleAddress) external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        BASE10Vault vault = BASE10Vault(vaultAddress);
        PriceOracle oracle = PriceOracle(oracleAddress);

        console2.log("=================================");
        console2.log("VAULT CONFIGURATION");
        console2.log("=================================");
        console2.log("Vault:", vaultAddress);
        console2.log("Oracle:", oracleAddress);
        console2.log("Deployer:", deployer);
        console2.log("=================================\n");

        vm.startBroadcast(deployerPrivateKey);

        // Note: For Base Sepolia testnet, we need to either:
        // 1. Deploy our own mock ERC20 tokens, OR
        // 2. Use existing testnet tokens
        //
        // For this demo, we'll show the configuration pattern
        // The actual token addresses should be replaced with real Base testnet tokens

        console2.log("Configuration script ready.");
        console2.log("Please deploy test tokens first, then update this script with addresses.");
        console2.log("\nTo add tokens manually:");
        console2.log("1. Deploy or find testnet tokens");
        console2.log("2. Configure price feeds in oracle");
        console2.log("3. Add tokens to vault with weights (total = 7000 bps)");
        console2.log("\nExample commands:");
        console2.log('  cast send <ORACLE> "setPriceFeed(address,address)" <TOKEN> <FEED> --private-key $PRIVATE_KEY');
        console2.log('  cast send <VAULT> "addToken(address,uint256)" <TOKEN> 700 --private-key $PRIVATE_KEY');

        vm.stopBroadcast();

        console2.log("\n=================================");
        console2.log("Configuration complete!");
        console2.log("=================================\n");
    }

    /* ========== TOKEN CONFIGURATION (Phase 2) ========== */

    /**
     * @notice Configure all 10 Base ecosystem tokens
     * @dev Uncomment and update addresses for mainnet deployment
     */
    function configureBaseTokens(address vaultAddress, address oracleAddress) external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        BASE10Vault vault = BASE10Vault(vaultAddress);
        PriceOracle oracle = PriceOracle(oracleAddress);

        // Base Ecosystem Tokens (10 tokens @ 700 bps each = 7000 bps total)
        TokenConfig[10] memory tokens = [
            TokenConfig({
                token: address(0), // AERO (Aerodrome)
                priceFeed: address(0), // Chainlink AERO/USD feed
                weightBps: 700,
                name: "Aerodrome (AERO)"
            }),
            TokenConfig({
                token: address(0), // BSWP (BaseSwap)
                priceFeed: address(0),
                weightBps: 700,
                name: "BaseSwap (BSWP)"
            }),
            TokenConfig({
                token: address(0), // SEAM (Seamless)
                priceFeed: address(0),
                weightBps: 700,
                name: "Seamless (SEAM)"
            }),
            TokenConfig({
                token: address(0), // WELL (MoonWell)
                priceFeed: address(0),
                weightBps: 700,
                name: "MoonWell (WELL)"
            }),
            TokenConfig({
                token: address(0), // EXTRA (Extra Finance)
                priceFeed: address(0),
                weightBps: 700,
                name: "Extra Finance (EXTRA)"
            }),
            TokenConfig({
                token: address(0), // PAINT (BasePaint)
                priceFeed: address(0),
                weightBps: 700,
                name: "BasePaint (PAINT)"
            }),
            TokenConfig({
                token: address(0), // DEGEN
                priceFeed: address(0),
                weightBps: 700,
                name: "Degen (DEGEN)"
            }),
            TokenConfig({
                token: address(0), // BRETT
                priceFeed: address(0),
                weightBps: 700,
                name: "Brett (BRETT)"
            }),
            TokenConfig({
                token: address(0), // TOSHI
                priceFeed: address(0),
                weightBps: 700,
                name: "Toshi (TOSHI)"
            }),
            TokenConfig({
                token: address(0), // NORMIE
                priceFeed: address(0),
                weightBps: 700,
                name: "Normie (NORMIE)"
            })
        ];

        vm.startBroadcast(deployerPrivateKey);

        console2.log("Configuring Base ecosystem tokens...\n");

        for (uint256 i = 0; i < tokens.length; i++) {
            TokenConfig memory config = tokens[i];

            if (config.token == address(0)) {
                console2.log("Skipping", config.name, "- address not configured");
                continue;
            }

            // Configure price feed in oracle
            console2.log("Setting price feed for:", config.name);
            oracle.setPriceFeed(config.token, config.priceFeed);

            // Add token to vault
            console2.log("Adding token to vault:", config.name);
            console2.log("Weight (bps):", config.weightBps);
            vault.addToken(config.token, config.weightBps);

            console2.log("[OK] Token configured:", config.name);
            console2.log("");
        }

        vm.stopBroadcast();

        console2.log("All tokens configured successfully!");
    }
}
