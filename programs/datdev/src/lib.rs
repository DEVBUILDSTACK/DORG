use anchor_lang::prelude::*;

declare_id!("4GBv65CdfK7Y4yzVvE5QiPu8t27n6QLX64TCxr1SsJkT");

pub mod instructions;
pub mod error;
pub mod state;

use instructions::*;

#[program]
pub mod datdev {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, fee_bps: u16, performance_fee_bps: u16) -> Result<()> {
        instructions::initialize(ctx, fee_bps, performance_fee_bps)
    }

    pub fn add_token(ctx: Context<AddToken>, weight_bps: u16) -> Result<()> {
        instructions::add_token(ctx, weight_bps)
    }

    pub fn update_weights(ctx: Context<UpdateWeights>, new_weights: Vec<(Pubkey, u16)>) -> Result<()> {
        instructions::update_weights(ctx, new_weights)
    }
}


