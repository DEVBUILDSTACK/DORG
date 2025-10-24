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
// Client-safe env var (warning about process.env can be ignored or keep as-is)
const WC_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

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
                mode: "dark",
                primary: "#16a34a",
            },
        }),
        [network],
    );

    if (!isOpen)
        return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/70 p-4 flex items-center justify-center">
            <div className="bg-[#111318] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-gray-800">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h2 className="text-white font-semibold">
                        {network === "Testnet" ? "Wormhole Bridge (Testnet)" : "Wormhole Bridge"}
                    </h2>
                    <button
                        type="button"
                        onClick={onCloseAction}
                        className="w-8 h-8 rounded-full text-gray-300 hover:text-white hover:bg-gray-700"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                {/* Network Toggle */}
                <div className="p-3 border-b border-gray-800">
                    <div className="mx-auto w-fit bg-gray-800/60 rounded-lg p-1 flex gap-1">
                        <button
                            type="button"
                            onClick={() => setNetwork("Testnet")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                                network === "Testnet" ? "bg-emerald-500 text-white" : "text-gray-300 hover:bg-gray-700"
                            }`}
                        >
                            Testnet
                        </button>
                        <button
                            type="button"
                            onClick={() => setNetwork("Mainnet")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                                network === "Mainnet" ? "bg-emerald-500 text-white" : "text-gray-300 hover:bg-gray-700"
                            }`}
                        >
                            Mainnet
                        </button>
                    </div>
                    <p className="mt-2 text-center text-xs text-gray-400">
                        Sepolia, Base Sepolia, Arbitrum Sepolia, Optimism Sepolia, Solana Devnet, etc.
                    </p>
                </div>

                {/* Wormhole Connect */}
                <div className="p-4 overflow-auto max-h-[55vh]">
                    {mounted ? <WormholeConnectNoSSR key={`wh-${network}`} config={config} /> : null}
                </div>

                <div className="p-3 border-t border-gray-800 bg-black/30 text-center">
                    <span className="text-[11px] text-gray-500">Powered by Wormhole</span>
                </div>
            </div>
        </div>
    );
}
