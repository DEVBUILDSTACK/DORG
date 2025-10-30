"use client";

import React, { useState } from "react";
import { ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLogout } from "@privy-io/react-auth";
import { ChevronDown, LogOut, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDisconnect } from "wagmi";

import type { MenuItem, SidebarData, subItemData } from "@/types/general.types";
import { cn } from "@/lib/utils";
import { useCentralStore } from "@/store/Store";
import ConfirmationModal from "../ui/modal/ConfirmationModal";

type SidebarProps = { sidebarData: SidebarData };

export function Sidebar({ sidebarData }: SidebarProps) {
  const [logoutModalOpened, { open: openLogoutModal, close: closeLogoutModal }] =
    useDisclosure(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const pathname = usePathname() ?? "";
  const router = useRouter();
  const { isSidebarOpen, setIsSidebarOpen } = useCentralStore();

  const { disconnect } = useDisconnect();
  const { logout } = useLogout({
    onSuccess: () => {
      disconnect();
    },
  });

  const toggleExpanded = (label: string) => {
    setExpandedItem((prev) => (prev === label ? null : label));
  };

  const handleLogout = async () => {
    await logout();
    closeLogoutModal();
    router.push("/");
  };

  const isRouteActive = (link: string) => pathname === link || pathname.startsWith(link);

  const hasSubItems = (item: MenuItem): item is MenuItem & { subItems: subItemData[] } =>
    Array.isArray((item as any).subItems) && (item as any).subItems.length > 0;

  const renderMenuItem = (item: MenuItem) => {
    const expanded = expandedItem === item.label;
    const isActive = isRouteActive(item.link);

    if (hasSubItems(item)) {
      const activeChild = item.subItems.some((s) => isRouteActive(s.link));

      return (
        <div key={item.label}>
          <button
            type="button"
            onClick={() => toggleExpanded(item.label)}
            className={cn(
              "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200",
              (isActive || activeChild)
                ? "bg-[#0A4A7A]/10 text-[#0A4A7A] font-semibold"
                : "text-[#5A6C7D] hover:bg-[#F3F4F6] hover:text-[#0A4A7A]"
            )}
            aria-label={`Toggle ${item.label} menu`}
          >
            <div className="flex items-center space-x-3">
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="text-sm">{item.label}</span>
            </div>
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                expanded ? "rotate-180" : ""
              )}
            />
          </button>

          {expanded && (
            <div className="mt-1 ml-8 space-y-1">
              {item.subItems.map((subItem) => {
                const subActive = isRouteActive(subItem.link);
                return (
                  <Link
                    key={subItem.link}
                    href={subItem.link}
                    onClick={() => setIsSidebarOpen(false)}
                    className={cn(
                      "block px-4 py-2 text-sm rounded-lg transition-all duration-200",
                      subActive
                        ? "bg-[#2E865F]/10 text-[#2E865F] font-semibold border-l-2 border-[#2E865F]"
                        : "text-[#5A6C7D] hover:bg-[#F3F4F6] hover:text-[#0A4A7A]"
                    )}
                  >
                    {subItem.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.label}
        href={item.link}
        onClick={() => setIsSidebarOpen(false)}
        className={cn(
          "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200",
          isActive
            ? "bg-[#0A4A7A]/10 text-[#0A4A7A] font-semibold"
            : "text-[#5A6C7D] hover:bg-[#F3F4F6] hover:text-[#0A4A7A]"
        )}
      >
        <item.icon className="w-5 h-5 shrink-0" />
        <span className="text-sm">{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-white border-r border-[#E5E7EB] transition-transform duration-300",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-linear-to-br from-[#0A4A7A] to-[#2E865F] rounded-lg" />
              {sidebarData.logo ? (
                <sidebarData.logo className="h-6" />
              ) : (
                <span className="text-xl font-bold text-[#0A4A7A]">DORG</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 text-[#5A6C7D]" />
            </button>
          </div>

          <ScrollArea className="flex-1 px-4 py-6">
            <nav className="space-y-2">
              {sidebarData.menuItems.map((item) => renderMenuItem(item as MenuItem))}
            </nav>
          </ScrollArea>

          <div className="p-4 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={openLogoutModal}
              className="w-full flex items-center space-x-3 px-4 py-3 text-[#DC2626] hover:bg-[#FEE2E2] rounded-xl transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <ConfirmationModal
        icon={<LogOut className="w-12 h-12 text-[#DC2626]" />}
        title="Confirm Logout"
        content="Are you sure you want to logout? You will be redirected to the landing page."
        onConfirm={handleLogout}
        onCancel={closeLogoutModal}
        opened={logoutModalOpened}
        confirmText="Logout"
        cancelText="Cancel"
      />
    </>
  );
}

export default Sidebar;
