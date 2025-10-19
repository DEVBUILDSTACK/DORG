// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title PrecisionLib
 * @notice Library for handling decimal normalization across different token standards
 * @dev All internal calculations use 18 decimals for precision
 *
 * CRITICAL SECURITY NOTE:
 * This library prevents precision loss when dealing with:
 * - USDC/USDT (6 decimals)
 * - Chainlink prices (8 decimals)
 * - Standard ERC20 (18 decimals)
 */
library PrecisionLib {
    /* ========== CONSTANTS ========== */

    uint256 internal constant INTERNAL_DECIMALS = 18;
    uint256 internal constant PRICE_DECIMALS = 8; // Chainlink
    uint256 internal constant USDC_DECIMALS = 6;
    uint256 internal constant BPS_DENOMINATOR = 10_000; // 100% = 10000 bps

    /* ========== ERRORS ========== */

    error InvalidDecimals();
    error Overflow();

    /**
     * @notice Normalize token amount to 18 decimals
     * @param amount Original amount
     * @param tokenDecimals Decimals of the token
     * @return Normalized amount with 18 decimals
     */
    function normalizeTokenAmount(uint256 amount, uint8 tokenDecimals) internal pure returns (uint256) {
        if (tokenDecimals > 77) revert InvalidDecimals(); // Prevent overflow

        if (tokenDecimals == INTERNAL_DECIMALS) {
            return amount;
        } else if (tokenDecimals < INTERNAL_DECIMALS) {
            return amount * 10 ** (INTERNAL_DECIMALS - tokenDecimals);
        } else {
            return amount / 10 ** (tokenDecimals - INTERNAL_DECIMALS);
        }
    }

    /**
     * @notice Normalize Chainlink price to 18 decimals
     * @param price Price from Chainlink (8 decimals)
     * @return Normalized price with 18 decimals
     */
    function normalizePrice(uint256 price) internal pure returns (uint256) {
        // Chainlink uses 8 decimals, scale to 18
        return price * 1e10;
    }

    /**
     * @notice Denormalize from 18 decimals to USDC decimals (6)
     * @param amount Amount with 18 decimals
     * @return Amount with 6 decimals
     */
    function denormalizeToUsdc(uint256 amount) internal pure returns (uint256) {
        return amount / 1e12;
    }

    /**
     * @notice Denormalize from 18 decimals to specific token decimals
     * @param amount Amount with 18 decimals
     * @param targetDecimals Target decimals
     * @return Amount with target decimals
     */
    function denormalize(uint256 amount, uint8 targetDecimals) internal pure returns (uint256) {
        if (targetDecimals > 77) revert InvalidDecimals();

        if (targetDecimals == INTERNAL_DECIMALS) {
            return amount;
        } else if (targetDecimals < INTERNAL_DECIMALS) {
            return amount / 10 ** (INTERNAL_DECIMALS - targetDecimals);
        } else {
            return amount * 10 ** (targetDecimals - INTERNAL_DECIMALS);
        }
    }

    /**
     * @notice Calculate USD value of a token amount
     * @param tokenAmount Amount of tokens
     * @param tokenDecimals Decimals of the token
     * @param tokenPrice Price from Chainlink (8 decimals)
     * @return USD value with 18 decimals
     *
     * @dev Formula: (tokenAmount * tokenPrice) normalized to 18 decimals
     * Example: 1000 USDC (6 decimals) at $1.00 (8 decimals)
     * = (1000 * 1e6) * (1 * 1e8) / (1e6 * 1e8) * 1e18 = 1000e18
     */
    function calculateUsdValue(
        uint256 tokenAmount,
        uint8 tokenDecimals,
        uint256 tokenPrice // Chainlink price (8 decimals)
    )
        internal
        pure
        returns (uint256)
    {
        // Normalize token amount to 18 decimals
        uint256 normalizedAmount = normalizeTokenAmount(tokenAmount, tokenDecimals);

        // Normalize price to 18 decimals
        uint256 normalizedPrice = normalizePrice(tokenPrice);

        // Calculate USD value: amount * price / 1e18
        return (normalizedAmount * normalizedPrice) / 1e18;
    }

    /**
     * @notice Calculate token amount from USD value
     * @param usdValue USD value with 18 decimals
     * @param tokenPrice Price from Chainlink (8 decimals)
     * @param tokenDecimals Decimals of the token
     * @return Token amount with token decimals
     */
    function calculateTokenAmount(uint256 usdValue, uint256 tokenPrice, uint8 tokenDecimals)
        internal
        pure
        returns (uint256)
    {
        if (tokenPrice == 0) revert InvalidDecimals();

        // Normalize price to 18 decimals
        uint256 normalizedPrice = normalizePrice(tokenPrice);

        // Calculate amount in 18 decimals: usdValue * 1e18 / price
        uint256 amount18 = (usdValue * 1e18) / normalizedPrice;

        // Denormalize to token decimals
        return denormalize(amount18, tokenDecimals);
    }

    /**
     * @notice Apply basis points to an amount
     * @param amount Amount to apply bps to
     * @param bps Basis points (10000 = 100%)
     * @return Result of amount * bps / 10000
     */
    function applyBps(uint256 amount, uint256 bps) internal pure returns (uint256) {
        return (amount * bps) / BPS_DENOMINATOR;
    }

    /**
     * @notice Calculate percentage of total
     * @param part Partial amount
     * @param total Total amount
     * @return Percentage in basis points
     */
    function calculateBps(uint256 part, uint256 total) internal pure returns (uint256) {
        if (total == 0) return 0;
        return (part * BPS_DENOMINATOR) / total;
    }
}
