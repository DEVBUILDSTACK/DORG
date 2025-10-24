import type {
    Address,
    BlockTag,
    Hex,
} from "viem";
import type { UserOperation } from "viem/account-abstraction";

import {
    decodeAbiParameters,
    decodeFunctionData,
} from "viem";
import { entryPoint06Address } from "viem/account-abstraction";
import { base, baseSepolia } from "viem/chains";

import { client } from "@/app/api/config";
import {
    coinbaseSmartWalletABI,
    coinbaseSmartWalletProxyBytecode,
    coinbaseSmartWalletV1Implementation,
    erc20ABI,
    erc1967ProxyImplementationSlot,
    magicSpendAddress,
    usdcContractAddress,
} from "@/lib/constants";

/**
 * Determines whether to sponsor gas fees for user operations in the crowdfunding platform.
 * Sponsors USDC transfers from users to admin wallet for loan payments.
 *
 * @param params - The sponsorship validation parameters
 * @param params.chainId - Must be Base Sepolia (testnet) or Base Mainnet (production)
 * @param params.entrypoint - Must be EntryPoint 0.6
 * @param params.userOp - User operation containing USDC transfer call
 * @returns true if the operation should be sponsored, false otherwise
 */
export async function willSponsor({
    chainId,
    entrypoint,
    userOp,
}: { chainId: number; entrypoint: string; userOp: UserOperation<"0.6"> }) {
    // check chain id - support both Base Sepolia (testnet) and Base Mainnet (production)
    const supportedChainIds = [baseSepolia.id, base.id] as const;
    if (!supportedChainIds.includes(chainId as typeof supportedChainIds[number]))
        return false;
    // check entrypoint
    // not strictly needed given below check on implementation address, but leaving as example
    if (entrypoint.toLowerCase() !== entryPoint06Address.toLowerCase())
        return false;

    try {
        // check the userOp.sender is a proxy with the expected bytecode
        const code = await client.getCode({ address: userOp.sender });
        if (code !== coinbaseSmartWalletProxyBytecode)
            return false;

        // check that userOp.sender proxies to expected implementation
        const implementation = await client.request<{
            Parameters: [Address, Hex, BlockTag];
            ReturnType: Hex;
        }>({
            method: "eth_getStorageAt",
            params: [userOp.sender, erc1967ProxyImplementationSlot, "latest"],
        });
        const implementationAddress = decodeAbiParameters(
            [{ type: "address" }],
            implementation,
        )[0];
        if (implementationAddress !== coinbaseSmartWalletV1Implementation)
            return false;

        // check that userOp.callData is making a call we want to sponsor
        const calldata = decodeFunctionData({
            abi: coinbaseSmartWalletABI,
            data: userOp.callData,
        });

        // keys.coinbase.com always uses executeBatch
        if (calldata.functionName !== "executeBatch")
            return false;
        if (!calldata.args || calldata.args.length === 0)
            return false;

        const calls = calldata.args[0] as {
            target: Address;
            value: bigint;
            data: Hex;
        }[];
        // Allow up to 2 calls to support Magic Spend + USDC transfer for crowdfunding payments
        if (calls.length > 2)
            return false;

        let callToCheckIndex = 0;
        if (calls.length > 1) {
            // if there is more than one call, check if the first is a magic spend call
            if (calls[0].target.toLowerCase() !== magicSpendAddress.toLowerCase())
                return false;
            callToCheckIndex = 1;
        }

        // Check if it's a USDC transfer operation for crowdfunding payments
        const targetAddress = calls[callToCheckIndex].target.toLowerCase();
        if (targetAddress !== usdcContractAddress.toLowerCase()) {
            return false;
        }

        // Validate that the call is a USDC transfer function
        const innerCalldata = decodeFunctionData({
            abi: erc20ABI,
            data: calls[callToCheckIndex].data,
        });
        if (innerCalldata.functionName !== "transfer")
            return false;

        return true;
    } catch (e) {
        console.error(`willSponsor check failed: ${e}`);
        return false;
    }
}
