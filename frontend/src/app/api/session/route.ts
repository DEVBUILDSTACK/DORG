// app/api/session/route.ts
import "server-only";
import { generateJwt } from "@coinbase/cdp-sdk/auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ID = process.env.CDP_API_KEY_ID!;
const RAW_SECRET = process.env.CDP_API_KEY_SECRET!;

function normalizeSecret(raw: string): string {
    const fixed = raw.replace(/\\n/g, "\n").trim();
    if (fixed.startsWith("-----BEGIN") && fixed.includes("END"))
        return fixed; // PEM
    return fixed.replace(/\s+/g, ""); // base64
}

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
        if (!ID || !RAW_SECRET) {
            return NextResponse.json(
                { error: "Missing CDP_API_KEY_ID or CDP_API_KEY_SECRET" },
                { status: 500 },
            );
        }

        const body = await req.json().catch(() => ({}));
        const addresses = normalizeAddresses(body?.addresses);
        const assets = Array.isArray(body?.assets) && body.assets.length ? body.assets : ["USDC"];

        if (!addresses.length) {
            return NextResponse.json(
                {
                    error:
            "addresses[] required. Example: [{\"address\":\"0xYourAddress\",\"blockchains\":[\"base\"]}]",
                },
                { status: 400 },
            );
        }

        // Sign JWT for Coinbase Onramp
        const jwt = await generateJwt({
            apiKeyId: ID,
            apiKeySecret: normalizeSecret(RAW_SECRET),
            requestMethod: "POST",
            requestHost: "api.developer.coinbase.com",
            requestPath: "/onramp/v1/token",
            expiresIn: 120,
        });

        const upstream = await fetch("https://api.developer.coinbase.com/onramp/v1/token", {
            method: "POST",
            headers: { "Authorization": `Bearer ${jwt}`, "Content-Type": "application/json" },
            body: JSON.stringify({ addresses, assets }),
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
            const baseMsg = json?.error || json?.message || text || "Coinbase Onramp error";
            const mapped
                = upstream.status === 401
                    ? `${baseMsg} (check CDP keys & server time; JWT must be valid)`
                    : upstream.status === 403
                        ? `${baseMsg} (add your origin to Allowed Origins in the Coinbase developer dashboard)`
                        : upstream.status === 400
                            ? `${baseMsg} (did you send addresses[] with blockchains:["base"]? is the address checksummed/valid?)`
                            : baseMsg;

            return NextResponse.json({ error: mapped }, { status: upstream.status });
        }

        const token = json?.token as string | undefined;
        if (!token) {
            return NextResponse.json({ error: "No token in response" }, { status: 502 });
        }

        return NextResponse.json({ token }, { headers: { "Cache-Control": "no-store" } });
    } catch (e: any) {
        console.error("[onramp] server error", e);
        return NextResponse.json({ error: e?.message ?? "Unexpected server error" }, { status: 500 });
    }
}
