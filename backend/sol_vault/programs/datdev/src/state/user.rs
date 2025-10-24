use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct UserAccount {
    pub owner: Pubkey,          
    pub shares: u64,             
    pub last_deposit_ts: i64,       
    pub bump: u8,                    
}
