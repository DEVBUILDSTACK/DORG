// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title ISwapRouter
 * @notice Interface for DEX aggregator (1inch, Paraswap, etc.)
 * @dev Simplified interface for executing token swaps
 */
interface ISwapRouter {
    /**
     * @notice Execute a token swap
     * @param tokenIn Address of token to sell
     * @param tokenOut Address of token to buy
     * @param amountIn Amount of tokenIn to sell
     * @param minAmountOut Minimum amount of tokenOut to receive (slippage protection)
     * @param swapData Encoded swap route data from aggregator API
     * @return amountOut Actual amount of tokenOut received
     */
    function swap(address tokenIn, address tokenOut, uint256 amountIn, uint256 minAmountOut, bytes calldata swapData)
        external
        returns (uint256 amountOut);
}
