import { FtxToken } from "iconsax-reactjs";

import type { SidebarData } from "@/types/general.types";

import Logo from "@/assets/images/l2l.jpg";
import DocumentText from "@/assets/svg/fundio/DocumentText";
import Home from "@/assets/svg/fundio/Home";
import Shield from "@/assets/svg/fundio/Shield";
import Users from "@/assets/svg/fundio/Users";
import HierarchyTree from "@/assets/svg/json-juice/command-center/HierarchyTree";

export const fundioSidebarData: SidebarData = {
    name: "Learn2Launch",
    logo: Logo,
    theme: "Fundio",
    menuItems: [
        { label: "Command & Control", icon: Home, link: "/command-control" },
        {
            label: "Administration Consoles",
            icon: DocumentText,
            link: "/admin-consoles",
            subItems: [
                { label: "Manage LPs", link: "/admin-consoles/manage-lps" },
                { label: "Analytics", link: "/admin-consoles/analytics" },
                { label: "Messaging", link: "/admin-consoles/messaging" },
                { label: "Business Profile", link: "/admin-consoles/business-profile" },
            ],
        },
        {
            label: "W3 Treasury Tools",
            icon: Shield,
            link: "/treasury-tools",
            subItems: [
                { label: "Manage Defi Wallets", link: "/treasury-tools/manage-defi-wallets" },
                { label: "Token Holding Settings", link: "/treasury-tools/token-holding-settings" },
                { label: "Global Payout", link: "/treasury-tools/global-payout" },
                { label: "Payment Gateway", link: "/treasury-tools/payment-gateway" },
                { label: "API Guides", link: "/treasury-tools/api-guides" },
            ],
        },
        { label: "Surescrow & Sig Alpha", icon: FtxToken, link: "/surescrow-sig-alpha" },
        { label: "Sovereign Guidance AI Preferences", icon: HierarchyTree, link: "/sovereign-guidance" },
        { label: "SME Referral$", icon: Users, link: "/sme-referral" },
    ],
};

export const LP_FILTER = [
    { value: "", label: "All LPs" },
    { value: "Active", label: "Active LPs" },
    { value: "Pending", label: "Pending Funding" },
    { value: "Historical", label: "Funded, Historical" },
    { value: "Cancelled", label: "Unfunded, Canceled" },
];

export const LP_TYPE = [
    { value: "SAFE_FLP", label: "SAFE FLP" },
];
