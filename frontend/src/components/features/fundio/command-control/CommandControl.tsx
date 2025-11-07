"use client";
import { useQuery } from "@tanstack/react-query";
import { ExportSquare } from "iconsax-reactjs";
import React from "react";

import Home from "@/assets/svg/fundio/Home";
import PageContent from "@/components/layout/PageContent";
import PageNavbar, { PageNavbarLeftContent, PageNavbarRightContent } from "@/components/layout/PageNavbar";
import Button from "@/components/ui/button/Button";
import { getAllAutoRenewal, getAllLPType, getAllTier } from "@/lib/api/landing-page/general";
import { PAGE_LIMIT, QUERY_KEY } from "@/lib/landing-page/constants";
import useFLPStore from "@/store/useFLPStore";

import CommandControlContent from "./CommandControlContent";

const CommandControl: React.FC = () => {
    const { setTierData, setAutoRenewalData, setLpsData } = useFLPStore();

    useQuery({
        queryKey: [QUERY_KEY.TIER, { offset: 0, limit: PAGE_LIMIT, platform_name: "Learn2Launch" }],
        queryFn: async () => {
            const data = await getAllTier(0, PAGE_LIMIT, "Learn2Launch");
            if (data?.data) {
                setTierData(data.data);
            }
            return data;
        },
        staleTime: Infinity,
        retry: 2,
    });

    useQuery({
        queryKey: [QUERY_KEY.AUTO_RENEWAL, { offset: 0, limit: PAGE_LIMIT }],
        queryFn: async () => {
            const data = await getAllAutoRenewal(0, PAGE_LIMIT);
            if (data?.data) {
                setAutoRenewalData(data.data);
            }
            return data;
        },
        staleTime: Infinity,
        retry: 2,
    });

    useQuery({
        queryKey: [QUERY_KEY.LP_TYPE, { offset: 0, limit: PAGE_LIMIT, platform_name: "Learn2Launch", status: "Active" }],
        queryFn: async () => {
            const data = await getAllLPType(0, PAGE_LIMIT, "Learn2Launch", "Active");
            if (data?.data) {
                setLpsData(data.data);
            }
            return data;
        },
        staleTime: Infinity,
        retry: 2,
    });

    return (
        <div>
            <PageNavbar>
                <PageNavbarLeftContent className="md:w-1/2 w-full">
                    <div className="flex items-center gap-3 md:ps-10">
                        <Home className="xl:size-6 lg:size-5 size-4 text-[#FF6B35]" />
                        <h2 className="xl:text-base text-xl text-[#1F2937] font-semibold">SME Command & Control Center</h2>
                    </div>
                </PageNavbarLeftContent>

                <PageNavbarRightContent className="md:flex gap-2 hidden">
                    <Button 
                        variant="outline" 
                        className="border border-[#FF6B35] rounded-xl !h-10 text-[#FF6B35] hover:bg-[#FF6B35]/10 !px-6 w-fit xl:!text-xs !text-base !font-bold"
                    >
                        OnRamp Fiat @ Zelle
                    </Button>
                    <Button 
                        variant="primary" 
                        className="rounded-xl !h-10 w-fit !px-4 xl:!text-xs !text-base !font-bold bg-[#FF6B35] hover:bg-[#FF6B35]/90"
                    >
                        Liquidity Pools
                        <ExportSquare size={15} />
                    </Button>
                </PageNavbarRightContent>
            </PageNavbar>

            <PageContent className="bg-white">
                <CommandControlContent />
            </PageContent>
        </div>
    );
};

export default CommandControl;
