"use client";
import { useQuery } from "@tanstack/react-query";
import { ExportSquare, Shield } from "iconsax-reactjs";
import React, { useState } from "react";

import Home from "@/assets/svg/fundio/Home";
import PageContent from "@/components/layout/PageContent";
import PageNavbar, { PageNavbarLeftContent, PageNavbarRightContent } from "@/components/layout/PageNavbar";
import Button from "@/components/ui/button/Button";
import { getAllAutoRenewal, getAllLPType, getAllTier } from "@/lib/api/landing-page/general";
import { PAGE_LIMIT, QUERY_KEY } from "@/lib/landing-page/constants";
import useFLPStore from "@/store/useFLPStore";

import CommandControlContent from "./CommandControlContent";
import ParentControlsModal from "./ParentControlsModal";

const CommandControl: React.FC = () => {
    const { setTierData, setAutoRenewalData, setLpsData } = useFLPStore();
    const [parentControlsOpen, setParentControlsOpen] = useState(false);

    useQuery({
        queryKey: [QUERY_KEY.TIER, { offset: 0, limit: PAGE_LIMIT, platform_name: "Fundio" }],
        queryFn: async () => {
            const data = await getAllTier(0, PAGE_LIMIT, "Fundio");
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
        queryKey: [QUERY_KEY.LP_TYPE, { offset: 0, limit: PAGE_LIMIT, platform_name: "Fundio", status: "Active" }],
        queryFn: async () => {
            const data = await getAllLPType(0, PAGE_LIMIT, "Fundio", "Active");
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
            {/* {ready && authenticated
                ? (
                        <> */}
            <PageNavbar>
                <PageNavbarLeftContent className="md:w-1/2 w-full">
                    <div className="flex items-center gap-3">
                        <Home className="xl:size-6 lg:size-5 size-4" />
                        <h2 className="xl:text-base text-xl">SME Command & Control Center</h2>
                    </div>
                </PageNavbarLeftContent>

                <PageNavbarRightContent className="md:flex gap-2 hidden">
                    <Button 
                        variant="outline" 
                        className="border border-[#FFFFFF]/20 rounded-xl !h-10 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent !px-6 w-fit xl:!text-xs !text-base !font-bold"
                        onClick={() => setParentControlsOpen(true)}
                    >
                        <Shield size={15} />
                        Parent Controls
                    </Button>
                    <Button variant="outline" className="border border-[#FFFFFF]/20 rounded-xl !h-10 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent !px-6 w-fit xl:!text-xs !text-base !font-bold">OnRamp Fiat @ Zelle</Button>
                    <Button variant="primary" className="rounded-xl !h-10 w-fit !px-4 xl:!text-xs !text-base !font-bold">
                        Liquidity Pools
                        <ExportSquare size={15} />
                    </Button>
                </PageNavbarRightContent>
            </PageNavbar>

            <PageContent className="bg-transparent xl:pr-0">
                <CommandControlContent />
            </PageContent>

            <ParentControlsModal 
                isOpen={parentControlsOpen} 
                onClose={() => setParentControlsOpen(false)} 
            />
        </div>
    );
};

export default CommandControl;
