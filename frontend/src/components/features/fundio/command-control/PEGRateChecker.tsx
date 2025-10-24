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
        <div
            className="relative p-6 rounded-2xl overflow-hidden"
        >
            {/* overlay */}
            <div className={cn("absolute inset-0 bg-linear-[135deg_,_#D4FF8D_9%,_#E2ED97_26%,_#9DD687_42%,_#B8E2B0_77%,_#EEF1C9_94%] z-0", showWalletDashboard ? "opacity-30" : "opacity-6")} />

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <h3 className="xl:text-lg text-2xl font-semibold text-white">Check Live PEG Rate</h3>
                    <IoMdTrendingUp className="size-6" />
                </div>

                <div className="mb-4">
                    <p className="xl:text-xs text-base text-white/83">Current PEG Rate</p>
                    <div className="flex items-center gap-3">
                        <span className="lg:text-4xl text-5xl font-bold text-white">$1.001315</span>
                        <div className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-1">
                            <div className="size-1 bg-[#7FD33E] rounded-full"></div>
                            <span className="xl:text-[10px] lg:text-xs text-base text-white">Stable</span>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <p className="xl:text-xs text-base text-white/83 mb-3">Select Amount:</p>
                    <div className="grid xl:grid-cols-3 lg:grid-cols-4 md:grid-cols-8 grid-cols-4 gap-2 mb-4 xl:mr-16">
                        {presetAmounts.map(amount => (
                            <Button
                                key={amount}
                                onClick={() => setSelectedAmount(amount)}
                                variant={selectedAmount === amount ? "primary" : "outline"}
                                className="!p-2 lg:!text-xs !text-base font-medium h-8 transition-colors"
                            >
                                $
                                {amount}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <p className="xl:text-xs text-base text-white/83">Custom Amount</p>
                        <p className="xl:text-xs text-base text-white font-extralight">Maximum Limit: $35000</p>
                    </div>
                    <Input
                        type="number"
                        placeholder="Enter Amount"
                        value={customAmount}
                        leftSection={<span className="text-white/80">$</span>}
                        onChange={e => setCustomAmount(e.target.value)}
                    />
                </div>

                <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                        <span className="xl:text-xs text-base text-white/83">Amount to Top Up:</span>
                        <span className="xl:text-xs text-base text-white font-medium">$500.00</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="xl:text-xs text-base text-white/83">Rate Applied:</span>
                        <span className="xl:text-xs text-base text-white font-medium">$1.001315</span>
                    </div>
                    <div className="flex justify-between border-t border-white/8 pt-2 mt-2">
                        <span className="xl:text-xs text-base text-white/83">You&#39;ll Receive:</span>
                        <span className="xl:text-xs text-base text-white font-medium">$500.66 PEG</span>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button
                        className="rounded-xl h-10 xl:!text-xs !text-base !px-4 xl:!w-full lg:!w-1/2 md:!w-1/4 !w-1/2"
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
