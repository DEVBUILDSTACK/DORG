use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct UserAccount {
    pub owner: Pubkey,                // User wallet
    pub shares: u64,                  // Vault shares owned
    pub last_deposit_ts: i64,         // Timestamp of last deposit (for lockups)
    pub bump: u8,                     // PDA bump
}