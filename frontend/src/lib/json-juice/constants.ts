import { FtxToken } from "iconsax-reactjs";

import type { SidebarData } from "@/types/general.types";

import Home from "@/assets/svg/fundio/Home";
import HierarchyTree from "@/assets/svg/json-juice/command-center/HierarchyTree";
import JsonJuiceLogo from "@/assets/svg/json-juice/command-center/JsonJuiceLogo";

export const jsonjuiceSidebarData: SidebarData = {
    name: "Json Juice",
    logo: JsonJuiceLogo,
    theme: "JsonJuice",
    menuItems: [
        { label: "Command Center", icon: Home, link: "/json-juice/command-center" },
        { label: "Source & Needs Feed Console", icon: FtxToken, link: "/json-juice/source-needs-feed-console" },
        { label: "Agentic Subscriptions", icon: HierarchyTree, link: "/json-juice/agentic-subscriptions" },
    ],
};
