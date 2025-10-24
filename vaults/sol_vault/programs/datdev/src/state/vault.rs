use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct VaultState {
    pub admin: Pubkey,                // Admin authority
    pub rebalancer: Pubkey,           // Rebalancing authority (can be different from admin)
    pub treasury: Pubkey,             // Treasury account for fees
    pub usdc_mint: Pubkey,            // USDC mint address (deposit/withdraw token)
    pub token_list: Pubkey,           // Pointer to TokenList account
    pub total_shares: u64,            // Total shares issued
    pub total_value_usdc: u64,        // Total vault value in USDC (last updated)
    pub last_rebalance: i64,          // Timestamp of last rebalance
    pub fee_bps: u16,                 // Management fee in basis points
    pub performance_fee_bps: u16,     // Performance fee in basis points
    pub paused: bool,                 // Emergency pause flag
    pub bump: u8,                     // PDA bump
}