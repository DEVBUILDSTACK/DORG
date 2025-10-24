"use client";
import { Progress } from "@mantine/core";
import React from "react";

import type { GetLpAnalyticsResponse } from "@/types/fundio/analytics.types";

import YieldAccrualChart from "./YieldAccrualChart";

const TargetYield: React.FC<{ data: GetLpAnalyticsResponse | undefined }> = ({ data }) => {
    return (
        <div className="bg-gradient-to-br from-[#1D1F1B] from-50% to-[#C2FF94]/25 md:p-6 p-4 xl:rounded-2xl rounded-xl h-full overflow-hidden">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="xl:text-sm text-lg text-white font-medium">Target Yield</span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                    <span className="xl:text-4xl text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        {data?.target_yield || 0}
                        %
                    </span>
                </div>
                <p className="xl:text-xs text-base text-white/70 mb-4">Realized Yield Since Start</p>

                <div className="mb-4 w-2/3">
                    <div className="flex justify-between xl:text-xs text-base mb-3">
                        <span className="text-white">Progress to Target</span>
                        <span className="text-white font-bold">
                            {data?.current_progress}
                            %
                        </span>
                    </div>
                    <Progress
                        classNames={{
                            root: "bg-white/7 rounded-full h-1.5",
                            section: "bg-gradient-to-r from-primary to-secondary bg-cover",
                        }}
                        value={data?.current_progress || 0}
                    />
                </div>
            </div>

            <div className="border border-border xl:rounded-2xl rounded-xl p-3">
                <h4 className="xl:text-sm text-lg text-white/80">Yield Accrual</h4>
                <YieldAccrualChart data={data} />
            </div>
        </div>
    );
};

export default TargetYield;
