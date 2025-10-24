export type ManageLpsResponse = {
    id: string;
    contact: string;
    status: "Funded" | "Pending";
    totalCommitted: { amount: number; currency: string };
    originationFee: number;
    configuredYield: number;
    interestYield: number;
    contractDuration: number;
    interestRemittanceMode: string;
    lpFundingPayments: number;
    startedAt: string;
    nextInstallment: { amount: number; status: "Pending" | "Paid"; paymentDate?: string };
};

export type LPDetails = {
    id: string;
    name: string;
    status: "Funded" | "Pending";
    totalCommitment: number;
    committed: number;
    pendingFunding: number;
    interestYield: number;
    totalWithdrawable: number;
    lpType: string;
    installments: number;
    autoRenewal: string;
    remittanceMode: string;
    duration: string;
    interestGrant?: number;
    principalGrant?: number;
    beneficialEntity?: string;
    about?: string;
};

export type LPListResponse = {
    user_id: string;
    lp_id: string;
    lp_type_name: string;
    lp_fund_status: string;
    lp_status: string;
    total_commited: string;
    orginate_fee: string;
    current_yield: string;
    configurd_yield: string;
    duration: number;
    total_installments: number;
    remittance_name: string;
    net_loan_amount: string;
    created_at: string;
    updated_at: string;
    next_installment_amount: string;
};

// my
export type LPByIdResponse = {
    id: string;
    user_id: string;
    principal: string;
    total_commitment: string;
    commited_amount: string;
    number_months: number;
    yield_schedule_id: string;
    lp_type_id: string;
    installments: number;
    lp_type_name: string;
    remittance_id: string;
    remittance_name: string;
    tier_id: string;
    autorenewal_id: string;
    autorenewal_code: string;
    platform: string;
    fund_status: string;
    lp_status: string;
    yield_interest_rate: string;
    effective_date: string;
    stored_full_effective_date: string;
    created_at: string;
    updated_at: string;
    pending_amount: string;
    total_withdrawable_amount: string;
    grant_of_interest_return: string;
    grant_of_principal_return: string;
    beneficiary_name: string;
};

export type GetInstallmentData = {
    id: string;
    amount: string;
    user_id: string;
    cohort_schedule_id: string;
    lp_id: string;
    created_at: string;
    updated_at: string;
};

export type YieldData = {
    id: string;
    start_date: string;
    yield_amount: string;
    yield_rate: string;
    end_date: string;
    status: string;
    user_id: string;
    lp_id: string;
    remittance_id: string;
};
