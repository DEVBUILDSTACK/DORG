use anchor_lang::prelude::*;

use crate::{error::VaultError, state::{TokenList, VaultState}};

#[derive(Accounts)]
pub struct Rebalance<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        constraint = !vault_state.paused @ VaultError::VaultPaused,
        constraint = vault_state.admin == authority.key() || vault_state.rebalancer == authority.key() @ VaultError::Unauthorized,
        has_one = token_list @ VaultError::InvalidTokenList,
        seeds = [b"vault", vault_state.admin.as_ref()],
        bump = vault_state.bump,
    )]
    pub vault_state: Account<'info, VaultState>,

    #[account(
        constraint = token_list.vault == vault_state.key() @ VaultError::InvalidTokenList,
    )]
    pub token_list: Account<'info, TokenList>,

    pub system_program: Program<'info, System>,
}

pub fn rebalance(
    ctx: Context<Rebalance>,
    new_total_value_usdc: u64,
) -> Result<()> {
    let vault_state = &mut ctx.accounts.vault_state;
    let clock = Clock::get()?;

    // const MIN_REBALANCE_INTERVAL: i64 = 12 * 60 * 60; // 12 hours in seconds
    // require!(
    //     clock.unix_timestamp >= vault_state.last_rebalance + MIN_REBALANCE_INTERVAL,
    //     VaultError::RebalanceTooFrequent
    // );

    require!(
        new_total_value_usdc > 0,
        VaultError::InvalidAmount
    );

    // Update vault state
    vault_state.total_value_usdc = new_total_value_usdc;
    vault_state.last_rebalance = clock.unix_timestamp;

    Ok(())
}