use anchor_lang::prelude::*;

declare_id!("4GBv65CdfK7Y4yzVvE5QiPu8t27n6QLX64TCxr1SsJkT");

pub mod instructions;
pub mod error;
pub mod state;

use instructions::*;

#[program]
pub mod datdev {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}


