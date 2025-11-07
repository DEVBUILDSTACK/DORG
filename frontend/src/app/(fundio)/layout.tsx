"use client";
import React from "react";

import { Sidebar } from "@/components/layout/Sidebar";
import { fundioSidebarData } from "@/lib/fundio/constants";

// Disable static optimization for all fundio pages
export const dynamic = 'force-dynamic';

const FundioLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="grid lg:grid-cols-[256px_1fr] h-screen bg-[#F9FAFB]">
            <Sidebar sidebarData={fundioSidebarData} />
            <div className="max-h-full overflow-auto hide-scrollbar bg-[#F9FAFB]">{children}</div>
        </div>
    );
};

export default FundioLayout;