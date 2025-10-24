import React from "react";

import Home from "@/assets/svg/fundio/Home";
import PageContent from "@/components/layout/PageContent";
import PageNavbar, { PageNavbarLeftContent } from "@/components/layout/PageNavbar";

import SovereignGuidanceContent from "./SovereignGuidanceContent";

const SovereignGuidance: React.FC = () => {
    return (
        <div>
            <PageNavbar>
                <PageNavbarLeftContent className="md:w-1/2 w-full">
                    <div className="flex items-center gap-3">
                        <Home className="xl:size-6 lg:size-5 size-4" />
                        <h2 className="xl:text-base text-xl">Sovereign Guidance AI Preferences</h2>
                    </div>
                </PageNavbarLeftContent>
            </PageNavbar>

            <PageContent className="bg-transparent xl:pr-0">
                <SovereignGuidanceContent />
            </PageContent>
        </div>
    );
};

export default SovereignGuidance;
