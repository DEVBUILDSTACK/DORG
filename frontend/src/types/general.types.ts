export type NavItem = {
    title: string;
    href: string;
    disabled?: boolean;
    external?: boolean;
    shortcut?: [string, string];
    icon?: React.ReactNode;
    label?: string;
    description?: string;
    isActive?: boolean;
    items?: NavItem[];
};

export type IconComponent = {
    size?: number;
    className?: string;
};

export type subItemData = {
    label: string;
    link: string;
};

export type MenuItem = {
    label: string;
    icon: React.FC<IconComponent>;
    link: string;
    subItems?: subItemData[];
};

export type SidebarData = {
    name: string;
    logo: React.FC<IconComponent>;
    theme: "Fundio" | "JsonJuice";
    menuItems: MenuItem[];
};
