import React from "react";

import DocumentText from "@/assets/svg/fundio/DocumentText";
import ManageLPDetails from "@/components/features/fundio/admin-consoles/manage-lps/ManageLPDetails";
import PageContent from "@/components/layout/PageContent";
import PageNavbar, { PageNavbarLeftContent } from "@/components/layout/PageNavbar";

const ManageLPDetailsView: React.FC = () => {
    return (
        <div>
            <PageNavbar>
                <PageNavbarLeftContent className="md:w-1/2 w-full">
                    <div className="flex items-center gap-3">
                        <DocumentText className="lg:size-6 size-5" />
                        <h1 className="xl:text-base text-xl text-white/80">Lender LP Administration Console</h1>
                    </div>
                </PageNavbarLeftContent>
            </PageNavbar>

            <PageContent className="xl:pr-0">
                <ManageLPDetails />
            </PageContent>
        </div>
    );
};

export default ManageLPDetailsView;
