"use client";

import DocumentText from "@/assets/svg/fundio/DocumentText";
import ManageLps from "@/components/features/fundio/admin-consoles/manage-lps/ManageLps";
import PageContent from "@/components/layout/PageContent";
import PageNavbar, { PageNavbarLeftContent } from "@/components/layout/PageNavbar";

// Disable static optimization for this page
export const dynamic = 'force-dynamic';

const ManageLpsPage = () => {
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
                <ManageLps />
            </PageContent>
        </div>
    );
};

export default ManageLpsPage;
