use anchor_lang::prelude::*;

use crate::{error::VaultError, state::{TokenEntry, TokenList, VaultState}};

#[derive(Accounts)]
pub struct UpdateWeights<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        constraint = vault_state.admin == authority.key() || vault_state.rebalancer == authority.key() @ VaultError::Unauthorized,
        constraint = !vault_state.paused @ VaultError::VaultPaused,
        has_one = token_list @ VaultError::InvalidTokenList,
    )]
    pub vault_state: Account<'info, VaultState>,

    #[account(
        constraint = token_list.vault == vault_state.key() @ VaultError::InvalidTokenList,
    )]
    pub token_list: Account<'info, TokenList>,

    pub system_program: Program<'info, System>,
}

pub fn update_weights(
    ctx: Context<UpdateWeights>,
    new_weights: Vec<(Pubkey, u16)>,
) -> Result<()> {
    let vault_state = &mut ctx.accounts.vault_state;
    let token_list = &ctx.accounts.token_list;
    let clock = Clock::get()?;

    require!(
        new_weights.len() as u8 == token_list.token_count,
        VaultError::InvalidWeightsLength
    );

    let total_weight: u32 = new_weights.iter().map(|(_, weight)| *weight as u32).sum();
    require!(
        total_weight == 10_000,
        VaultError::InvalidTotalWeight
    );

    for (_, weight) in &new_weights {
        require!(
            *weight <= 10_000,
            VaultError::InvalidWeightBps
        );
    }

    require!(
        ctx.remaining_accounts.len() as u8 == token_list.token_count,
        VaultError::InvalidWeightsLength
    );

    let mut processed_count = 0u8;

    for account_info in ctx.remaining_accounts.iter() {
        let mut data = account_info.try_borrow_mut_data()?;
        let mut token_entry = TokenEntry::try_deserialize(&mut &data[..])?;

        require!(
            token_entry.token_list == token_list.key(),
            VaultError::TokenEntryMismatch
        );

        let new_weight = new_weights
            .iter()
            .find(|(mint, _)| *mint == token_entry.mint)
            .ok_or(VaultError::TokenMintNotFound)?
            .1;

        if !token_entry.is_active {
            require!(
                new_weight == 0,
                VaultError::InactiveTokenWeight
            );
        }

        token_entry.weight_bps = new_weight;

        let mut writer = &mut data[..];
        token_entry.try_serialize(&mut writer)?;

        processed_count += 1;
    }

    require!(
        processed_count == token_list.token_count,
        VaultError::InvalidWeightsLength
    );

    vault_state.last_rebalance = clock.unix_timestamp;

    Ok(())
}
