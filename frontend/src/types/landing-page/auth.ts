export type LoginResponse = {
    id: string;
    smart_wallet_address?: string;
    social_type: string | null;
    privy_user_id: string;
    primary_email: string;
    username: string | null;
    created_at: string;
    updated_at: string;
};
