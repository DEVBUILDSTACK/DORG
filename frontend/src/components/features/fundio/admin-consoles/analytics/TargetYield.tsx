"use client";
import { Progress } from "@mantine/core";
import React from "react";

import type { GetLpAnalyticsResponse } from "@/types/fundio/analytics.types";

import YieldAccrualChart from "./YieldAccrualChart";

const TargetYield: React.FC<{ data: GetLpAnalyticsResponse | undefined }> = ({ data }) => {
    return (
        <div className="bg-gradient-to-br from-white to-[#FFE5DC] md:p-6 p-4 xl:rounded-2xl rounded-xl h-full overflow-hidden border border-gray-200">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="xl:text-sm text-lg text-[#1F2937] font-semibold">Target Yield</span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                    <span className="xl:text-4xl text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A]">
                        {data?.target_yield || 0}
                        %
                    </span>
                </div>
                <p className="xl:text-xs text-base text-[#5A6C7D] mb-4">Realized Yield Since Start</p>

                <div className="mb-4 w-2/3">
                    <div className="flex justify-between xl:text-xs text-base mb-3">
                        <span className="text-[#1F2937]">Progress to Target</span>
                        <span className="text-[#FF6B35] font-bold">
                            {data?.current_progress}
                            %
                        </span>
                    </div>
                    <Progress
                        classNames={{
                            root: "bg-[#FFE5DC] rounded-full h-1.5",
                            section: "bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] bg-cover",
                        }}
                        value={data?.current_progress || 0}
                    />
                </div>
            </div>

            <div className="border border-gray-200 xl:rounded-2xl rounded-xl p-3 bg-white">
                <h4 className="xl:text-sm text-lg text-[#5A6C7D] font-semibold">Yield Accrual</h4>
                <YieldAccrualChart data={data} />
            </div>
        </div>
    );
};

export default TargetYield;
