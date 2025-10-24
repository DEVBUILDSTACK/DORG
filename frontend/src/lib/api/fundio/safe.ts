import { NextApiGet } from "@/lib/api-helper";

type SafeCreationResponse = {
    success: boolean;
    safeAddress: string;
};

export const createSafeWallet = async (): Promise<SafeCreationResponse> => {
    try {
        const response = await NextApiGet<SafeCreationResponse>("/api/safe");
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
