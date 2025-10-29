"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, DollarSign, ArrowRight } from "lucide-react";
import { usePrivy, useUser } from "@privy-io/react-auth";
import { useMutation } from "@tanstack/react-query";
import { setPrivyMetadata, type CustomMetadata } from "@/lib/api/privy/metadata";

type Role = "student" | "developer" | "investor";

type MetadataCollectorProps = {
    isOpen: boolean;
    onClose: () => void;
    onComplete: (role: Role) => void;
};

const roles: Array<{ value: Role; label: string; icon: any; description: string }> = [
    {
        value: "student",
        label: "Student",
        icon: User,
        description: "Learn and build your skills",
    },
    {
        value: "developer",
        label: "Developer",
        icon: Briefcase,
        description: "Build and contribute to projects",
    },
    {
        value: "investor",
        label: "Investor",
        icon: DollarSign,
        description: "Fund and support projects",
    },
];

export default function MetadataCollector({ isOpen, onClose, onComplete }: MetadataCollectorProps) {
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    
    const { getAccessToken } = usePrivy();
    const { user, refreshUser } = useUser();

    const setMetadataMutation = useMutation({
        mutationFn: async (metadata: CustomMetadata) => {
            if (!user) throw new Error("No user found");
            const token = await getAccessToken();
            if (!token) throw new Error("No auth token");
            
            console.log('Saving metadata to Privy:', metadata);
            return setPrivyMetadata(user.id, metadata, token);
        },
        onError: (error) => {
            console.error("Failed to save metadata:", error);
        },
    });

    const handleSubmit = async () => {
        if (!selectedRole) return;

        const metadata: CustomMetadata = {
            role: selectedRole,
        };

        try {
            // Step 1: Make API request to update custom metadata
            await setMetadataMutation.mutateAsync(metadata);
            
            // Step 2: Refresh the user object to get the latest data
            console.log('Refreshing user data after metadata update...');
            await refreshUser();
            
            // Step 3: The user object should now be updated with the latest information
            console.log('User refreshed, new metadata:', user?.customMetadata);
            
            // Step 4: Pass the role to parent component for redirect
            onComplete(selectedRole);
        } catch (error) {
            console.error('Error updating metadata:', error);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-2xl bg-[#0B0C14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden mx-4"
                    >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#00E0FF] via-[#8B5CF6] to-[#FF007A]" />

                        <div className="p-4 sm:p-6 md:p-8">
                            <div className="mb-4 sm:mb-6">
                                <h2 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-[#00E0FF] to-[#8B5CF6] bg-clip-text text-transparent">
                                    Select Your Role
                                </h2>
                                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                                    Choose your primary role to get started
                                </p>
                            </div>

                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                            >
                                <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6">
                                    This helps us personalize your experience
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                                    {roles.map((role) => {
                                        const Icon = role.icon;
                                        return (
                                            <motion.button
                                                key={role.value}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => setSelectedRole(role.value)}
                                                className={`p-3 sm:p-4 rounded-xl border-2 text-left transition-all ${
                                                    selectedRole === role.value
                                                        ? "border-[#00E0FF] bg-[#00E0FF]/10"
                                                        : "border-white/10 hover:border-white/20 bg-white/5"
                                                }`}
                                            >
                                                <Icon
                                                    className={`w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 ${
                                                        selectedRole === role.value
                                                            ? "text-[#00E0FF]"
                                                            : "text-gray-400"
                                                    }`}
                                                />
                                                <h3 className="font-semibold text-white text-sm sm:text-base mb-1">
                                                    {role.label}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-gray-400">
                                                    {role.description}
                                                </p>
                                            </motion.button>
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={!selectedRole || setMetadataMutation.isPending}
                                    className="w-full py-2.5 sm:py-3 bg-linear-to-r from-[#00E0FF] to-[#8B5CF6] text-white rounded-lg text-sm sm:text-base font-medium hover:shadow-lg hover:shadow-[#00E0FF]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                >
                                    {setMetadataMutation.isPending ? (
                                        <>
                                            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Getting Started...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Get Started</span>
                                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
