export type YrMetrics = {
    future_value: string;
    yield_amount: string;
    yield_percentage: string;
};

export type MonthFvYieldList = {
    future_value: string;
    month: string;
    yield_: string;
};

export type LpCommitmentResponse = {
    autorenewal_date: string;
    effective_date: string;
    full_effective_date: string;
    net_loan_amount: string;
    principal: string;
    origination_fee: string;
    average_monthly_interest: string;
    compound_power_duration_percentage: string;
    cumulative_duration_yield: string;
    month_fv_yield_list: MonthFvYieldList[];
    monthly_interest: string;
    monthly_interest_rate: string;
    period_return_percentage: string;
    yr1_metrics: YrMetrics;
    yr2_metrics: YrMetrics;
};

export type LpConfig = {
    principal: string;
    platform: string;
    lp_type_id: string;
    installments: string;
    number_months: string;
    remittance_id: string;
    yield_schedule_id: string;
    autorenewal_id: string;
    user_id: string;
    sign_hash: string;
    cohort_schedule_id?: string | undefined;
    grant_of_interest_return?: string | undefined;
    grant_of_principal_return?: string | undefined;
};

export type LpCommitmentSummary = {
    principal: string;
    platform: string;
    lp_type_id: string;
    installments: string;
    number_months: string;
    remittance_id: string;
    yield_schedule_id: string;
    autorenewal_id: string;
    cohort_schedule_id?: string | undefined;
    grant_of_interest_return?: string | undefined;
    grant_of_principal_return?: string | undefined;
};
