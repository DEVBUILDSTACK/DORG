import { createPublicClient, http } from "viem";
import { createBundlerClient, createPaymasterClient } from "viem/account-abstraction";
import { base, baseSepolia } from "viem/chains";

import { isProduction } from "@/lib/constants";

// Dynamic chain selection based on environment
export const currentChain = isProduction ? base : baseSepolia;

export const client = createPublicClient({
    chain: currentChain,
    transport: http(),
});

const paymasterService = process.env.COINBASE_PAYMASTER_URL!;

export const paymasterClient = createPaymasterClient({
    transport: http(paymasterService),
});

export const bundlerClient = createBundlerClient({
    chain: currentChain,
    paymaster: paymasterClient,
    transport: http(paymasterService),
});
