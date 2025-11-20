"use client";

import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { IoMdTrendingUp } from "react-icons/io";

import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import { cn } from "@/lib/utils";

type PEGRateCheckerProps = {
    showWalletDashboard: boolean;
    setShowWalletDashboard: React.Dispatch<React.SetStateAction<boolean>>;
};

const PEGRateChecker: React.FC<PEGRateCheckerProps> = ({ showWalletDashboard, setShowWalletDashboard }) => {
    const [selectedAmount, setSelectedAmount] = useState(500);
    const [customAmount, setCustomAmount] = useState("");

    const presetAmounts = [100, 250, 500, 1000, 2500, 5000];

    return (
        <div className="relative p-6 rounded-2xl overflow-hidden bg-white border border-[#E5E7EB] shadow-sm">
            {/* Subtle background overlay */}
            <div className={cn(
                "absolute inset-0 bg-gradient-to-br from-[#FF6B35]/5 via-[#FFE5DC]/10 to-[#FF6B35]/5 z-0 transition-opacity duration-300", 
                showWalletDashboard ? "opacity-30" : "opacity-100"
            )} />

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <h3 className="xl:text-lg text-2xl font-semibold text-[#1F2937]">Check Live PEG Rate</h3>
                    <IoMdTrendingUp className="size-6 text-[#FF6B35]" />
                </div>

                <div className="mb-4">
                    <p className="xl:text-xs text-base text-[#5A6C7D]">Current PEG Rate</p>
                    <div className="flex items-center gap-3">
                        <span className="lg:text-4xl text-5xl font-bold text-[#1F2937]">$1.001315</span>
                        <div className="flex items-center gap-1 bg-[#10B981]/10 border border-[#10B981]/20 rounded-full px-2 py-1">
                            <div className="size-1 bg-[#10B981] rounded-full"></div>
                            <span className="xl:text-[10px] lg:text-xs text-base text-[#10B981] font-medium">Stable</span>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <p className="xl:text-xs text-base text-[#5A6C7D] mb-3">Select Amount:</p>
                    <div className="grid xl:grid-cols-3 lg:grid-cols-4 md:grid-cols-6 grid-cols-3 gap-2 mb-4">
                        {presetAmounts.map(amount => (
                            <Button
                                key={amount}
                                onClick={() => setSelectedAmount(amount)}
                                variant={selectedAmount === amount ? "primary" : "outline"}
                                className={cn(
                                    "!p-2 lg:!text-xs !text-base font-medium h-8 transition-all",
                                    selectedAmount === amount 
                                        ? "bg-[#FF6B35] text-white border-[#FF6B35] hover:bg-[#FF6B35]/90" 
                                        : "border-[#E5E7EB] text-[#5A6C7D] hover:border-[#FF6B35] hover:text-[#FF6B35]"
                                )}
                            >
                                ${amount}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <p className="xl:text-xs text-base text-[#5A6C7D]">Custom Amount</p>
                        <p className="xl:text-xs text-base text-[#5A6C7D] font-light">Maximum Limit: $35000</p>
                    </div>
                    <Input
                        type="number"
                        placeholder="Enter Amount"
                        value={customAmount}
                        leftSection={<span className="text-[#5A6C7D]">$</span>}
                        onChange={e => setCustomAmount(e.target.value)}
                        className="border-[#E5E7EB] focus:border-[#FF6B35]"
                    />
                </div>

                <div className="space-y-2 mb-6 bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
                    <div className="flex justify-between">
                        <span className="xl:text-xs text-base text-[#5A6C7D]">Amount to Top Up:</span>
                        <span className="xl:text-xs text-base text-[#1F2937] font-semibold">$500.00</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="xl:text-xs text-base text-[#5A6C7D]">Rate Applied:</span>
                        <span className="xl:text-xs text-base text-[#1F2937] font-semibold">$1.001315</span>
                    </div>
                    <div className="flex justify-between border-t border-[#E5E7EB] pt-2 mt-2">
                        <span className="xl:text-xs text-base text-[#5A6C7D]">You&#39;ll Receive:</span>
                        <span className="xl:text-xs text-base text-[#FF6B35] font-bold">$500.66 PEG</span>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button
                        className="rounded-xl h-10 xl:!text-xs !text-base !px-4 xl:!w-full lg:!w-1/2 md:!w-1/2 !w-full bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white"
                        labelClass="flex items-center justify-between gap-3 !w-full"
                        onClick={() => setShowWalletDashboard(false)}
                    >
                        Top Up Now
                        <FiArrowRight className="xl:size-5 lg:size-4 size-3" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PEGRateChecker;
