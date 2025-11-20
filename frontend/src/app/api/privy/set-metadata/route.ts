import { NextRequest, NextResponse } from "next/server";
import { PrivyClient } from "@privy-io/server-auth";

const privyClient = new PrivyClient(
    process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
    process.env.NEXT_PUBLIC_PRIVY_APP_SECRET!
);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, metadata } = body;

        if (!userId || !metadata) {
            return NextResponse.json(
                { error: "Missing userId or metadata" },
                { status: 400 }
            );
        }

        const authHeader = request.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const token = authHeader.substring(7);
        
        try {
            await privyClient.verifyAuthToken(token);
        } catch (error) {
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 401 }
            );
        }

        await privyClient.setCustomMetadata(userId, metadata);

        return NextResponse.json({
            success: true,
            message: "Custom metadata updated successfully",
        });
    } catch (error) {
        console.error("Error setting custom metadata:", error);
        return NextResponse.json(
            { error: "Failed to set custom metadata" },
            { status: 500 }
        );
    }
}
