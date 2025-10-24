import type { ApiResponse, AutoRenewal, LPType, Tier } from "@/types/landing-page/simulateCapital.types";

import { ApiGet } from "@/lib/api-helper";

// Tier
export async function getAllTier(offset: number, limit: number, platform_name: string): Promise<ApiResponse<Tier[]>> {
    const params = new URLSearchParams({
        offset: offset.toString(),
        limit: limit.toString(),
        platform_name,
    });

    const response = await ApiGet<ApiResponse<Tier[]>>(`/tier/get-all?${params.toString()}`, {}, false);
    return response;
}

// AutoRenewal
export async function getAllAutoRenewal(offset: number, limit: number): Promise<ApiResponse<AutoRenewal[]>> {
    const params = new URLSearchParams({
        offset: offset.toString(),
        limit: limit.toString(),
    });

    const response = await ApiGet<ApiResponse<AutoRenewal[]>>(`/autorenewal/get-all?${params.toString()}`, {}, false);
    return response;
}

// LPs
export async function getAllLPType(offset: number, limit: number, platform_name: string, status: string): Promise<ApiResponse<LPType[]>> {
    const params = new URLSearchParams({
        offset: offset.toString(),
        limit: limit.toString(),
        platform_name,
        status,
    });

    const response = await ApiGet<ApiResponse<LPType[]>>(`/lp-types/get-all?${params.toString()}`, {}, false);
    return response;
}
