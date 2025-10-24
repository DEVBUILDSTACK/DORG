export type LpAnalyticsLp = {
    lp_id: string;
    lp_type_name: string;
    yield_earned: string;
    yield_amount: string;
};

export type LpAnalyticsMonthlyAnalytics = {
    month: number;
    total_yield: string;
    total_yield_amount: string;
    lps: LpAnalyticsLp[];
};

export type GetLpAnalyticsResponse = {
    user_id: string;
    lp_type_name: string;
    target_yield: string;
    current_yield: string;
    current_progress: number;
    total_withdrawable_amount: string;
    monthly_analytics: LpAnalyticsMonthlyAnalytics[];
};

export type GetLpAnalyticsKPIResponse = {
    user_id: string;
    lp_type_name: string;
    lps_pending_amount: string;
    lifetime_yield_earned: string;
    total_lps_funding_amount: string;
    current_year_yield_earned: string;
};
