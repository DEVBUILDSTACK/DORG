use anchor_lang::prelude::*;

use crate::error::VaultError;
use crate::state::{TokenList, VaultState};

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        payer = authority,
        space = 8 + VaultState::INIT_SPACE,
        seeds = [b"vault", authority.key().as_ref()],
        bump
    )]
    pub vault_state: Account<'info, VaultState>,

    #[account(
        init,
        payer = authority,
        space = 8 + TokenList::INIT_SPACE,
        seeds = [b"tokenlist", vault_state.key().as_ref()],
        bump
    )]
    pub token_list: Account<'info, TokenList>,

    pub system_program: Program<'info, System>,
}

pub fn initialize(
    ctx: Context<Initialize>,
    fee_bps: u16,
    performance_fee_bps: u16,
) -> Result<()> {
    require!(
        fee_bps < 5000,
        VaultError::InvalidFeeBps
    );
    
    require!(
        performance_fee_bps < 5000,
        VaultError::InvalidPerformanceFeeBps
    );
    
    require!(
        (fee_bps as u32 + performance_fee_bps as u32) < 5000,
        VaultError::ExcessiveFees
    );

    let vault_state = &mut ctx.accounts.vault_state;
    let token_list = &mut ctx.accounts.token_list;
    let clock = Clock::get()?;

    vault_state.admin = ctx.accounts.authority.key();
    vault_state.rebalancer = ctx.accounts.authority.key(); 
    vault_state.treasury = ctx.accounts.authority.key();
    vault_state.token_list = token_list.key();
    vault_state.total_shares = 0;
    vault_state.total_value_usdc = 0;
    vault_state.last_rebalance = clock.unix_timestamp;
    vault_state.fee_bps = fee_bps;
    vault_state.performance_fee_bps = performance_fee_bps;
    vault_state.paused = false;
    vault_state.bump = ctx.bumps.vault_state;

    token_list.vault = vault_state.key();
    token_list.token_count = 0;
    token_list.bump = ctx.bumps.token_list;

    Ok(())
}