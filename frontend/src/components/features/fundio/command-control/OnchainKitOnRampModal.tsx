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
} from "@mantine/core";
import { ArrowRight2, Copy, InfoCircle, Shield } from "iconsax-reactjs";
import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";
import { useAccount, useAccountEffect, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { base as baseChain } from "wagmi/chains";

const QRCode = dynamic(() => import("react-qr-code").then(m => m.default), { ssr: false });

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
        setHint(null);
        if (cb?.ready)
            return connect({ connector: cb });
        if (injected && hasCBInjected)
            return connect({ connector: injected });
        window.open("https://www.coinbase.com/wallet/downloads", "_blank", "noopener,noreferrer");
    }

    async function connectMobileWC(retry = false) {
        onMobileConnectStarted?.();
        setShowQr(true);
        setHint("Scan this QR with Coinbase Wallet on your phone to connect.");
        setWcUri(null);

        if (!wc) {
            setHint("WalletConnect not configured.");
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
            return;
        }

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
            if (!resolved && uri) {
                resolved = true;
                setWcUri(uri);
                setHint(null);
            }
        }

        async function onExpire() {
            cleanup();
            setHint("QR expired — generating a new one…");
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
            else setHint("QR expired. Tap “Connect Coinbase Wallet (mobile)” again.");
        }

        provider.off?.("display_uri", onDisplayUri);
        provider.on?.("display_uri", onDisplayUri);
        provider.off?.("proposal_expire", onExpire);
        provider.on?.("proposal_expire", onExpire);
        provider.off?.("session_expire", onExpire);
        provider.on?.("session_expire", onExpire);

        try {
            await connect({ connector: wc });
            setTimeout(() => {
                if (!resolved) {
                    const maybe
                        = provider?.uri || provider?.connector?.uri || provider?.session?.uri;
                    if (typeof maybe === "string" && maybe.startsWith("wc:"))
                        onDisplayUri(maybe);
                }
            }, 600);
        } catch (err: unknown) {
            const msg = String((err as Error)?.message || err).toLowerCase();
            if (msg.includes("expired")) {
                await onExpire();
            } else if (msg.includes("reset") || msg.includes("closed") || msg.includes("canceled")) {
                setHint("Request canceled/reset. Tap again to show a new QR.");
            } else {
                setHint(`WalletConnect failed: ${String((err as Error)?.message || err)}`);
            }
        } finally {
            setTimeout(cleanup, 4000);
        }
    }

    return (
        <Stack gap="xs">
            {!mobile && (
                <Button fullWidth h={38} onClick={connectDesktopCBW}>
                    {cb?.ready || hasCBInjected
                        ? "Connect Coinbase Wallet (extension)"
                        : "Install Coinbase Wallet (Chrome)"}
                </Button>
            )}

            <Button fullWidth h={38} variant="filled" onClick={() => connectMobileWC()}>
                Connect Coinbase Wallet (mobile)
            </Button>

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
                                            . After approval we’ll open
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

/* ───────── Modal that AUTO-OPENS ONRAMP on mobile connect ───────── */

export default function OnrampModal({ isOpen, onClose }: OnrampModalProps) {
    const { address: connectedAddress, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const { switchChainAsync } = useSwitchChain();

    const payWinRef = useRef<Window | null>(null);
    const [err, setErr] = useState<string | null>(null);

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

        const res = await fetch("/api/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ addresses, assets }),
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

    // open popup on connect (desktop) or auto-launch on mobile
    useAccountEffect({
        onConnect() {
            if (isMobileUA())
                ensureBaseThenOpenPay();
            else preOpenPopup();
        },
    });

    return (
        <Modal
            opened={isOpen}
            onClose={onClose}
            size="lg"
            radius="lg"
            withCloseButton
            title={(
                <Group gap="xs">
                    <Text fw={600} component="span" c="#1F2937">Onramp / Buy</Text>
                </Group>
            )}
            styles={{ 
                body: { paddingTop: 0 },
                header: { backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB' },
                content: { backgroundColor: '#FFFFFF' }
            }}
        >
            <Divider mb="sm" color="#E5E7EB" />
            <ScrollArea h="65vh">
                <Stack gap="md">
                    {/* Wallet connect */}
                    <Paper withBorder p="md" radius="md" style={{ borderColor: '#E5E7EB', backgroundColor: '#FFFFFF' }}>
                        <Text fw={600} size="sm" mb="xs" component="div" c="#1F2937">
                            🔗 Coinbase Wallet
                        </Text>

                        <Paper withBorder p="sm" radius="md" style={{ borderColor: '#E5E7EB', backgroundColor: '#F9FAFB' }}>
                            {isConnected && connectedAddress
                                ? (
                                        <Stack gap={6}>
                                            <Text size="xs" c="#5A6C7D" component="div">Connected address</Text>
                                            <Text size="sm" ff="monospace" style={{ wordBreak: "break-all" }} component="div" c="#1F2937">
                                                {connectedAddress}
                                            </Text>
                                            <Button color="red" onClick={() => disconnect()} h={30} w={120}>
                                                Disconnect
                                            </Button>
                                        </Stack>
                                    )
                                : (
                                        <Stack gap="xs">
                                            <Text size="xs" c="#5A6C7D" component="div">No wallet connected.</Text>
                                            <CoinbaseConnectOnly
                                                onMobileConnectStarted={() => {
                                                    if (!isMobileUA())
                                                        preOpenPopup();
                                                }}
                                            />
                                        </Stack>
                                    )}
                        </Paper>

                        <Stack gap="xs" mt="sm">
                            <Button
                                onClick={ensureBaseThenOpenPay}
                                disabled={!isConnected || !connectedAddress}
                                h={42}
                                variant="filled"
                                style={{ backgroundColor: '#FF6B35', color: 'white' }}
                            >
                                Fund with Coinbase Pay (Base)
                            </Button>
                            <Text size="xs" c="#5A6C7D" component="div">
                                As soon as your phone connects, we open
                                {" "}
                                <b>Coinbase Pay</b>
                                {" "}
                                automatically.
                            </Text>
                            {err && (
                                <Text size="xs" c="#FF6B35" component="div">
                                    {err}
                                </Text>
                            )}
                        </Stack>
                    </Paper>

                    {/* Extras */}
                    <Stack gap="xs">
                        <Group justify="space-between">
                            <Text fw={600} component="div" c="#1F2937">💳 Instant Funding</Text>
                            <Text size="xs" c="#5A6C7D" component="div">Always Available</Text>
                        </Group>

                        <Stack gap="xs">
                            <Button 
                                onClick={ensureBaseThenOpenPay} 
                                disabled={!isConnected || !connectedAddress} 
                                h={44}
                                style={{ backgroundColor: '#FF6B35', color: 'white', borderColor: '#FF6B35' }}
                            >
                                <Group justify="space-between" w="100%">
                                    <Group gap="sm">
                                        <div
                                            style={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: 16,
                                                background: "#FFE5DC",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        />
                                        <div>
                                            <Text fw={600} size="sm" component="span">Coinbase Pay</Text>
                                            <Text size="xs" c="white" component="span" style={{ opacity: 0.8 }}>Uses connected wallet</Text>
                                        </div>
                                    </Group>
                                    <ArrowRight2 size={16} />
                                </Group>
                            </Button>

                            <Button 
                                variant="outline" 
                                onClick={openCoinbaseWalletSite} 
                                h={38}
                                style={{ borderColor: '#FF6B35', color: '#FF6B35' }}
                            >
                                <Group justify="space-between" w="100%">
                                    <Group gap="sm">
                                        <div
                                            style={{
                                                width: 24,
                                                height: 24,
                                                borderRadius: 12,
                                                background: "#FFE5DC",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        />
                                        <Text size="sm" component="span" c="#FF6B35">Create / Manage Coinbase Wallet</Text>
                                    </Group>
                                    <ArrowRight2 size={16} />
                                </Group>
                            </Button>
                        </Stack>
                    </Stack>

                    <Paper withBorder p="md" radius="md" style={{ borderColor: '#E5E7EB', backgroundColor: '#F9FAFB' }}>
                        <Group gap="xs" mb={4}>
                            <Shield size={14} color="#FF6B35" />
                            <Text size="xs" fw={600} component="div" c="#1F2937">Base Network Optimized</Text>
                        </Group>
                        <Text size="xs" c="#5A6C7D" component="div">
                            Fast transactions (~2s) • Low fees (~$0.01) • Great for DeFi
                        </Text>
                    </Paper>

                    <Alert variant="light" color="orange" icon={<InfoCircle size={14} />} style={{ backgroundColor: '#FFE5DC', borderColor: '#FF6B35' }}>
                        <Text size="xs" component="div" c="#1F2937">
                            Connect on your phone — we'll launch
                            {" "}
                            <b>Coinbase Pay</b>
                            {" "}
                            instantly to complete your buy.
                        </Text>
                    </Alert>
                </Stack>
            </ScrollArea>

            <Divider mt="sm" mb="sm" color="#E5E7EB" />
            <Button 
                variant="outline" 
                fullWidth 
                onClick={onClose}
                style={{ borderColor: '#E5E7EB', color: '#5A6C7D' }}
            >
                Close
            </Button>
        </Modal>
    );
}
