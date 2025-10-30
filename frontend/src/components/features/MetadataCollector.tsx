"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, DollarSign, ArrowRight } from "lucide-react";
import { usePrivy, useUser } from "@privy-io/react-auth";
import { useMutation } from "@tanstack/react-query";
import { setPrivyMetadata, type CustomMetadata } from "@/lib/api/privy/metadata";
import { saveUserRole, type UserRole } from "@/lib/roleStorage";

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
            // Save to Privy metadata
            await setMetadataMutation.mutateAsync(metadata);
            await refreshUser();
            
            // Save to localStorage for faster access on next visit
            saveUserRole(selectedRole as UserRole);
            
            // Call onComplete to close modal and redirect
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
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#FF6B35] to-[#E65A2D]" />

                        <div className="p-8">
                            <div className="mb-6">
                                <h2 className="text-3xl font-bold text-[#1F2937]">
                                    Select Your Role
                                </h2>
                                <p className="text-[#5A6C7D] mt-2">
                                    Choose your primary role to personalize your experience
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                {roles.map((role) => {
                                    const Icon = role.icon;
                                    return (
                                        <button
                                            key={role.value}
                                            onClick={() => setSelectedRole(role.value)}
                                            className={`p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                                                selectedRole === role.value
                                                    ? "border-[#FF6B35] bg-[#FF6B35]/5 shadow-md"
                                                    : "border-[#E5E7EB] hover:border-[#FF6B35]/30 bg-white"
                                            }`}
                                        >
                                            <Icon
                                                className={`w-8 h-8 mb-3 ${
                                                    selectedRole === role.value
                                                        ? "text-[#FF6B35]"
                                                        : "text-[#5A6C7D]"
                                                }`}
                                            />
                                            <h3 className="font-semibold text-[#1F2937] mb-1">
                                                {role.label}
                                            </h3>
                                            <p className="text-sm text-[#5A6C7D]">
                                                {role.description}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={!selectedRole || setMetadataMutation.isPending}
                                className="w-full py-4 bg-linear-to-r from-[#FF6B35] to-[#E65A2D] text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:shadow-[#FF6B35]/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                            >
                                {setMetadataMutation.isPending ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Setting Up...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Get Started</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
