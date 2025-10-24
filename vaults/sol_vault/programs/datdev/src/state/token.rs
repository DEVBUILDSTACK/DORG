use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct TokenList {
    pub vault: Pubkey,
    pub token_count: u8,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct TokenEntry {
    pub token_list: Pubkey,
    pub mint: Pubkey,
    pub vault_token_account: Pubkey,
    pub weight_bps: u16,
    pub is_active: bool,
    pub bump: u8,
}
