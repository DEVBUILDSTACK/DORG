"use client";
import { Loader } from "@mantine/core";
import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";

import { YieldBg } from "@/assets/images";
import RadarConsole from "@/components/features/fundio/admin-consoles/analytics/RadarConsole";
import TargetYield from "@/components/features/fundio/admin-consoles/analytics/TargetYield";
import RecentCommitmentsTable from "@/components/features/fundio/admin-consoles/manage-lps/RecentCommitmentsTable";
import DealFi from "@/components/features/fundio/command-control/DealFi";
import Select from "@/components/ui/select/Select";
import { getLPAnalyticsById, getLPAnalyticsKPI } from "@/lib/api/fundio/analytics";
import { getLPList } from "@/lib/api/fundio/manage-lps";
import { QUERY_KEYS } from "@/lib/constants";
import { LP_TYPE, PAGE_LIMIT } from "@/lib/landing-page/constants";
import { formatNumber } from "@/lib/utils";
import useFLPStore from "@/store/useFLPStore";

const Analytics: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { ready, authenticated } = usePrivy();
    const { getLpsData } = useFLPStore();
    const [filter, setFilter] = useState(getLpsData()?.find(item => item.lp_type === LP_TYPE.SAFE_FLP)?.id);

    const lpList = useQuery({
        queryKey: [QUERY_KEYS.GET_LP_LIST, "", currentPage, PAGE_LIMIT],
        queryFn: () => getLPList("", (currentPage - 1) * PAGE_LIMIT, PAGE_LIMIT),
        retry: 2,
    });

    const { data: lpKPI } = useQuery({
        queryKey: [QUERY_KEYS.GET_LP_KPI],
        queryFn: () => getLPAnalyticsKPI(),
        retry: 2,
    });

    const { data: lpAnalytics } = useQuery({
        queryKey: [QUERY_KEYS.GET_LP_ANALYTICS, filter],
        queryFn: () => getLPAnalyticsById(filter!),
        enabled: !!filter,
    });

    return (
        (ready)
            ? (
                    (authenticated)
                        ? (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between w-full px-5 py-3 bg-white border border-gray-200 rounded-2xl">
                                        <h2 className="xl:text-lg text-2xl text-[#1F2937] font-semibold">SAFE LP</h2>
                                        <Select
                                            allowDeselect={false}
                                            wrapperClass="h-9"
                                            placeholder="Filter"
                                            data={[
                                                { value: getLpsData()?.find(item => item.lp_type === LP_TYPE.SAFE_FLP)?.id || "", label: "SAFE" },
                                                { value: getLpsData()?.find(item => item.lp_type === LP_TYPE.RWA_FLP)?.id || "", label: "RWA" },
                                                { value: getLpsData()?.find(item => item.lp_type === LP_TYPE.PRELAUNCH_IMPACT_FLP)?.id || "", label: "Pre-Launch Impact LP" },
                                                { value: getLpsData()?.find(item => item.lp_type === LP_TYPE.IMPACT_FLP)?.id || "", label: "iMPACT" },
                                            ]}
                                            classNames={{
                                                input: "text-[#1F2937] border border-gray-200 rounded-lg bg-white",
                                                dropdown: "bg-white border-gray-200 rounded-lg",
                                                option: "text-[#1F2937] hover:bg-[#FFE5DC]",
                                            }}
                                            value={filter}
                                            onChange={value => setFilter(value || "")}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        <div className="relative group w-full h-full flex flex-col items-center justify-center lg:gap-5 gap-3 bg-white border border-gray-200 lg:rounded-2xl md:rounded-xl rounded-lg p-6 transition-all duration-700 overflow-hidden hover:border-[#FF6B35]">
                                            <div className="group-hover:block hidden absolute rotate-x-180 inset-0 z-0">
                                                <Image
                                                    src={YieldBg}
                                                    alt="YieldBg"
                                                    className="w-full h-full object-cover opacity-10"
                                                />
                                            </div>
                                            <div className="relative z-10 flex flex-col lg:gap-2 h-fit w-full items-start justify-center">
                                                <h2 className="md:text-2xl text-3xl font-semibold text-[#1F2937]">
                                                    {formatNumber(Number(lpKPI?.lps_pending_amount))}
                                                    {" "}
                                                    USDC
                                                </h2>
                                                <h6 className="text-[#5A6C7D] font-medium xl:text-xs lg:text-sm text-lg">LPs Pending Funding</h6>
                                            </div>
                                        </div>
                                        <div className="relative group w-full h-full flex flex-col items-center justify-center lg:gap-5 gap-3 bg-white border border-gray-200 lg:rounded-2xl md:rounded-xl rounded-lg p-6 transition-all duration-700 overflow-hidden hover:border-[#FF6B35]">
                                            <div className="group-hover:block hidden absolute rotate-x-180 inset-0 z-0">
                                                <Image
                                                    src={YieldBg}
                                                    alt="YieldBg"
                                                    className="w-full h-full object-cover opacity-10"
                                                />
                                            </div>
                                            <div className="relative z-10 flex flex-col lg:gap-2 h-fit w-full items-start justify-center">
                                                <h2 className="md:text-2xl text-3xl font-semibold text-[#1F2937]">
                                                    {formatNumber(Number(lpKPI?.lifetime_yield_earned))}
                                                    {" "}
                                                    USDC
                                                </h2>
                                                <h6 className="text-[#5A6C7D] font-medium xl:text-xs lg:text-sm text-lg">Lifetime Yield Earnings</h6>
                                            </div>
                                        </div>
                                        <div className="relative group w-full h-full flex flex-col items-center justify-center lg:gap-5 gap-3 bg-white border border-gray-200 lg:rounded-2xl md:rounded-xl rounded-lg p-6 transition-all duration-700 overflow-hidden hover:border-[#FF6B35]">
                                            <div className="group-hover:block hidden absolute rotate-x-180 inset-0 z-0">
                                                <Image
                                                    src={YieldBg}
                                                    alt="YieldBg"
                                                    className="w-full h-full object-cover opacity-10"
                                                />
                                            </div>
                                            <div className="relative z-10 flex flex-col lg:gap-2 h-fit w-full items-start justify-center">
                                                <h2 className="md:text-2xl text-3xl font-semibold text-[#1F2937]">
                                                    {formatNumber(Number(lpKPI?.total_lps_funding_amount))}
                                                    {" "}
                                                    USDC
                                                </h2>
                                                <h6 className="text-[#5A6C7D] font-medium xl:text-xs lg:text-sm text-lg">LPs Funded</h6>
                                            </div>
                                        </div>
                                        <div className="relative group w-full h-full flex flex-col items-center justify-center lg:gap-5 gap-3 bg-white border border-gray-200 lg:rounded-2xl md:rounded-xl rounded-lg p-6 transition-all duration-700 overflow-hidden hover:border-[#FF6B35]">
                                            <div className="group-hover:block hidden absolute rotate-x-180 inset-0 z-0">
                                                <Image
                                                    src={YieldBg}
                                                    alt="YieldBg"
                                                    className="w-full h-full object-cover opacity-10"
                                                />
                                            </div>
                                            <div className="relative z-10 flex flex-col lg:gap-2 h-fit w-full items-start justify-center">
                                                <h2 className="md:text-2xl text-3xl font-semibold text-[#1F2937]">
                                                    {formatNumber(Number(lpKPI?.current_year_yield_earned))}
                                                    {" "}
                                                    USDC
                                                </h2>
                                                <h6 className="text-[#5A6C7D] font-medium xl:text-xs lg:text-sm text-lg">YTD Yield Earnings</h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <h2 className="xl:text-lg text-2xl text-[#1F2937] font-semibold">LP Performance Metrics</h2>

                                        <div className="grid lg:grid-cols-6 gap-4">
                                            <div className="xl:col-span-4 col-span-12">
                                                <TargetYield data={lpAnalytics} />
                                            </div>
                                            <div className="xl:col-span-2 col-span-12 overflow-hidden xl:h-[550px] h-[400px]">
                                                <RadarConsole />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full bg-white border border-gray-200 rounded-xl lg:p-6 p-4 mt-4">
                                        <h2 className="xl:text-lg text-2xl text-[#1F2937] font-semibold mb-4">Recent Commitments</h2>

                                        <RecentCommitmentsTable
                                            data={lpList.data?.data || []}
                                            metadata={lpList.data?.metadata}
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                        />
                                    </div>
                                </div>
                            )
                        : (
                                <DealFi />
                            )
                )
            : (
                    <div className="flex items-center justify-center py-12 w-full h-full">
                        <Loader
                            className="size-12"
                            color="#C2FF94"
                        />
                    </div>
                )
    );
};

export default Analytics;
