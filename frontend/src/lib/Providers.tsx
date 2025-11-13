"use client";

import { OnchainKitProvider } from "@coinbase/onchainkit";
import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClientProvider } from "@tanstack/react-query";
import { base, baseSepolia, mainnet } from "viem/chains";
import { WagmiProvider } from "wagmi";

import queryClient from "@/lib/query.config";
import { wagmiConfig } from "@/lib/wagmi";
import { ENV } from "./env";
import { isProduction } from "./constants";
import StoreProvider from "@/components/providers/StoreProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
    const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID!;
    const wcProjectId = ENV.WC_PROJECT_ID;
    const cbApiKey = process.env.NEXT_PUBLIC_COINBASE_API_KEY!;
    const currentChain = isProduction ? base : baseSepolia;

    return (
        <PrivyProvider
            appId={privyAppId}
            config={{
                appearance: {
                    theme: "light",
                    accentColor: "#FF6B35",
                    logo: "/assets/images/l2l.jpg",
                    landingHeader: "Welcome to Learn2Launch",
                    loginMessage: "Sign in to access your personalized dashboard",
                    walletList: ["coinbase_wallet", "metamask"],
                    showWalletLoginFirst: false,
                },
                loginMethods: ["email", "wallet", "google"],
                walletConnectCloudProjectId: wcProjectId,
                supportedChains: [base, baseSepolia, mainnet],
                defaultChain: currentChain,
                embeddedWallets: {
                    createOnLogin: "users-without-wallets",
                    noPromptOnSignature: false,
                } as any,
            }}
        >
            <QueryClientProvider client={queryClient}>
                <WagmiProvider config={wagmiConfig}>
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
                        }}
                    >
                        <StoreProvider>
                            {children}
                        </StoreProvider>
                    </OnchainKitProvider>
                </WagmiProvider>
            </QueryClientProvider>
        </PrivyProvider>
    );
}
