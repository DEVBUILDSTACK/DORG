import React from "react";

import DocumentText from "@/assets/svg/fundio/DocumentText";
import Analytics from "@/components/features/fundio/admin-consoles/analytics/Analytics";
import PageContent from "@/components/layout/PageContent";
import PageNavbar, { PageNavbarLeftContent } from "@/components/layout/PageNavbar";

// Disable static optimization for this page
export const dynamic = 'force-dynamic';

const AnalyticsPage: React.FC = () => {
    return (
        <div>
            <PageNavbar>
                <PageNavbarLeftContent className="md:w-1/2 w-full">
                    <div className="flex items-center gap-3">
                        <DocumentText className="lg:size-6 size-5 text-[#FF6B35]" />
                        <h1 className="xl:text-base text-xl text-[#1F2937] font-semibold">SME User Console</h1>
                    </div>
                </PageNavbarLeftContent>
            </PageNavbar>

            <PageContent className="bg-white">
                <Analytics />
            </PageContent>
        </div>
    );
};

export default AnalyticsPage;
