export type UseAuthLoginParams = {
    smart_wallet_address?: string;
    social_type?: string;
    username?: string;
    privy_user_id: string;
    primary_email: string;
};

export type GetUserApiResponse = {
    id: string;
    smart_wallet_address: string;
    social_type: string;
    username: string;
    primary_email: string;
    privy_user_id: string;
    safe_address: string;
    created_at: string;
    updated_at: string;
};
