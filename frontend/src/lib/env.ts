/* eslint-disable node/no-process-env */

/**
 * Centralized environment access to avoid node/no-process-env
 * warnings across the app. Import { ENV } from "@/lib/env".
 */
export const ENV = {
    APP_NAME: "Fundio",
    APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    APP_ICON_URL: "/icon.png",

    WC_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,

    BASE_RPC: "https://mainnet.base.org",
    BASE_SEPOLIA_RPC: "https://base-sepolia-rpc.publicnode.com",
    ETHEREUM_RPC: "https://eth.llamarpc.com",
} as const;
