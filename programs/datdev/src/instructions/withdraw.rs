use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

use crate::{error::VaultError, state::{UserAccount, VaultState}};

#[derive(Accounts)]
pub struct WithdrawSimple<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        constraint = !vault_state.paused @ VaultError::VaultPaused,
        seeds = [b"vault", vault_state.admin.as_ref()],
        bump = vault_state.bump,
    )]
    pub vault_state: Account<'info, VaultState>,

    #[account(
        mut,
        constraint = user_account.owner == user.key() @ VaultError::Unauthorized,
        seeds = [b"user", user.key().as_ref(), vault_state.key().as_ref()],
        bump = user_account.bump,
    )]
    pub user_account: Account<'info, UserAccount>,

    #[account(
        mut,
        constraint = vault_usdc_account.mint == vault_state.usdc_mint @ VaultError::InvalidMint,
    )]
    pub vault_usdc_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = user_usdc_account.owner == user.key() @ VaultError::InvalidTokenAccount,
        constraint = user_usdc_account.mint == vault_state.usdc_mint @ VaultError::InvalidMint,
    )]
    pub user_usdc_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

pub fn withdraw_simple(
    ctx: Context<WithdrawSimple>,
    shares: u64,
) -> Result<()> {
    let user_account = &mut ctx.accounts.user_account;
    let vault_state = &mut ctx.accounts.vault_state;

    require!(shares > 0, VaultError::InvalidAmount);
    require!(user_account.shares >= shares, VaultError::NotEnoughShares);
    require!(vault_state.total_shares > 0, VaultError::DivisionByZero);

    let usdc_amount = (shares as u128)
        .checked_mul(vault_state.total_value_usdc as u128)
        .ok_or(VaultError::Overflow)?
        .checked_div(vault_state.total_shares as u128)
        .ok_or(VaultError::DivisionByZero)? as u64;

    require!(usdc_amount > 0, VaultError::InvalidAmount);
    require!(
        ctx.accounts.vault_usdc_account.amount >= usdc_amount,
        VaultError::InsufficientBalance
    );

    let signer_seeds: &[&[&[u8]]] = &[&[
        b"vault",
        vault_state.admin.as_ref(),
        &[vault_state.bump],
    ]];

    token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.vault_usdc_account.to_account_info(),
                to: ctx.accounts.user_usdc_account.to_account_info(),
                authority: vault_state.to_account_info(),
            },
            signer_seeds,
        ),
        usdc_amount,
    )?;

    user_account.shares = user_account.shares.checked_sub(shares).unwrap();
    vault_state.total_shares = vault_state.total_shares.checked_sub(shares).unwrap();
    vault_state.total_value_usdc = vault_state.total_value_usdc.checked_sub(usdc_amount).unwrap();

    Ok(())
}
