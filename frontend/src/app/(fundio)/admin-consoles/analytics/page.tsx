import React from "react";

import DocumentText from "@/assets/svg/fundio/DocumentText";
import Analytics from "@/components/features/fundio/admin-consoles/analytics/Analytics";
import PageContent from "@/components/layout/PageContent";
import PageNavbar, { PageNavbarLeftContent } from "@/components/layout/PageNavbar";

const AnalyticsPage: React.FC = () => {
    return (
        <div>
            <PageNavbar>
                <PageNavbarLeftContent className="md:w-1/2 w-full">
                    <div className="flex items-center gap-3">
                        <DocumentText className="lg:size-6 size-5" />
                        <h1 className="xl:text-base text-xl text-white/80">SME User Console</h1>
                    </div>
                </PageNavbarLeftContent>
            </PageNavbar>

            <PageContent className="xl:pr-0">
                <Analytics />
            </PageContent>
        </div>
    );
};

export default AnalyticsPage;
