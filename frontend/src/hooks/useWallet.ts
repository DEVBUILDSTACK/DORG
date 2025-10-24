import { useMutation, useQuery } from "@tanstack/react-query";
import { useConnect, useWalletClient } from "wagmi";

import { getUser, updateUser } from "@/lib/api/auth/auth";
import { QUERY_KEYS } from "@/lib/constants";
import useFLPStore from "@/store/useFLPStore";

type UseWalletOptions = {
    onSuccess?: (data: unknown) => void;
    onError?: (error: any) => void;
};

export const useWallet = (options?: UseWalletOptions) => {
    const { setSignature } = useFLPStore();
    const { connectAsync, connectors } = useConnect();
    const { data: walletClient } = useWalletClient();

    const cb = connectors.find(c => c.id === "coinbaseWallet");
    const injected = connectors.find(c => c.id === "injected");

    const { data: userData } = useQuery({
        queryKey: [QUERY_KEYS.GET_USER_DETAIL],
        queryFn: () => getUser(),
        retry: 2,
    });

    function isCoinbaseInjected(): boolean {
        if (typeof window === "undefined")
            return false;
        const eth: any = (window as any).ethereum;
        if (!eth)
            return false;
        if (eth.isCoinbaseWallet)
            return true;
        return Array.isArray(eth.providers) && eth.providers.some((p: unknown) => (p as any)?.isCoinbaseWallet);
    }

    const hasCBInjected = isCoinbaseInjected();

    const updateUserMutation = useMutation({
        mutationFn: (smart_wallet_address: `0x${string}`) => updateUser({ smart_wallet_address, user_id: userData?.data?.privy_user_id as string }),
        onSuccess: async (data) => {
            options?.onSuccess?.(data);
        },
        onError: (error) => {
            options?.onError?.(error);
        },
    });

    async function handleClientSign() {
        if (!walletClient) {
            throw new Error("Wallet client not available");
        }

        const account = walletClient.account;
        const message = `By signing this message, I confirm that I am the owner of wallet ${account?.address}. I agree to use this wallet to access and operate my account on Fundio. This signature does not initiate a blockchain transaction or cost gas. Date: ${new Date().toISOString()}`;

        try {
            const signature = await walletClient.signMessage({ message });
            if (!signature) {
                const err = new Error("Closed the wallet modal");
                options?.onError?.(err);
                return;
            }
            updateUserMutation.mutate(account?.address as `0x${string}`);
            setSignature(signature);
            options?.onSuccess?.(signature);
            return signature;
        } catch (err) {
            options?.onError?.(err);
            throw err;
        }
    }

    async function connectWallet() {
        try {
            let result;
            if (cb?.ready) {
                result = await connectAsync({ connector: cb });
            } else if (injected && hasCBInjected) {
                result = await connectAsync({ connector: injected });
            } else {
                window.open("https://www.coinbase.com/wallet/downloads", "_blank", "noopener,noreferrer");
                return;
            }

            if (!result || !result.accounts) {
                const err = new Error("Closed the modal");
                options?.onError?.(err);
                return;
            }

            options?.onSuccess?.(result);
            return result;
        } catch (error) {
            options?.onError?.(error);
            throw error;
        }
    }

    return {
        connectWallet,
        handleClientSign,
        updateUserMutation,
    };
};
