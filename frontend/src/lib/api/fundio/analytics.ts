import type { GetLpAnalyticsKPIResponse, GetLpAnalyticsResponse } from "@/types/fundio/analytics.types";
import type { ApiResponse } from "@/types/landing-page/simulateCapital.types";

import { ApiGet } from "@/lib/api-helper";

export const getLPAnalyticsById = async (lp_type_id: string) => {
    try {
        const result = await ApiGet<ApiResponse<GetLpAnalyticsResponse>>(
            `/lps/get-lp-analytics/${lp_type_id}`,
        );
        return result.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getLPAnalyticsKPI = async () => {
    try {
        const result = await ApiGet<ApiResponse<GetLpAnalyticsKPIResponse>>(
            `/lps/get-managed-lps-kpi`,
        );
        return result.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
