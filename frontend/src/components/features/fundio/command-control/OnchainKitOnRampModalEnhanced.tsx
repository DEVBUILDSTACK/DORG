"use client";

import {
    Alert,
    Button,
    Divider,
    Group,
    Modal,
    Paper,
    ScrollArea,
    Stack,
    Text,
    SimpleGrid,
    Badge,
} from "@mantine/core";
import { ArrowRight2, Copy, InfoCircle, Shield, TickCircle } from "iconsax-reactjs";
import dynamic from "next/dynamic";
import React, { useRef, useState, useEffect } from "react";
import { useAccount, useAccountEffect, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { base as baseChain } from "wagmi/chains";
import { useWalletStore } from "@/store";

const QRCode = dynamic(() => import("react-qr-code").then(m => m.default), { ssr: false });

/* ───────────────── constants ───────────────── */

const PRESET_AMOUNTS = [
  { value: 25, label: "$25", popular: false },
  { value: 50, label: "$50", popular: true },
  { value: 75, label: "$75", popular: false },
  { value: 100, label: "$100", popular: true },
  { value: 125, label: "$125", popular: false },
];

/* ───────────────── helpers ───────────────── */

const isMobileUA = () =>
    typeof navigator !== "undefined" && /iphone|ipad|ipod|android/i.test(navigator.userAgent);

function isCoinbaseInjected(): boolean {
    if (typeof window === "undefined")
        return false;
    const eth: any = (window as any).ethereum;
    if (!eth)
        return false;
    if (eth.isCoinbaseWallet)
        return true;
    return Array.isArray(eth.providers) && eth.providers.some((p: unknown) => (p as any)?.isCoinbaseWallet);
}

const wcUniversal = (uri: string) => `https://go.cb-w.com/wc?uri=${encodeURIComponent(uri)}`;

/* ───────────────── types ───────────────── */

type OnrampModalProps = {
    isOpen: boolean;
    onClose: () => void;
    presetAmount?: number;
};

type CoinbaseConnectOnlyProps = {
    onMobileConnectStarted?: () => void;
};

/* ───────────────── components ───────────────── */

function CoinbaseConnectOnly({ onMobileConnectStarted }: CoinbaseConnectOnlyProps) {
    const { connect, connectors } = useConnect();

    const [hint, setHint] = useState<string | null>(null);
    const [wcUri, setWcUri] = useState<string | null>(null);
    const [showQr, setShowQr] = useState(false);

    const cb = connectors.find(c => c.id === "coinbaseWallet");
    const injected = connectors.find(c => c.id === "injected");
    const wc = connectors.find(c => c.id === "walletConnect");

    const mobile = isMobileUA();
    const hasCBInjected = isCoinbaseInjected();

    async function connectDesktopCBW() {
        try {
            setHint(null);
            console.log("[OnRamp] Connecting Coinbase Wallet...");
            console.log("[OnRamp] Available connectors:", connectors.map(c => ({ id: c.id, ready: c.ready })));
            console.log("[OnRamp] Coinbase connector:", cb);
            console.log("[OnRamp] Has CB injected:", hasCBInjected);
            
            if (cb?.ready) {
                console.log("[OnRamp] Using coinbaseWallet connector");
                await connect({ connector: cb });
                return;
            }
            
            if (injected && hasCBInjected) {
                console.log("[OnRamp] Using injected connector");
                await connect({ connector: injected });
                return;
            }
            
            console.log("[OnRamp] No wallet found, opening download page");
            window.open("https://www.coinbase.com/wallet/downloads", "_blank", "noopener,noreferrer");
        } catch (error) {
            console.error("[OnRamp] Connection error:", error);
            setHint(`Connection failed: ${(error as Error)?.message || "Unknown error"}`);
        }
    }

    async function connectMobileWC(retry = false) {
        onMobileConnectStarted?.();
        setShowQr(true);
        setHint("Scan this QR with Coinbase Wallet on your phone to connect.");
        setWcUri(null);

        console.log("[OnRamp] Starting WalletConnect connection...");
        console.log("[OnRamp] WC connector:", wc);

        if (!wc) {
            setHint("WalletConnect not configured. Check NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID");
            console.error("[OnRamp] WalletConnect connector not found");
            return;
        }

        // clear possible stale sessions
        try {
            const p0 = await (wc as any).getProvider?.();
            await p0?.disconnect?.();
        } catch {}
        try {
            Object.keys(localStorage)
                .filter(k => k.startsWith("wc@") || k.toLowerCase().includes("walletconnect"))
                .forEach(k => localStorage.removeItem(k));
        } catch {}

        const provider: any = await (wc as any).getProvider?.();
        if (!provider) {
            setHint("WalletConnect provider not available.");
            console.error("[OnRamp] WalletConnect provider not available");
            return;
        }

        console.log("[OnRamp] WalletConnect provider obtained:", provider);

        let resolved = false;
        let cleaned = false;

        function cleanup() {
            if (cleaned)
                return;
            cleaned = true;
            provider.off?.("display_uri", onDisplayUri);
            provider.off?.("proposal_expire", onExpire);
            provider.off?.("session_expire", onExpire);
        }

        function onDisplayUri(uri: string) {
            console.log("[OnRamp] QR URI received:", uri);
            if (!resolved && uri) {
                resolved = true;
                setWcUri(uri);
                setHint(null);
            }
        }

        async function onExpire() {
            cleanup();
            setHint("QR expired — generating a new one…");
            console.log("[OnRamp] QR expired");
            try {
                await provider.disconnect?.();
            } catch {}
            try {
                Object.keys(localStorage)
                    .filter(k => k.startsWith("wc@") || k.toLowerCase().includes("walletconnect"))
                    .forEach(k => localStorage.removeItem(k));
            } catch {}
            if (!retry)
                setTimeout(() => connectMobileWC(true), 300);
            else setHint('QR expired. Tap "Connect Coinbase Wallet (mobile)" again.');
        }

        provider.off?.("display_uri", onDisplayUri);
        provider.on?.("display_uri", onDisplayUri);
        provider.off?.("proposal_expire", onExpire);
        provider.on?.("proposal_expire", onExpire);
        provider.off?.("session_expire", onExpire);
        provider.on?.("session_expire", onExpire);

        try {
            console.log("[OnRamp] Calling connect...");
            await connect({ connector: wc });
            console.log("[OnRamp] Connect called successfully");
            
            // Try multiple times with different intervals to catch the URI
            const checkForUri = (attempt: number) => {
                if (resolved || attempt > 5) return;
                
                console.log(`[OnRamp] URI check attempt ${attempt}/5`);
                const maybe = provider?.uri || 
                             provider?.connector?.uri || 
                             provider?.session?.uri ||
                             (provider as any)?._uri ||
                             (wc as any)?.uri;
                
                console.log(`[OnRamp] Attempt ${attempt} - Found URI:`, maybe);
                
                if (typeof maybe === "string" && maybe.startsWith("wc:")) {
                    onDisplayUri(maybe);
                } else if (attempt < 5) {
                    setTimeout(() => checkForUri(attempt + 1), 400);
                } else {
                    setHint("Connection initiated but QR not generated. Try closing and reopening modal.");
                }
            };
            
            // Start checking immediately and retry
            setTimeout(() => checkForUri(1), 100);
        } catch (err: unknown) {
            console.error("[OnRamp] Connection error:", err);
            const msg = String((err as Error)?.message || err).toLowerCase();
            if (msg.includes("expired")) {
                await onExpire();
            } else if (msg.includes("reset") || msg.includes("closed") || msg.includes("canceled")) {
                setHint("Request canceled/reset. Tap again to show a new QR.");
            } else {
                setHint(`WalletConnect failed: ${String((err as Error)?.message || err)}`);
            }
        } finally {
            setTimeout(cleanup, 6000);
        }
    }

    return (
        <Stack gap="xs">
            {!mobile && (
                <Button fullWidth h={38} onClick={connectDesktopCBW}>
                    {cb?.ready || hasCBInjected
                        ? "✓ Connect Coinbase Wallet (extension)"
                        : "📥 Install Coinbase Wallet Extension"}
                </Button>
            )}

            <Button fullWidth h={38} variant="filled" onClick={() => connectMobileWC()}>
                📱 Connect Coinbase Wallet (scan QR)
            </Button>

            {hint && (
                <Alert color={hint.includes("failed") || hint.includes("error") ? "red" : "blue"} p="xs">
                    <Text size="xs">{hint}</Text>
                </Alert>
            )}

            {showQr && (
                <Paper withBorder p="sm" radius="md">
                    <Stack gap="xs" align="center">
                        {wcUri
                            ? (
                                    <>
                                        <QRCode value={wcUniversal(wcUri)} size={220} />
                                        <Text size="xs" c="dimmed" ta="center" component="div">
                                            Scan with
                                            {" "}
                                            <b>Coinbase Wallet</b>
                                            . After approval we'll open
                                            <b>Coinbase Pay</b>
                                            {" "}
                                            on
                                            <b>Base</b>
                                            .
                                        </Text>

                                        {mobile && (
                                            <Button
                                                h={30}
                                                onClick={() => {
                                                    window.location.href = wcUniversal(wcUri);
                                                }}
                                            >
                                                Open in Wallet (this device)
                                            </Button>
                                        )}

                                        <Button
                                            h={30}
                                            variant="light"
                                            leftSection={<Copy size={16} />}
                                            onClick={() => navigator.clipboard?.writeText(wcUniversal(wcUri))}
                                            title="Copy deep link"
                                        >
                                            Copy link
                                        </Button>
                                    </>
                                )
                            : (
                                    <div style={{ height: 220, width: 220 }} className="flex items-center justify-center">
                                        <Text size="xs" c="dimmed" component="div">
                                            Waiting for QR…
                                        </Text>
                                    </div>
                                )}
                    </Stack>
                </Paper>
            )}

            {hint && (
                <Text size="xs" c="orange" component="div">
                    {hint}
                </Text>
            )}
        </Stack>
    );
}

/* ───────── Enhanced Modal with Preset Amounts ───────── */

export default function OnrampModal({ isOpen, onClose, presetAmount }: OnrampModalProps) {
    const { address: connectedAddress, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const { switchChainAsync } = useSwitchChain();
    const { addDeposit } = useWalletStore();

    const [selectedAmount, setSelectedAmount] = useState<number | null>(presetAmount || null);
    const payWinRef = useRef<Window | null>(null);
    const [err, setErr] = useState<string | null>(null);
    const [depositInProgress, setDepositInProgress] = useState(false);

    useEffect(() => {
        if (presetAmount) {
            setSelectedAmount(presetAmount);
        }
    }, [presetAmount]);

    const paintPopup = (html: string) => {
        if (payWinRef.current && !payWinRef.current.closed) {
            try {
                payWinRef.current.document.open();
                payWinRef.current.document.write(html);
                payWinRef.current.document.close();
            } catch {}
        }
    };

    const preOpenPopup = () => {
        if (isMobileUA())
            return;
        const width = 500;
        const height = 700;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;
        try {
            payWinRef.current = window.open(
                "",
                "coinbase_onramp",
                `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`,
            );
            paintPopup(
                `<html><body style="font-family:system-ui;margin:0;display:grid;place-items:center;height:100vh;background:#0F1115;color:#fff"><div style="text-align:center"><div style="font-size:14px;opacity:.7">Preparing Coinbase Pay…</div></div></body></html>`,
            );
        } catch {}
    };

    const buildPayUrl = async (): Promise<string> => {
        if (!isConnected || !connectedAddress)
            throw new Error("Connect Coinbase Wallet first.");
        const addresses = [{ address: connectedAddress, blockchains: ["base"] as const }];
        const assets = ["USDC"];

        // Add preset amount if selected
        const requestData: any = { addresses, assets };
        if (selectedAmount) {
            requestData.presetAmount = selectedAmount;
        }

        const res = await fetch("/api/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        });

        const text = await res.text();
        let json: unknown;
        try {
            json = text ? JSON.parse(text) : {};
        } catch {
            json = { raw: text };
        }
        if (!res.ok)
            throw new Error((json as any)?.error ?? text ?? "Failed to init onramp session");

        const token = (json as any)?.token as string | undefined;
        if (!token)
            throw new Error("No token returned from /api/session");

        const url = new URL("https://pay.coinbase.com/buy/select-asset");
        url.searchParams.set("sessionToken", token);
        
        // Add preset amount to URL if selected
        if (selectedAmount) {
            url.searchParams.set("defaultPaymentAmount", selectedAmount.toString());
        }
        
        return url.toString();
    };

    async function openCoinbasePay(): Promise<void> {
        const watchdog = setTimeout(() => {
            paintPopup(
                `<html><body style="font-family:system-ui;margin:0;display:grid;place-items:center;height:100vh;background:#1b1e23;color:#ffb020"><div style="max-width:520px;padding:24px;text-align:center">Still preparing Coinbase Pay…</div></body></html>`,
            );
        }, 8000);

        try {
            const href = await buildPayUrl();
            clearTimeout(watchdog);

            // Track deposit initiation
            if (connectedAddress && selectedAmount) {
                setDepositInProgress(true);
                addDeposit({
                    id: `deposit_${Date.now()}`,
                    amount: selectedAmount.toString(),
                    walletAddress: connectedAddress,
                    timestamp: Date.now(),
                    status: "pending",
                });
            }

            if (isMobileUA()) {
                window.location.href = href;
                return;
            }

            if (payWinRef.current && !payWinRef.current.closed) {
                try {
                    payWinRef.current.location.replace(href);
                    payWinRef.current.focus();
                    return;
                } catch {}
            }
            const w = window.open(href, "coinbase_onramp", "width=500,height=700,resizable=yes,scrollbars=yes");
            if (!w)
                throw new Error("Popup blocked");
        } catch (e: unknown) {
            clearTimeout(watchdog);
            const msg = String((e as Error)?.message || e);
            setErr(msg);
            setDepositInProgress(false);
            paintPopup(
                `<html><body style="font-family:system-ui;margin:0;display:grid;place-items:center;height:100vh;background:#1b1e23;color:#ffb020"><div style="max-width:520px;padding:24px;text-align:center"><div style="font-size:18px;margin-bottom:8px;">Failed to open Coinbase Pay</div><div style="font-size:13px;opacity:.85;white-space:pre-wrap">${msg}</div></div></body></html>`,
            );
        }
    }

    const ensureBaseThenOpenPay = async () => {
        try {
            await switchChainAsync?.({ chainId: baseChain.id }).catch(() => {});
        } catch {}
        await openCoinbasePay();
    };

    const openCoinbaseWalletSite = () => {
        window.open("https://wallet.coinbase.com/", "coinbase_wallet");
    };

    // Removed auto-launch behavior - user must click "Buy" button explicitly
    // This prevents the popup from opening immediately on wallet connect

    return (
        <Modal
            opened={isOpen}
            onClose={onClose}
            size="lg"
            radius="lg"
            withCloseButton
            title={(
                <Group gap="xs">
                    <Text fw={600} component="span">OnRamp / Buy Crypto</Text>
                    {depositInProgress && <Badge color="yellow" size="sm">Deposit in progress...</Badge>}
                </Group>
            )}
            styles={{ body: { paddingTop: 0 } }}
        >
            <Divider mb="sm" />
            <ScrollArea h="65vh">
                <Stack gap="md">
                    {/* Preset Amounts */}
                    <Paper withBorder p="md" radius="md">
                        <Text fw={600} size="sm" mb="xs" component="div">
                            💵 Select Amount
                        </Text>
                        <SimpleGrid cols={5} spacing="xs">
                            {PRESET_AMOUNTS.map((preset) => (
                                <Button
                                    key={preset.value}
                                    variant={selectedAmount === preset.value ? "filled" : "outline"}
                                    onClick={() => setSelectedAmount(preset.value)}
                                    h={48}
                                    style={{ position: "relative" }}
                                >
                                    <Stack gap={2} align="center">
                                        <Text size="sm" fw={600}>{preset.label}</Text>
                                        {preset.popular && (
                                            <Badge size="xs" color="green" variant="dot">Popular</Badge>
                                        )}
                                    </Stack>
                                </Button>
                            ))}
                        </SimpleGrid>
                        {selectedAmount && (
                            <Group gap="xs" mt="sm">
                                <TickCircle size={16} color="#28a745" />
                                <Text size="xs" c="green">
                                    ${selectedAmount} selected
                                </Text>
                            </Group>
                        )}
                    </Paper>

                    {/* Wallet connect */}
                    <Paper withBorder p="md" radius="md">
                        <Text fw={600} size="sm" mb="xs" component="div">
                            🔗 Coinbase Wallet {isConnected && "✓"}
                        </Text>

                        {/* Debug info - remove after testing */}
                        <Paper bg="gray.9" p="xs" radius="sm" mb="sm">
                            <Text size="xs" c="dimmed">
                                Status: {isConnected ? "✓ Connected" : "⚠ Not connected"}
                            </Text>
                            {connectedAddress && (
                                <Text size="xs" c="dimmed" ff="monospace">
                                    {connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)}
                                </Text>
                            )}
                        </Paper>

                        <Paper withBorder p="sm" radius="md">
                            {isConnected && connectedAddress
                                ? (
                                        <Stack gap={6}>
                                            <Text size="xs" c="dimmed" component="div">Connected address</Text>
                                            <Text size="sm" ff="monospace" style={{ wordBreak: "break-all" }} component="div">
                                                {connectedAddress}
                                            </Text>
                                            <Button color="red" onClick={() => disconnect()} h={30} w={120}>
                                                Disconnect
                                            </Button>
                                        </Stack>
                                    )
                                : (
                                        <Stack gap="xs">
                                            <Text size="xs" c="dimmed" component="div">No wallet connected.</Text>
                                            <CoinbaseConnectOnly />
                                        </Stack>
                                    )}
                        </Paper>

                        <Stack gap="xs" mt="sm">
                            <Button
                                onClick={ensureBaseThenOpenPay}
                                disabled={!isConnected || !connectedAddress || !selectedAmount}
                                h={42}
                                variant="filled"
                                color="yellow"
                                style={{ color: "black" }}
                            >
                                {!isConnected 
                                    ? "Connect wallet first"
                                    : !selectedAmount
                                        ? "Select amount to continue"
                                        : `Buy $${selectedAmount} with Coinbase Pay`
                                }
                            </Button>
                            <Text size="xs" c="dimmed" component="div">
                                Funds will be deposited as USDC on Base network
                            </Text>
                            {err && (
                                <Text size="xs" c="orange" component="div">
                                    {err}
                                </Text>
                            )}
                        </Stack>
                    </Paper>

                    <Paper withBorder p="md" radius="md">
                        <Group gap="xs" mb={4}>
                            <Shield size={14} />
                            <Text size="xs" fw={600} component="div">Base Network Optimized</Text>
                        </Group>
                        <Text size="xs" c="dimmed" component="div">
                            Fast transactions (~2s) • Low fees (~$0.01) • Great for DeFi
                        </Text>
                    </Paper>

                    <Alert variant="light" color="blue" icon={<InfoCircle size={14} />}>
                        <Text size="xs" component="div">
                            Connect on your phone — we'll launch
                            {" "}
                            <b>Coinbase Pay</b>
                            {" "}
                            instantly to complete your buy.
                        </Text>
                    </Alert>
                </Stack>
            </ScrollArea>

            <Divider mt="sm" mb="sm" />
            <Button variant="outline" fullWidth onClick={onClose}>
                Close
            </Button>
        </Modal>
    );
}
