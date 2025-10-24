import type { GetInstallmentData, LPByIdResponse, LPListResponse, YieldData } from "@/types/fundio/manage-lps.types";
import type { ApiResponse } from "@/types/landing-page/simulateCapital.types";

import { ApiDelete, ApiGet, ApiPost, ApiPut } from "@/lib/api-helper";

/* Get LP List */
export const getLPList = async (status: string, offset: number, limit: number) => {
    let url = `/lps/get-all-user-lps?limit=${limit}`;

    if (status) {
        url = `${url}&status=${status}`;
    }

    //  set offset to 0
    url = `${url}&offset=${offset}`;

    try {
        const result = await ApiGet<ApiResponse<LPListResponse[]>>(url);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/* Get LP by id */
export const getLPById = async (lp_id: string) => {
    try {
        const result = await ApiGet<ApiResponse<LPByIdResponse>>(
            `/lps/get-by-lp-id/${lp_id}`,
        );
        return result.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/* Get LP Installment by id */
export const getLPInstallmentById = async (lp_id: string) => {
    try {
        const result = await ApiGet<ApiResponse<GetInstallmentData[]>>(
            `/installments/get-installments/${lp_id}`,
        );
        return result.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/* Get LP Yield by id */
export const getLPYieldById = async (lp_id: string) => {
    try {
        const result = await ApiGet<ApiResponse<YieldData[]>>(
            `/yield/${lp_id}`,
        );
        return result.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/* Paid Installment */
export const installment = async (data: { lp_id: string; amount: string; cohort_schedule_id?: string | undefined }) => {
    try {
        const result = await ApiPost<ApiResponse<string>>(
            `/installments/pay-installment`,
            data,
        );
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/* Safe update */
export const safeUpdate = async (data: { safe_address: string }) => {
    try {
        const result = await ApiPut<ApiResponse<string>>(
            `/lp-config/add-safe-address/${data.safe_address}`,
            undefined,
        );
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/* delete lp */
export const deleteLp = async (lp_id: string) => {
    try {
        const result = await ApiDelete<ApiResponse<string>>(
            `/lp-config/delete/${lp_id}`,
        );
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
