"use client";
import type React from "react";

import { redirect } from "next/navigation";

const AdministrationConsoles: React.FC = () => {
    return (
        redirect("/admin-consoles/analytics")
    );
};

export default AdministrationConsoles;
