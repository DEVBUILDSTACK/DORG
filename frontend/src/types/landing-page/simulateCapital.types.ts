import z from "zod";

export const simulateCapitalSchema = z.object({
    principalAmount: z.string(),
    monthlyIncome: z.string(),
    fundingPlan: z.string().min(1, "Please select a funding plan"),
});

export type SimulteCapitalFormData = z.infer<typeof simulateCapitalSchema>;

export type Tier = {
    id: string;
    start_amount: string;
    platform_name: string;
    description: string;
    name: string;
    end_amount: string;
    monthly_interest_rate: string;
};

export type AutoRenewal = {
    id: string;
    advanced_cancellation_num_days: number;
    code: string;
    description: string;
};

export type RemittanceLink = {
    id: string;
    number_months_options: number[];
    remittance: RemittanceDetail;
};

export type RemittanceDetail = {
    id: string;
    name: string;
    description: string;
};

export type YieldSchedule = {
    id: string;
    name: string;
    description: string;
    tiers: Tier[];
};

export type LPType = {
    min_principal_amount: string;
    status: string;
    beneficial_entity: boolean;
    name: string;
    principal_donation: boolean | number[];
    lp_type: string;
    top_up_funding_allowed: boolean;
    id: string;
    platform: string;
    interest_donation: boolean | number[];
    description: string;
    num_of_installment: number;
    autorenewals: AutoRenewal[];
    remittance_links: RemittanceLink[];
    yield_schedule: YieldSchedule[];
};

export type FLPData = {
    lp_type?: string;
    net_amount?: string;
    principal_amount?: string;
    installment?: string;
    remittance_id?: string;
    contract_duration?: string;
    lp_type_id?: string;
    grant_of_interest_return?: string | undefined;
    grant_of_principal_return?: string | undefined;
};

export type Metadata = {
    total_records: number;
    has_more: boolean;
    offset: number;
    limit: number;
};

export type ApiResponse<T> = {
    data: T;
    message: string;
    status_code: number;
    metadata: Metadata;
};

export type CohoartApiResponse<T> = {
    data: T | null;
    message: string;
    status_code: number;
    metadata: Metadata;
};
