import { useLogin, useLogout } from "@privy-io/react-auth";
import { useMutation } from "@tanstack/react-query";
import { useAccount, useDisconnect } from "wagmi";

import type { UseAuthLoginParams } from "@/types/auth";

import { createUser } from "@/lib/api/auth/auth";
import useFLPStore from "@/store/useFLPStore";

type UseAuthLoginOptions = {
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
};

export const useAuthLogin = (options?: UseAuthLoginOptions) => {
    const { disconnect } = useDisconnect();
    const { setSignature } = useFLPStore();
    const { address } = useAccount();

    const { logout } = useLogout({
        onSuccess: () => {
            disconnect();
        },
    });

    const createUserMutation = useMutation({
        mutationFn: ({
            smart_wallet_address,
            social_type,
            username,
            privy_user_id,
            primary_email,
        }: UseAuthLoginParams) => createUser({
            smart_wallet_address,
            social_type,
            username,
            privy_user_id,
            primary_email,
        }),
        onSuccess: (data) => {
            options?.onSuccess?.(data);
        },
        onError: (error) => {
            options?.onError?.(error);
            logout();
        },
    });

    const { login } = useLogin({
        onComplete: (data) => {
            const social_type = data.loginMethod === "google" ? "google" : undefined;

            // Get the wallet address
            const walletAddress = address ?? undefined;

            createUserMutation.mutate({
                smart_wallet_address: walletAddress ?? undefined,
                social_type: social_type ?? undefined,
                username: data.user.google?.name ?? undefined,
                privy_user_id: data.user.id,
                primary_email: data.user.email?.address as string || data.user.google?.email as string,
            });
            options?.onSuccess?.(data);
        },
        onError: (error) => {
            options?.onError?.(error);
            setSignature("");
            logout();
        },
    });

    return {
        login,
        createUserMutation,
        isLoading: createUserMutation.isPending,
        error: createUserMutation.error,
    };
};
