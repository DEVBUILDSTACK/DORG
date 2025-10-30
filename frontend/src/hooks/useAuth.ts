import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

import useFLPStore from "@/store/useFLPStore";
import { clearUserRole } from "@/lib/roleStorage";

type UseAuthOptions = {
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    redirectOnSuccess?: string;
};

export const useAuth = (options?: UseAuthOptions) => {
    const router = useRouter();
    const { setSignature } = useFLPStore();
    const { 
        ready, 
        authenticated, 
        user, 
        login, 
        logout: privyLogout 
    } = usePrivy();
    const { wallets } = useWallets();

    const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === "privy");

    const handleLogin = async () => {
        try {
            await login();
        } catch (error) {
            options?.onError?.(error);
        }
    };

    const handleLogout = async () => {
        try {
            setSignature("");
            
            // Clear user role from localStorage
            clearUserRole();
            
            await privyLogout();
        } catch (error) {
            options?.onError?.(error);
        }
    };

    return {
        ready,
        authenticated,
        user,
        wallet: embeddedWallet,
        wallets,
        login: handleLogin,
        logout: handleLogout,
        isLoading: !ready,
        getUserDisplayName: () => {
            if (!user) return null;
            return user.google?.name || 
                   user.apple?.email?.split('@')[0] || 
                   user.email?.address?.split('@')[0] || 
                   user.wallet?.address?.slice(0, 6) + '...' + user.wallet?.address?.slice(-4) ||
                   'User';
        },
    };
};
