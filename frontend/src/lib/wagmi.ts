"use client";

import { createConfig, http } from "wagmi";
import { base, baseSepolia, mainnet } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

import { ENV } from "./env";

export const wagmiConfig = createConfig({
    ssr: true,
    chains: [base, baseSepolia, mainnet] as const,
    transports: {
        [base.id]: http(ENV.BASE_RPC),
        [baseSepolia.id]: http(ENV.BASE_SEPOLIA_RPC),
        [mainnet.id]: http(ENV.ETHEREUM_RPC),
    },
    connectors: [
        injected({ shimDisconnect: true }),
        // keep your Coinbase Wallet behavior; uses centralized env for logo/name
        coinbaseWallet({
            appName: ENV.APP_NAME,
            appLogoUrl: ENV.APP_ICON_URL,
            preference: { options: "smartWalletOnly" },
        }),
        ...(ENV.WC_PROJECT_ID
            ? [
                    walletConnect({
                        projectId: ENV.WC_PROJECT_ID,
                        showQrModal: false,
                        relayUrl: "wss://relay.walletconnect.com",
                        metadata: {
                            name: ENV.APP_NAME,
                            description: `${ENV.APP_NAME} dapp`,
                            url: ENV.APP_URL, // ideally absolute https in production
                            icons: [ENV.APP_ICON_URL], // prefer absolute https URL
                        },
                    }),
                ]
            : []),
    ],
});
