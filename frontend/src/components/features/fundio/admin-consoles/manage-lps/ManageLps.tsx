"use client";
import { Loader } from "@mantine/core";
import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/ui/button/Button";
import Select from "@/components/ui/select/Select";
import { getLPList } from "@/lib/api/fundio/manage-lps";
import { getAllAutoRenewal, getAllLPType, getAllTier } from "@/lib/api/landing-page/general";
import { QUERY_KEYS } from "@/lib/constants";
import { LP_FILTER } from "@/lib/fundio/constants";
import { PAGE_LIMIT, QUERY_KEY } from "@/lib/landing-page/constants";
import useFLPStore from "@/store/useFLPStore";

import DealFi from "../../command-control/DealFi";
import RecentCommitmentsTable from "./RecentCommitmentsTable";

const ManageLps = () => {
    const router = useRouter();
    const { setTierData, setAutoRenewalData, setLpsData } = useFLPStore();
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { ready, authenticated } = usePrivy();

    useQuery({
        queryKey: [QUERY_KEY.TIER, { offset: 0, limit: 100, platform_name: "Fundio" }],
        queryFn: async () => {
            const data = await getAllTier(0, 100, "Fundio");
            if (data?.data) {
                setTierData(data.data);
            }
            return data;
        },
        staleTime: Infinity,
        retry: 2,
    });

    useQuery({
        queryKey: [QUERY_KEY.AUTO_RENEWAL, { offset: 0, limit: 100 }],
        queryFn: async () => {
            const data = await getAllAutoRenewal(0, 100);
            if (data?.data) {
                setAutoRenewalData(data.data);
            }
            return data;
        },
        staleTime: Infinity,
        retry: 2,
    });

    useQuery({
        queryKey: [QUERY_KEY.LP_TYPE, { offset: 0, limit: 100, platform_name: "Fundio", status: "Active" }],
        queryFn: async () => {
            const data = await getAllLPType(0, 100, "Fundio", "Active");
            if (data?.data) {
                setLpsData(data.data);
            }
            return data;
        },
        staleTime: Infinity,
        retry: 2,
    });

    const lpList = useQuery({
        queryKey: [QUERY_KEYS.GET_LP_LIST, filter, currentPage, PAGE_LIMIT],
        queryFn: () => getLPList(filter, (currentPage - 1) * PAGE_LIMIT, PAGE_LIMIT),
        enabled: ready && authenticated,
    });

    return (
        (ready && authenticated)
            ? (
                    <div className="w-full bg-fundio-sidebar rounded-xl lg:p-6 p-4">
                        <div className="flex md:flex-row flex-col md:items-center justify-between gap-2 lg:pb-6 pb-4">
                            <h2 className="xl:text-lg text-2xl text-white/62">Recent Commitments</h2>

                            <div className="flex items-center gap-2 ">
                                <Select
                                    allowDeselect={false}
                                    wrapperClass="h-9"
                                    placeholder="Filter"
                                    data={LP_FILTER}
                                    classNames={{
                                        input: "text-white border border-border rounded-lg  bg-fundio-sidebar",
                                        dropdown: "bg-fundio-sidebar border-[#444] rounded-lg",
                                        option: "text-white hover:bg-white/10",
                                    }}
                                    value={filter}
                                    onChange={value => setFilter(value || "")}
                                />
                                <div>
                                    <Button
                                        onClick={() => router.push("/admin-consoles/analytics")}
                                        variant="primary"
                                        className="rounded-lg !h-9 w-fit !px-6 xl:!text-xs !text-base !font-medium"
                                    >
                                        View Analytics
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {lpList?.isPending
                            ? (
                                    <div className="flex items-center justify-center py-12">
                                        <Loader
                                            className="size-12"
                                            color="#C2FF94"
                                        />
                                    </div>
                                )
                            : (
                                    <RecentCommitmentsTable
                                        data={lpList.data?.data || []}
                                        metadata={lpList.data?.metadata}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                    />
                                )}
                    </div>
                )
            : (
                    <DealFi />
                )
    );
};

export default ManageLps;
