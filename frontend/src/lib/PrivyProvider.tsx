"use client";

import { OnchainKitProvider } from "@coinbase/onchainkit";
import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClientProvider } from "@tanstack/react-query";
import { base, baseSepolia, mainnet } from "viem/chains";
import { WagmiProvider } from "wagmi";

import queryClient from "@/lib/query.config";
import { wagmiConfig } from "@/lib/wagmi";

import { isProduction } from "./constants";

export default function Providers({ children }: { children: React.ReactNode }) {
    const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || 'dummy-app-id';
    const wcProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'dummy-wc-id';
    const cbApiKey = process.env.NEXT_PUBLIC_COINBASE_API_KEY || 'dummy-cb-key';
    const cpPaymasterUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/paymaster`;
    const currentChain = isProduction ? base : baseSepolia;

    // Don't render Privy during build time if app ID is missing
    if (privyAppId === 'dummy-app-id' && typeof window === 'undefined') {
        return (
            <WagmiProvider config={wagmiConfig}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </WagmiProvider>
        );
    }

    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <PrivyProvider
                    appId={privyAppId}
                    config={{
                        // 🔑 Required so Privy’s WalletConnect client can initialize
                        walletConnectCloudProjectId: wcProjectId,

                        // Chains you use (Base + Base Sepolia + Mainnet)
                        supportedChains: [base, baseSepolia, mainnet],
                        defaultChain: base,

                        loginMethods: ["google", "apple", "email", "wallet"],
                        appearance: {
                            theme: "dark",
                            accentColor: "#0a1016",
                            logo: "/web-app-manifest-192x192.png",
                            landingHeader: "Sign in / Sign up",
                            walletList: ["coinbase_wallet"],
                        },

                        fundingMethodConfig: {
                            moonpay: {
                                paymentMethod: "credit_debit_card",
                                uiConfig: { accentColor: "#696FFD", theme: "dark" },
                            },
                        },

                    }}
                >
                    <OnchainKitProvider
                        apiKey={cbApiKey}
                        chain={currentChain}
                        config={{
                            appearance: {
                                mode: "dark",
                            },
                            wallet: {
                                display: "modal",
                                preference: "smartWalletOnly",
                            },
                            paymaster: cpPaymasterUrl,
                        }}
                    >
                        {children}
                    </OnchainKitProvider>
                </PrivyProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
