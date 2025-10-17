use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{self, Token, TokenAccount, Transfer},
};

use crate::{error::VaultError, state::{UserAccount, VaultState}};

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        constraint = !vault_state.paused @ VaultError::VaultPaused,
    )]
    pub vault_state: Account<'info, VaultState>,

    #[account(
        init_if_needed,
        space = 8 + UserAccount::INIT_SPACE,
        payer = user,
        seeds = [b"user", user.key().as_ref(), vault_state.key().as_ref()],
        bump
    )]
    pub user_account: Account<'info, UserAccount>,

    #[account(
        mut,
        constraint = user_token_account.mint == vault_state.usdc_mint @ VaultError::InvalidMint,
        constraint = user_token_account.owner == user.key() @ VaultError::InvalidTokenAccount,
    )]
    pub user_token_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = vault_token_account.mint == vault_state.usdc_mint @ VaultError::InvalidMint,
        constraint = vault_token_account.owner == vault_state.key() @ VaultError::InvalidTokenAccount,
    )]
    pub vault_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

pub fn deposit(
    ctx: Context<Deposit>,
    amount: u64,
) -> Result<()> {
    let vault_state = &mut ctx.accounts.vault_state;
    let user_account = &mut ctx.accounts.user_account;
    let clock = Clock::get()?;

    require!(
        amount > 0,
        VaultError::InvalidAmount
    );

    require!(
        ctx.accounts.user_token_account.amount >= amount,
        VaultError::InsufficientBalance
    );

    let shares_to_mint = if vault_state.total_shares == 0 || vault_state.total_value_usdc == 0 {
        amount
    } else {
        // subsequent deposits: shares = (amount * total_shares) / total_value_usdc
        let numerator = (amount as u128)
            .checked_mul(vault_state.total_shares as u128)
            .ok_or(VaultError::Overflow)?;
        
        let shares = numerator
            .checked_div(vault_state.total_value_usdc as u128)
            .ok_or(VaultError::DivisionByZero)?;
        
        require!(
            shares <= u64::MAX as u128,
            VaultError::Overflow
        );

        shares as u64
    };

    require!(
        shares_to_mint > 0,
        VaultError::InsufficientSharesMinted
    );

    let cpi_accounts = Transfer {
        from: ctx.accounts.user_token_account.to_account_info(),
        to: ctx.accounts.vault_token_account.to_account_info(),
        authority: ctx.accounts.user.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    token::transfer(cpi_ctx, amount)?;

    // initialize user account if this is first deposit
    if user_account.shares == 0 {
        user_account.owner = ctx.accounts.user.key();
        user_account.bump = ctx.bumps.user_account;
    }

    // update user account
    user_account.shares = user_account
        .shares
        .checked_add(shares_to_mint)
        .ok_or(VaultError::Overflow)?;
    user_account.last_deposit_ts = clock.unix_timestamp;

    // update vault state
    vault_state.total_shares = vault_state
        .total_shares
        .checked_add(shares_to_mint)
        .ok_or(VaultError::Overflow)?;
    
    vault_state.total_value_usdc = vault_state
        .total_value_usdc
        .checked_add(amount)
        .ok_or(VaultError::Overflow)?;

    Ok(())
}