// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {AggregatorV3Interface} from "../interfaces/AggregatorV3Interface.sol";

/**
 * @title MockChainlinkOracle
 * @notice Mock Chainlink price feed for testing
 * @dev Allows setting prices and simulating oracle failures
 */
contract MockChainlinkOracle is AggregatorV3Interface {
    uint8 private _decimals;
    string private _description;
    uint256 private _version;

    int256 private _answer;
    uint256 private _updatedAt;
    uint80 private _roundId;
    uint80 private _answeredInRound;

    bool private _shouldRevert;
    bool private _isStale;

    constructor(uint8 decimals_, string memory description_) {
        _decimals = decimals_;
        _description = description_;
        _version = 1;
        _answer = 1e8; // $1.00 default
        _updatedAt = block.timestamp;
        _roundId = 1;
        _answeredInRound = 1;
    }

    function decimals() external view override returns (uint8) {
        return _decimals;
    }

    function description() external view override returns (string memory) {
        return _description;
    }

    function version() external view override returns (uint256) {
        return _version;
    }

    function getRoundData(
        uint80 /* _roundId */
    )
        external
        view
        override
        returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)
    {
        return latestRoundData();
    }

    function latestRoundData()
        public
        view
        override
        returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)
    {
        require(!_shouldRevert, "Oracle failure");

        roundId = _roundId;
        answer = _answer;
        startedAt = _updatedAt;
        updatedAt = _updatedAt;

        // Simulate staleness by returning lower answeredInRound
        if (_isStale) {
            answeredInRound = _roundId - 1;
        } else {
            answeredInRound = _answeredInRound;
        }
    }

    // Test helpers
    function setPrice(int256 newPrice) external {
        _answer = newPrice;
        _updatedAt = block.timestamp;
        _roundId++;
        _answeredInRound = _roundId;
    }

    function setStale(bool stale) external {
        _isStale = stale;
    }

    function setShouldRevert(bool shouldRevert) external {
        _shouldRevert = shouldRevert;
    }

    function setUpdatedAt(uint256 timestamp) external {
        _updatedAt = timestamp;
    }
}
