use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{Mint, Token, TokenAccount},
};

use crate::{error::VaultError, state::{TokenEntry, TokenList, VaultState}};

#[derive(Accounts)]
pub struct AddToken<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        constraint = vault_state.admin == authority.key() @ VaultError::Unauthorized,
        constraint = !vault_state.paused @ VaultError::VaultPaused,
        has_one = token_list @ VaultError::InvalidTokenList,
    )]
    pub vault_state: Account<'info, VaultState>,
    
    #[account(
        mut,
        constraint = token_list.vault == vault_state.key() @ VaultError::InvalidTokenList,
    )]
    pub token_list: Account<'info, TokenList>,

    #[account(
        init,
        payer = authority,
        space = 8 + TokenEntry::INIT_SPACE,
        seeds = [b"tokenentry", token_list.key().as_ref(), mint.key().as_ref()],
        bump
    )]
    pub token_entry: Account<'info, TokenEntry>,

    pub mint: Account<'info, Mint>,

    #[account(
        init_if_needed,
        payer = authority,
        associated_token::mint = mint,
        associated_token::authority = vault_state,
    )]
    pub vault_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

pub fn add_token(
    ctx: Context<AddToken>,
    weight_bps: u16,
) -> Result<()> {

    require!(
        weight_bps <= 10000,
        VaultError::InvalidWeightBps
    );

    require!(
        ctx.accounts.token_list.token_count < 255,
        VaultError::MaxTokensReached
    );

    let token_entry = &mut ctx.accounts.token_entry;
    let token_list = &mut ctx.accounts.token_list;

    token_entry.token_list = token_list.key();
    token_entry.mint = ctx.accounts.mint.key();
    token_entry.vault_token_account = ctx.accounts.vault_token_account.key();
    token_entry.weight_bps = weight_bps;
    token_entry.is_active = true;
    token_entry.bump = ctx.bumps.token_entry;

    token_list.token_count = token_list
        .token_count
        .checked_add(1)
        .ok_or(VaultError::Overflow)?;
    
    Ok(())
}