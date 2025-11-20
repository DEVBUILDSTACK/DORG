// app/api/session/route.ts
import "server-only";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Coinbase OnRamp API credentials
// When you create an API key on Coinbase Developer Portal, you get:
// 1. API Key (public) - this is your key identifier
// 2. Private Key (secret) - used to sign requests (not needed for basic OnRamp)
const COINBASE_API_KEY = process.env.NEXT_PUBLIC_COINBASE_API_KEY!;

type Addr = { address: string; blockchains: ("base")[] };

function normalizeAddresses(input: any): Addr[] {
    if (!input)
        return [];
    // accept either [{address,blockchains}] or plain ["0x..."] and coerce
    if (Array.isArray(input)) {
        return input
            .map(x =>
                typeof x === "string"
                    ? { address: x, blockchains: ["base"] as const }
                    : {
                            address: String(x?.address ?? ""),
                            blockchains: Array.isArray(x?.blockchains) && x.blockchains.length ? x.blockchains : (["base"] as const),
                        },
            )
            .filter(a => /^0x[a-fA-F0-9]{40}$/.test(a.address));
    }
    return [];
}

export async function POST(req: Request) {
    try {
        // Check for required Coinbase API Key
        if (!COINBASE_API_KEY) {
            return NextResponse.json(
                { error: "Missing NEXT_PUBLIC_COINBASE_API_KEY. Get it from Coinbase Developer Portal." },
                { status: 500 },
            );
        }

        const body = await req.json().catch(() => ({}));
        const addresses = normalizeAddresses(body?.addresses);
        const assets = Array.isArray(body?.assets) && body.assets.length ? body.assets : ["USDC"];
        const presetAmount = body?.presetAmount;

        if (!addresses.length) {
            return NextResponse.json(
                {
                    error:
            "addresses[] required. Example: [{\"address\":\"0xYourAddress\",\"blockchains\":[\"base\"]}]",
                },
                { status: 400 },
            );
        }

        // Coinbase OnRamp v1 API
        // Documentation: https://docs.cdp.coinbase.com/onramp/docs/api-configurations
        const requestBody: any = { 
            destination_wallets: addresses.map(addr => ({
                address: addr.address,
                blockchains: addr.blockchains,
                assets: assets
            }))
        };

        // Add preset amount if provided
        if (presetAmount) {
            requestBody.presetFiatAmount = presetAmount;
            requestBody.defaultAsset = assets[0] || "USDC";
        }

        const upstream = await fetch("https://api.developer.coinbase.com/onramp/v1/buy/options", {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${COINBASE_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody),
            cache: "no-store",
        });

        const text = await upstream.text();
        let json: any;
        try {
            json = text ? JSON.parse(text) : {};
        } catch {
            json = { raw: text };
        }

        if (!upstream.ok) {
            const baseMsg = json?.error || json?.message || text || "Coinbase OnRamp error";
            const errorDetails = json?.error_details || json?.details || "";
            
            const mapped
                = upstream.status === 401
                    ? `${baseMsg} - Invalid API key. Check NEXT_PUBLIC_COINBASE_API_KEY in .env`
                    : upstream.status === 403
                        ? `${baseMsg} - Add your domain to Allowed Origins in Coinbase Developer Portal`
                        : upstream.status === 400
                            ? `${baseMsg} ${errorDetails ? `(${errorDetails})` : ""}`
                            : `${baseMsg} ${errorDetails}`;

            console.error("[onramp] API error:", { status: upstream.status, message: mapped, response: json });
            return NextResponse.json({ error: mapped }, { status: upstream.status });
        }

        // Coinbase OnRamp buy/options endpoint returns a URL to redirect to
        const buyUrl = json?.buy_url || json?.url;
        if (buyUrl) {
            return NextResponse.json({ url: buyUrl, token: buyUrl }, { headers: { "Cache-Control": "no-store" } });
        }

        // Fallback: try to get token for older API format
        const token = json?.token;
        if (token) {
            return NextResponse.json({ token }, { headers: { "Cache-Control": "no-store" } });
        }

        // If no URL or token, return error
        console.error("[onramp] Unexpected response format:", json);
        return NextResponse.json({ 
            error: "Unexpected response from Coinbase OnRamp API. Check server logs.",
            details: json 
        }, { status: 502 });
    } catch (e: any) {
        console.error("[onramp] server error", e);
        return NextResponse.json({ error: e?.message ?? "Unexpected server error" }, { status: 500 });
    }
}
