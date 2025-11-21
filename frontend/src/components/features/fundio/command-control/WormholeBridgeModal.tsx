"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

type Net = "Mainnet" | "Testnet";

export type WormholeBridgeModalProps = {
    isOpen: boolean;
    // Next.js client entry rule: function props should end with "Action"
    onCloseAction: () => void;
};

// Props for Wormhole Connect so TS accepts the `config` prop
type WormholeConnectProps = {
    config: {
        network: Net;
        wallets: { walletConnectProjectId: string };
        ui: {
            title: string;
            mode: "dark" | "light";
            primary: string;
        };
    };
};

const WormholeConnectNoSSR = dynamic<WormholeConnectProps>(
    () =>
        import("@wormhole-foundation/wormhole-connect").then((m) => {
            return (m.default ?? m) as React.ComponentType<WormholeConnectProps>;
        }),
    { ssr: false },
);
// Client-safe env var
const WC_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

if (!WC_PROJECT_ID) {
    console.warn("[WormholeBridge] NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID not set. Bridge may not work properly.");
}

export default function WormholeBridgeModal({
    isOpen,
    onCloseAction,
}: WormholeBridgeModalProps) {
    const [mounted, setMounted] = useState(false);
    const [network, setNetwork] = useState<Net>("Testnet");

    // wagmi (underscore unused to satisfy lint rules)
    const {
        address: _address,
        isConnected: _isConnected,
        connector: _activeConnector,
    } = useAccount();
    const {
        connect: _connect,
        connectors: _connectors,
        isPending: _isPending,
        error: _connectError,
    } = useConnect();
    const { disconnect: _disconnect } = useDisconnect();

    useEffect(() => {
        const id = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(id);
    }, []);

    // Strongly typed config for Wormhole Connect
    const config: WormholeConnectProps["config"] = useMemo(
        () => ({
            network, // "Mainnet" | "Testnet"
            wallets: { walletConnectProjectId: WC_PROJECT_ID },
            ui: {
                title: network === "Testnet" ? "Wormhole Bridge (Testnet)" : "Wormhole Bridge",
                mode: "light",
                primary: "#FF6B35",
            },
        }),
        [network],
    );

    if (!isOpen)
        return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/70 p-4 flex items-center justify-center">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-[#E5E7EB] shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[#E5E7EB]">
                    <h2 className="text-[#1F2937] font-semibold">
                        {network === "Testnet" ? "Wormhole Bridge (Testnet)" : "Wormhole Bridge"}
                    </h2>
                    <button
                        type="button"
                        onClick={onCloseAction}
                        className="w-8 h-8 rounded-full text-[#5A6C7D] hover:text-[#FF6B35] hover:bg-[#FFE5DC]"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                {/* Network Toggle */}
                <div className="p-3 border-b border-[#E5E7EB]">
                    <div className="mx-auto w-fit bg-[#FFE5DC] rounded-lg p-1 flex gap-1">
                        <button
                            type="button"
                            onClick={() => setNetwork("Testnet")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                                network === "Testnet" ? "bg-[#FF6B35] text-white" : "text-[#5A6C7D] hover:bg-white"
                            }`}
                        >
                            Testnet
                        </button>
                        <button
                            type="button"
                            onClick={() => setNetwork("Mainnet")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                                network === "Mainnet" ? "bg-[#FF6B35] text-white" : "text-[#5A6C7D] hover:bg-white"
                            }`}
                        >
                            Mainnet
                        </button>
                    </div>
                    <p className="mt-2 text-center text-xs text-[#5A6C7D]">
                        Sepolia, Base Sepolia, Arbitrum Sepolia, Optimism Sepolia, Solana Devnet, etc.
                    </p>
                </div>

                {/* Wormhole Connect */}
                <div className="p-4 overflow-auto max-h-[55vh]">
                    {mounted ? <WormholeConnectNoSSR key={`wh-${network}`} config={config} /> : null}
                </div>

                <div className="p-3 border-t border-[#E5E7EB] bg-[#F9FAFB] text-center">
                    <span className="text-[11px] text-[#5A6C7D]">Powered by Wormhole</span>
                </div>
            </div>
        </div>
    );
}
