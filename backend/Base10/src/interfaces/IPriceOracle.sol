// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title IPriceOracle
 * @notice Interface for price oracle with safety checks
 * @dev Supports Chainlink primary + TWAP fallback
 */
interface IPriceOracle {
    /* ========== EVENTS ========== */

    event PriceFeedUpdated(address indexed token, address indexed feed);
    event FallbackOracleUsed(address indexed token);
    event PriceUpdated(address indexed token, uint256 price);

    /* ========== ERRORS ========== */

    error InvalidPrice();
    error StalePrice();
    error PriceOutOfBounds();
    error NoFeedAvailable();

    /**
     * @notice Get price for a token in USD (18 decimals)
     * @param token Address of the token
     * @return price Price in USD with 18 decimals
     */
    function getPrice(address token) external view returns (uint256 price);

    /**
     * @notice Get price with fallback to TWAP if Chainlink fails
     * @param token Address of the token
     * @return price Price in USD with 18 decimals
     */
    function getPriceWithFallback(address token) external view returns (uint256 price);

    /**
     * @notice Set Chainlink price feed for a token
     * @param token Address of the token
     * @param feed Address of the Chainlink aggregator
     */
    function setPriceFeed(address token, address feed) external;
}
