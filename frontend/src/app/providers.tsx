"use client";

import React from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrivyProvider } from "@privy-io/react-auth";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { base, baseSepolia, mainnet } from "viem/chains";

import { wagmiConfig } from "@/lib/wagmi";
import { isProduction } from "@/lib/constants";

// If you already have a shared QueryClient instance, you can import it instead.
const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  // Read env once here
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID!;
  const wcProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;
  const cbApiKey = process.env.NEXT_PUBLIC_COINBASE_API_KEY!;
  const cpPaymasterUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/paymaster`!;
  const currentChain = isProduction ? base : baseSepolia;

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <PrivyProvider
          appId={privyAppId}
          config={{
            walletConnectCloudProjectId: wcProjectId,
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
            externalWallets: {
              coinbaseWallet: {
                // NOTE: Privy expects { config }, NOT { connectionOptions }
                config: {
                  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "Fundio",
                  appLogoUrl: "/web-app-manifest-192x192.png",
                  preference: { options: "smartWalletOnly" },
                },
              },
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
              appearance: { mode: "dark" },
              wallet: { display: "modal", preference: "smartWalletOnly" },
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
