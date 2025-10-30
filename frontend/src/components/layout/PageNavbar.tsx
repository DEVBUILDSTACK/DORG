"use client";

import { Menu } from "lucide-react";
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
                "flex items-center justify-center h-9 w-9 duration-200 hover:bg-[#F3F4F6] rounded-lg text-[#5A6C7D]",
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
                "h-9 gap-2 bg-linear-to-r from-[#FF6B35] to-[#E65A2D] hidden py-2 px-4 duration-200 text-white rounded-lg text-sm md:flex items-center justify-center hover:shadow-lg hover:shadow-[#FF6B35]/30 font-medium",
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
                "relative z-50 h-16 flex px-6 lg:px-8 text-[#1F2937] justify-between items-center gap-4 border-b border-[#E5E7EB] bg-white",
                className,
            )}
        >
            <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden flex items-center justify-center text-[#5A6C7D] h-9 w-9 hover:bg-[#F3F4F6] rounded-lg transition-colors"
                aria-label="Open sidebar menu"
            >
                <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center justify-between w-full gap-4">
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
