// Query keys
export const QUERY_KEYS = {
    GET_LP_LIST: "getLPList",
    GET_LP_DETAIL: "getLPDetail",
    GET_INSTALLMENT_DETAIL: "getInstallmentDetail",
    GET_YIELD_DETAIL: "getYieldDetail",
    GET_LP_ANALYTICS: "getLPAnalytics",
    GET_LP_KPI: "getLPKPI",
    GET_USER_DETAIL: "getUserDetail",
};

export const coinbaseSmartWalletProxyBytecode
    = "0x363d3d373d3d363d7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc545af43d6000803e6038573d6000fd5b3d6000f3";
export const coinbaseSmartWalletV1Implementation
    = "0x000100abaad02f1cfC8Bbe32bD5a564817339E72";
export const magicSpendAddress = "0x011A61C07DbF256A68256B1cB51A5e246730aB92";
export const erc1967ProxyImplementationSlot
    = "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";

// USDC contract addresses for different chains
export const USDC_ADDRESSES = {
    // Base Mainnet USDC
    8453: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as `0x${string}`,
    // Base Sepolia USDC (testnet)
    84532: "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as `0x${string}`,
};

// Dynamic USDC contract address based on environment
export const isProduction = process.env.NODE_ENV === "production";
export const usdcContractAddress = isProduction
    ? USDC_ADDRESSES[8453] // Base Mainnet
    : USDC_ADDRESSES[84532]; // Base Sepolia

// ERC20 ABI for USDC operations
export const erc20ABI = [
    {
        type: "function",
        name: "transfer",
        inputs: [
            { name: "to", type: "address" },
            { name: "amount", type: "uint256" },
        ],
        outputs: [{ name: "", type: "bool" }],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "decimals",
        inputs: [],
        outputs: [{ name: "", type: "uint8" }],
        stateMutability: "view",
    },
] as const;

export const coinbaseSmartWalletABI = [
    {
        type: "function",
        name: "executeBatch",
        inputs: [
            {
                name: "calls",
                type: "tuple[]",
                internalType: "struct CoinbaseSmartWallet.Call[]",
                components: [
                    {
                        name: "target",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "value",
                        type: "uint256",
                        internalType: "uint256",
                    },
                    {
                        name: "data",
                        type: "bytes",
                        internalType: "bytes",
                    },
                ],
            },
        ],
        outputs: [],
        stateMutability: "payable",
    },
];
