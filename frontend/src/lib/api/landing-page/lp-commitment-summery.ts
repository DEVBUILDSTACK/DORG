import type { LpCommitmentResponse, LpCommitmentSummary, LpConfig } from "@/types/landing-page/lpCommitment";
import type { ApiResponse } from "@/types/landing-page/simulateCapital.types";

import { ApiPost } from "@/lib/api-helper";

export const getLpCommitmentSummary = async (data: LpCommitmentSummary): Promise<ApiResponse<LpCommitmentResponse>> => {
    const response = await ApiPost<ApiResponse<LpCommitmentResponse>>("/lp-config/commitment-summary", data);
    return response;
};

export const createLpConfig = async (data: LpConfig): Promise<ApiResponse<string>> => {
    const response = await ApiPost<ApiResponse<string>>("/lp-config/create", data);
    return response;
};
