// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { ISwapRouter } from "../interfaces/ISwapRouter.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title MockSwapRouter
 * @notice Mock DEX router for testing
 * @dev Simulates 1:1 swaps with configurable slippage
 */
contract MockSwapRouter is ISwapRouter {
    using SafeERC20 for IERC20;

    uint256 public slippageBps = 30; // 0.3% default slippage

    event SwapExecuted(address indexed tokenIn, address indexed tokenOut, uint256 amountIn, uint256 amountOut);

    function setSlippage(uint256 newSlippageBps) external {
        slippageBps = newSlippageBps;
    }

    /**
     * @notice Execute a mock swap
     * @dev Simulates 1:1 swap with slippage
     * Takes tokenIn from caller, mints tokenOut to caller
     */
    function swap(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 minAmountOut,
        bytes calldata /* swapData */
    )
        external
        override
        returns (uint256 amountOut)
    {
        // Transfer tokenIn from caller
        IERC20(tokenIn).safeTransferFrom(msg.sender, address(this), amountIn);

        // Calculate output with slippage (1:1 ratio minus slippage)
        amountOut = (amountIn * (10_000 - slippageBps)) / 10_000;

        // Check slippage protection
        require(amountOut >= minAmountOut, "Slippage exceeded");

        // Mint tokenOut to caller (for testing)
        MockERC20(tokenOut).mint(msg.sender, amountOut);

        emit SwapExecuted(tokenIn, tokenOut, amountIn, amountOut);
    }
}

// Helper interface
interface MockERC20 {
    function mint(address to, uint256 amount) external;
}
