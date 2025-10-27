import React from "react";

import SovereignGuidance from "@/components/features/fundio/sovereign-guidance/SovereignGuidance";

// Disable static optimization for this page
export const dynamic = 'force-dynamic';

const SovereignGuidancePage: React.FC = () => {
    return (
        <SovereignGuidance />
    );
};

export default SovereignGuidancePage;
