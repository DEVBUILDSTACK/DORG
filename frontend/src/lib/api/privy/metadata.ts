import type { ApiResponse } from "@/types/apiResponse";

export type CustomMetadata = {
    role?: "student" | "developer" | "investor";
    onboardingCompleted?: boolean;
    dateOfBirth?: string;
    age?: number;
    skills?: string[];
    bio?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    twitterUrl?: string;
    [key: string]: string | number | boolean | string[] | undefined;
};

export const setPrivyMetadata = async (
    userId: string,
    metadata: CustomMetadata,
    authToken: string
): Promise<ApiResponse<{ success: boolean }>> => {
    try {
        const response = await fetch("/api/privy/set-metadata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ userId, metadata }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to set metadata");
        }

        return {
            data: { success: true },
            message: "Metadata updated successfully",
        };
    } catch (error) {
        return {
            data: { success: false },
            message: error instanceof Error ? error.message : "Unknown error",
        };
    }
};
