"use client";

import { SidebarLeft } from "iconsax-reactjs";
import React from "react";

import { cn } from "@/lib/utils";
import { useCentralStore } from "@/store/Store";

function PageNavbarLeftContent({ ref, ...props }: React.ComponentPropsWithoutRef<"div"> & { ref?: React.RefObject<HTMLDivElement | null> }) {
    return (
        <div
            ref={ref}
            className="flex items-center justify-between gap-2 h-10"
            {...props}
        />
    );
}

PageNavbarLeftContent.displayName = "PageNavbarLeftContent";

function PageNavbarRightContent({ ref, ...props }: React.ComponentPropsWithoutRef<"div"> & { ref?: React.RefObject<HTMLDivElement | null> }) {
    return (
        <div
            ref={ref}
            className="text-gray-500 flex gap-2"
            {...props}
        />
    );
}

PageNavbarRightContent.displayName = "PageNavbarRightContent";

function PageNavbarIconButton({ ref, className, ...props }: React.ComponentPropsWithoutRef<"button"> & { ref?: React.RefObject<HTMLButtonElement | null> }) {
    return (
        <button
            type="button"
            ref={ref}
            className={cn(
                "all-center h-8 w-8 duration-200 hover:bg-gray-100 rounded-lg",
                className,
            )}
            {...props}
        />
    );
}

PageNavbarIconButton.displayName = "PageNavbarIconButton";

function PageNavbarPrimaryButton({ ref, className, ...props }: React.ComponentPropsWithoutRef<"button"> & { ref?: React.RefObject<HTMLButtonElement | null> }) {
    return (
        <button
            type="button"
            ref={ref}
            className={cn(
                "h-8 gap-1 bg-primary hidden py-1 px-2 duration-200 text-white rounded-lg text-xl md:text-lg md:flex items-center justify-center",
                className,
            )}
            {...props}
        />
    );
}
PageNavbarPrimaryButton.displayName = "PageNavbarPrimaryButton";

function PageNavbar({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const { setIsSidebarOpen } = useCentralStore();

    return (
        <div
            className={cn(
                "relative z-50 h-[var(--h-nav)] flex pl-6 lg:pr-20 pr-6 text-white/80 justify-between items-center gap-2 border-b border-white/4 bg-c3-background",
                className,
            )}
        >
            <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden flex items-center justify-center text-gray-500 h-8 w-8"
            >
                <SidebarLeft size={16} />
            </button>
            <div className=" flex items-center justify-between w-full gap-2">
                {children}
            </div>
        </div>
    );
}

export default PageNavbar;

export {
    PageNavbarIconButton,
    PageNavbarLeftContent,
    PageNavbarPrimaryButton,
    PageNavbarRightContent,
};
