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
        // Coinbase Wallet connector - support both extension and mobile
        coinbaseWallet({
            appName: ENV.APP_NAME,
            appLogoUrl: ENV.APP_ICON_URL,
            preference: "all", // Support both smart wallet and EOA
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
                            url: ENV.APP_URL,
                            icons: [ENV.APP_ICON_URL],
                        },
                    }),
                ]
            : []),
    ],
});
