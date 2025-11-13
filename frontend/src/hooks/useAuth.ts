import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import useFLPStore from "@/store/useFLPStore";
import { useAuthStore, useUserStore } from "@/store";

type UseAuthOptions = {
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    redirectOnSuccess?: string;
};

export const useAuth = (options?: UseAuthOptions) => {
    const router = useRouter();
    const { setSignature } = useFLPStore();
    const authStore = useAuthStore();
    const userStore = useUserStore();
    
    const { 
        ready, 
        authenticated, 
        user, 
        login, 
        logout: privyLogout 
    } = usePrivy();
    const { wallets } = useWallets();

    const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === "privy");

    // Sync Privy state with Zustand stores
    useEffect(() => {
        authStore.setReady(ready);
    }, [ready, authStore]);

    useEffect(() => {
        authStore.setAuth(authenticated);
    }, [authenticated, authStore]);

    useEffect(() => {
        authStore.setWallets(wallets);
    }, [wallets, authStore]);
    
    useEffect(() => {
        if (user) {
            const userData = {
                id: user.id,
                email: user.email?.address,
                name: user.google?.name || user.apple?.email?.split('@')[0],
                walletAddress: user.wallet?.address,
                role: user.customMetadata?.role as any,
                customMetadata: user.customMetadata,
            };
            authStore.setUser(userData);
        } else {
            authStore.setUser(null);
        }
    }, [user, authStore]);

    const handleLogin = async () => {
        try {
            await login();
            options?.onSuccess?.(user);
        } catch (error) {
            options?.onError?.(error);
        }
    };

    const handleLogout = async () => {
        try {
            setSignature("");
            
            // Clear auth and user stores
            authStore.logout();
            userStore.reset();
            
            await privyLogout();
        } catch (error) {
            options?.onError?.(error);
        }
    };

    return {
        ready: authStore.isReady,
        authenticated: authStore.isAuthenticated,
        user: authStore.user,
        wallet: embeddedWallet,
        wallets: authStore.wallets,
        login: handleLogin,
        logout: handleLogout,
        isLoading: authStore.isLoading,
        getUserDisplayName: authStore.getUserDisplayName,
    };
};
