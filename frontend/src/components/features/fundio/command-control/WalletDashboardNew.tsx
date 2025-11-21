"use client";

import { ActionIcon, CopyButton, Tooltip, Skeleton, Badge, Group } from "@mantine/core";
import { IoMdCheckmark } from "react-icons/io";
import { PiSealCheckFill } from "react-icons/pi";
import { RxCopy } from "react-icons/rx";
import { Refresh, Add } from "iconsax-reactjs";
import { useWalletManager, useWalletBalance, useCreatePrivyWallet } from "@/hooks/useWalletManager";
import { formatUSD, shortenAddress } from "@/lib/cdp/wallet";
import { useState } from "react";
import Button from "@/components/ui/button/Button";

type WalletCardProps = {
    name: string;
    address: string;
    chain: string;
    bagBalance: string;
    tokenizedHoldings: string;
    depositAsset: string;
    isLoading?: boolean;
};

function WalletCard({ name, address, chain, bagBalance, tokenizedHoldings, depositAsset, isLoading }: WalletCardProps) {
    // Fetch real-time balance for this wallet
    const { nativeBalance, usdcBalance } = useWalletBalance(address);

    return (
        <div className="bg-gradient-to-br from-[#C2FF94]/14 to-[#7FD33E]/14 p-px rounded-xl">
            <div className="bg-c3-background hover:bg-gradient-to-tr from-c3-background via-secondary/14 to-primary/30 p-4 rounded-xl transition-all duration-300">
                <div className="flex gap-4 pr-8">
                    <PiSealCheckFill className="shrink-0 size-5 text-[#09B285] mt-1" />
                    <div className="w-full">
                        <div className="flex flex-col gap-1 mb-2">
                            <Group gap="xs">
                                <h3 className="text-white font-semibold xl:text-xl text-3xl">{name}</h3>
                                <Badge size="xs" color="blue" variant="light">{chain}</Badge>
                            </Group>
                            <div className="flex items-center gap-2">
                                <span className="xl:text-xs text-base text-white">
                                    <span className="text-white/80 font-light">Address:</span>
                                    {" "}
                                    {shortenAddress(address)}
                                </span>

                                <CopyButton value={address} timeout={2000}>
                                    {({ copied, copy }) => (
                                        <Tooltip classNames={{ tooltip: "text-xs" }} label={copied ? "Copied" : "Copy"} withArrow position="right">
                                            <ActionIcon classNames={{ icon: "size-3" }} color={copied ? "teal" : "gray"} variant="subtle" onClick={copy}>
                                                {copied ? <IoMdCheckmark /> : <RxCopy />}
                                            </ActionIcon>
                                        </Tooltip>
                                    )}
                                </CopyButton>
                            </div>
                        </div>

                        {isLoading ? (
                            <Skeleton height={60} radius="md" />
                        ) : (
                            <>
                                <div>
                                    <p className="xl:text-xs text-base text-white/80 font-light mb-1">Native Balance</p>
                                    <p className="xl:text-lg text-2xl font-light text-white">
                                        {nativeBalance} {chain.includes("Solana") ? "SOL" : "ETH"}
                                    </p>
                                </div>

                                <div className="my-4 h-[1px] bg-gradient-to-r from-transparent via-[#BDBF1B]/16 to-transparent" />

                                <div className="flex justify-between gap-4 mt-4 mb-2">
                                    <div>
                                        <p className="xl:text-xs text-base text-white/80 font-light mb-1">USDC Balance</p>
                                        <p className="xl:text-lg text-2xl font-light text-white">
                                            ${usdcBalance}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="xl:text-xs text-base text-white/80 font-light mb-1">Total Value (est.)</p>
                                        <p className="xl:text-lg text-2xl font-light text-white">{depositAsset}</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function WalletDashboard() {
    const { wallets, isRefreshing, refreshBalances } = useWalletManager();
    const { createEmbeddedWallet } = useCreatePrivyWallet();
    const [isCreating, setIsCreating] = useState(false);

    const handleCreateWallet = async (chainType: "base" | "solana") => {
        setIsCreating(true);
        try {
            await createEmbeddedWallet(chainType);
        } catch (error) {
            console.error("Failed to create wallet:", error);
        } finally {
            setIsCreating(false);
        }
    };

    const handleRefresh = async () => {
        await refreshBalances();
    };

    // Calculate total value across all wallets
    const totalValue = wallets.reduce((sum, wallet) => {
        const nativeValue = parseFloat(wallet.balance?.native || "0") * 3500; // Rough ETH price
        const usdcValue = parseFloat(wallet.balance?.usdc || "0");
        return sum + nativeValue + usdcValue;
    }, 0);

    return (
        <div className="space-y-4">
            {/* Header with actions */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-white text-2xl font-semibold">My Wallets</h2>
                    <p className="text-white/60 text-sm">
                        Total Value: {formatUSD(totalValue)}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Tooltip label="Refresh balances" withArrow>
                        <ActionIcon 
                            onClick={handleRefresh} 
                            loading={isRefreshing}
                            variant="light"
                            color="green"
                            size="lg"
                        >
                            <Refresh size={20} />
                        </ActionIcon>
                    </Tooltip>
                    <Button
                        onClick={() => handleCreateWallet("base")}
                        variant="outline"
                        className="border border-primary/50 rounded-xl !h-10 !px-4 xl:!text-xs !text-base"
                        disabled={isCreating}
                    >
                        <Add size={16} />
                        Create Wallet
                    </Button>
                </div>
            </div>

            {/* Wallet Cards */}
            {wallets.length === 0 ? (
                <div className="bg-fundio-sidebar rounded-xl p-8 text-center">
                    <p className="text-white/60 mb-4">No wallets connected yet</p>
                    <Button
                        onClick={() => handleCreateWallet("base")}
                        variant="primary"
                        className="rounded-xl !h-10 !px-6"
                        disabled={isCreating}
                    >
                        Create Your First Wallet
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {wallets.map((wallet) => (
                        <WalletCard
                            key={wallet.id}
                            name={wallet.label || "Wallet"}
                            address={wallet.address}
                            chain={wallet.chain.toUpperCase()}
                            bagBalance={wallet.balance?.native || "0"}
                            tokenizedHoldings={wallet.balance?.usdc || "0"}
                            depositAsset={formatUSD(
                                (parseFloat(wallet.balance?.native || "0") * 3500) +
                                parseFloat(wallet.balance?.usdc || "0")
                            )}
                            isLoading={isRefreshing}
                        />
                    ))}
                </div>
            )}

            {/* Quick Actions */}
            <div className="bg-fundio-sidebar rounded-xl p-4">
                <h3 className="text-white text-sm font-semibold mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                    <Button
                        variant="outline"
                        className="border border-white/10 rounded-lg !h-10 xl:!text-xs !text-base"
                    >
                        Send Funds
                    </Button>
                    <Button
                        variant="outline"
                        className="border border-white/10 rounded-lg !h-10 xl:!text-xs !text-base"
                    >
                        Swap Tokens
                    </Button>
                </div>
            </div>
        </div>
    );
}
