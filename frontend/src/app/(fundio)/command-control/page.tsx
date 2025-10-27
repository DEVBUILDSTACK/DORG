"use client";

import React from "react";
import CommandControl from "@/components/features/fundio/command-control/CommandControl";

// Disable static optimization for this page
export const dynamic = 'force-dynamic';

const CommandControlPage: React.FC = () => {
    return (
        <CommandControl />
    );
};

export default CommandControlPage;
