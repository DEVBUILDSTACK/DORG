import type { GetUserApiResponse, UseAuthLoginParams } from "@/types/auth";
import type { ApiResponse } from "@/types/landing-page/simulateCapital.types";

import { ApiGet, ApiPost, ApiPut } from "@/lib/api-helper";

export const createUser = async (data: UseAuthLoginParams): Promise<ApiResponse<string>> => {
    const response = await ApiPost<ApiResponse<string>>("/users/create", data, {}, false);
    return response;
};

export const getUser = async (): Promise<ApiResponse<GetUserApiResponse>> => {
    const response = await ApiGet<ApiResponse<GetUserApiResponse>>(`/users/get-one`);
    return response;
};

export const updateUser = async (data: { smart_wallet_address: `0x${string}`; user_id: string }): Promise<ApiResponse<string>> => {
    const response = await ApiPut<ApiResponse<string>>(`/users/update`, data);
    return response;
};
