use anchor_lang::prelude::*;

use crate::{error::VaultError, state::VaultState};

#[derive(Accounts)]
pub struct AdminOnly<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(
        mut,
        constraint = vault_state.admin == admin.key() @ VaultError::Unauthorized,
        seeds = [b"vault", vault_state.admin.as_ref()],
        bump = vault_state.bump,
    )]
    pub vault_state: Account<'info, VaultState>,

    pub system_program: Program<'info, System>,
}

pub fn pause(ctx: Context<AdminOnly>) -> Result<()> {
    let vault_state = &mut ctx.accounts.vault_state;

    require!(
        !vault_state.paused,
        VaultError::VaultAlreadyPaused
    );

    vault_state.paused = true;

    msg!("🚨 VAULT PAUSED");
    msg!("Admin: {}", ctx.accounts.admin.key());
    msg!("Timestamp: {}", Clock::get()?.unix_timestamp);

    Ok(())
}

pub fn unpause(ctx: Context<AdminOnly>) -> Result<()> {
    let vault_state = &mut ctx.accounts.vault_state;

    require!(
        vault_state.paused,
        VaultError::VaultNotPaused
    );

    vault_state.paused = false;

    Ok(())
}
