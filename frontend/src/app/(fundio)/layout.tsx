"use client";
import React from "react";

import { Sidebar } from "@/components/layout/Sidebar";
import { fundioSidebarData } from "@/lib/fundio/constants";

// Disable static optimization for all fundio pages
export const dynamic = 'force-dynamic';

const FundioLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="grid lg:grid-cols-[240px_1fr] 3xl:grid-cols-[260px_1fr] h-screen bg-c3-background">
            <Sidebar sidebarData={fundioSidebarData} />
            <div className="max-h-full overflow-auto hide-scrollbar">{children}</div>
        </div>
    );
};

export default FundioLayout;