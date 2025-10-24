use anchor_lang::prelude::*;

#[error_code]
pub enum VaultError {
    #[msg("Fee basis points must be less than 10000 (100%)")]
    InvalidFeeBps,
    
    #[msg("Performance fee basis points must be less than 10000 (100%)")]
    InvalidPerformanceFeeBps,
    
    #[msg("Combined fees exceed maximum allowed")]
    ExcessiveFees,

    #[msg("Weight basis points must be between 0 and 10000")]
    InvalidWeightBps,

    #[msg("Unauthorized action")]
    Unauthorized,

    #[msg("Arithmetic overflow occurred")]
    Overflow,

    #[msg("Vault is currently paused")]
    VaultPaused,

    #[msg("Invalid token list provided")]
    InvalidTokenList,

    #[msg("Token already exists in the vault")]
    TokenAlreadyExists,

    #[msg("Maximum token limit reached")]
    MaxTokensReached,

    #[msg("Invalid weights length - must match token count")]
    InvalidWeightsLength,

    #[msg("Total weight must equal 10000 bps (100%)")]
    InvalidTotalWeight,

    #[msg("Token entry does not belong to this token list")]
    TokenEntryMismatch,

    #[msg("Token mint not found in weights update")]
    TokenMintNotFound,

    #[msg("Inactive token cannot have weight")]
    InactiveTokenWeight,

    #[msg("Invalid token mint")]
    InvalidMint,

    #[msg("Invalid token account")]
    InvalidTokenAccount,

    #[msg("Invalid amount - must be greater than 0")]
    InvalidAmount,

    #[msg("Insufficient token balance")]
    InsufficientBalance,

    #[msg("Division by zero")]
    DivisionByZero,

    #[msg("Insufficient shares minted - amount too small")]
    InsufficientSharesMinted,

    #[msg("Insufficient shares")]
    NotEnoughShares,

    #[msg("Invalid account count in remaining accounts")]
    InvalidAccountCount,

    #[msg("Vault token account not found in remaining accounts")]
    VaultTokenAccountNotFound,

    #[msg("Vault is already paused")]
    VaultAlreadyPaused,

    #[msg("Vault is not paused")]
    VaultNotPaused,
}
