"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Popover, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLogout } from "@privy-io/react-auth";
import { ArrowDown2, Logout } from "iconsax-reactjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDisconnect } from "wagmi";

import type { MenuItem, SidebarData, subItemData } from "@/types/general.types";
import Logo from "@/assets/svg/Logo";
import { fundioSidebarData } from "@/lib/fundio/constants";
import { jsonjuiceSidebarData } from "@/lib/json-juice/constants";
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

  // ✅ wagmi & Privy hooks (make sure your root layout wraps with Providers)
  const { disconnect } = useDisconnect();
  const { logout } = useLogout({
    onSuccess: () => {
      disconnect();
    },
  });

  const layoutData = useMemo(
    () => ({ fundio: fundioSidebarData, jsonjuice: jsonjuiceSidebarData }),
    []
  );

  const toggleExpanded = useCallback(
    (label: string) => setExpandedItem((prev) => (prev === label ? null : label)),
    []
  );

  const handleLogout = useCallback(async () => {
    await logout();
    closeLogoutModal();
    router.push("/command-control");
  }, [logout, closeLogoutModal, router]);

  const isRouteActive = useCallback(
    (link: string) => pathname === link || pathname.includes(link),
    [pathname]
  );

  const hasSubItems = (item: MenuItem): item is MenuItem & { subItems: subItemData[] } =>
    Array.isArray((item as any).subItems) && (item as any).subItems.length > 0;

  const renderMenuItem = useCallback(
    (item: MenuItem) => {
      const expanded = expandedItem === item.label;

      if (hasSubItems(item)) {
        const activeTop = isRouteActive(item.link);
        const activeChild = item.subItems.some((s) => pathname.includes(s.link));
        return (
          <div key={item.label}>
            <button
              type="button"
              onClick={() => toggleExpanded(item.label)}
              className={cn(
                "w-full p-px xl:text-xs text-lg rounded-xl outline-none",
                "bg-gradient-to-r from-secondary/20 via-transparent via-90% to-[#7FD33E]/20 cursor-pointer"
              )}
            >
              <div
                className={cn(
                  "flex flex-col rounded-xl p-3",
                  "bg-fundio-sidebar",
                  expanded &&
                    "bg-radial-[at_60%_100%] from-secondary/15 via-primary/15 to-transparent to-75%"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-between gap-4",
                    activeTop &&
                      !activeChild &&
                      "bg-gradient-to-br from-[#272A24] from-30% via-[#86BB4A]/50 via-65% to-primary"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="size-5 shrink-0" />
                    {item.label}
                  </div>
                </div>

                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="flex flex-col gap-4 ml-9 mt-4">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={`${item.label}__${subItem.label}`}
                        href={subItem.link}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsSidebarOpen(false);
                        }}
                        className={cn(
                          "text-left font-medium xl:text-[12px] text-base text-[#FFFFFF]/70 hover:text-white rounded-lg transition-colors",
                          pathname === subItem.link &&
                            "bg-linear-to-r from-primary to-secondary to-60% text-transparent bg-clip-text font-semibold"
                        )}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          </div>
        );
      }

      const active = isRouteActive(item.link);
      const isJJ = sidebarData.theme === "JsonJuice";
      return (
        <Link
          key={item.label}
          href={item.link}
          onClick={() => setIsSidebarOpen(false)}
          className={cn(
            "p-px xl:text-xs text-lg rounded-xl outline-none",
            isJJ
              ? "bg-gradient-to-r from-[#723DE0]/20 from-10% via-transparent via-70% to-[#723DE0]/20 backdrop-blur-3xl"
              : "bg-gradient-to-r from-secondary/20 via-transparent via-90% to-[#7FD33E]/20"
          )}
        >
          <div
            className={cn(
              "flex items-center gap-3 rounded-xl p-2.5",
              isJJ ? "bg-[#010F25]" : "bg-fundio-sidebar",
              active &&
                (isJJ
                  ? "bg-gradient-to-r from-[#010F25] from-10% via-primary/30 via-70% to-primary/40 backdrop-blur-3xl"
                  : "bg-gradient-to-r from-[#272A24] from-30% via-primary/50 via-80% to-[#86BB4A]/40")
            )}
          >
            <item.icon className="size-5 shrink-0" />
            {item.label}
          </div>
        </Link>
      );
    },
    [expandedItem, isRouteActive, pathname, setIsSidebarOpen, sidebarData.theme, toggleExpanded]
  );

  return (
    <>
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <nav
        className={cn(
          "fixed lg:relative inset-y-0 left-0 z-40 lg:w-full w-[250px] text-white transform transition-transform duration-300 ease-in-out lg:transform-none",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          sidebarData.theme === "JsonJuice" ? "bg-[#010F25]" : "bg-secondary/3"
        )}
      >
        <div className="w-full h-full px-4 pb-4 flex flex-col rounded-xl backdrop-blur-3xl">
          <div className="h-16 flex items-center mb-5 ml-1 mt-2 relative">
            <Popover width="target" position="bottom-start" offset={10}>
              <Popover.Target>
                <button
                  type="button"
                  className="w-full flex items-center justify-between group cursor-pointer outline-none"
                >
                  <div className="flex items-center gap-2">
                    {sidebarData.logo ? <sidebarData.logo className="w-4/5" /> : <Logo />}
                  </div>
                  <ArrowDown2 size={16} />
                </button>
              </Popover.Target>
              <Popover.Dropdown
                classNames={{
                  dropdown:
                    "bg-fundio-sidebar rounded-xl border border-gray-700 p-0 overflow-hidden",
                }}
              >
                {Object.entries(layoutData).map(([key, data]) => {
                  const isFundio = key === "fundio";
                  const themeMatch =
                    sidebarData.theme === (isFundio ? "Fundio" : "JsonJuice");
                  return (
                    <button
                      type="button"
                      key={key}
                      onClick={() =>
                        router.replace(
                          isFundio ? "/command-control" : "/json-juice/command-center"
                        )
                      }
                      className={cn(
                        "w-full flex items-center py-2 px-4 hover:bg-[#272A24] transition-colors cursor-pointer",
                        themeMatch && "bg-[#272A24]"
                      )}
                    >
                      <data.logo className="w-4/5" />
                    </button>
                  );
                })}
              </Popover.Dropdown>
            </Popover>
          </div>

          <ScrollArea scrollbarSize={6} type="scroll" scrollbars="y" className="flex-1 mt-5">
            <div className="flex flex-col gap-3.5">
              {sidebarData.menuItems.map((item) => renderMenuItem(item as MenuItem))}
            </div>
          </ScrollArea>

          <button
            onClick={openLogoutModal}
            type="button"
            className={cn(
              "w-full py-3 px-4 xl:text-sm text-lg flex gap-4 items-center rounded-xl cursor-pointer text-[#E97474] my-2 hover:bg-[#E97474]/20 mt-auto"
            )}
          >
            <Logout size={20} />
            Log Out
          </button>
        </div>
      </nav>

      <ConfirmationModal
        icon={<Logout size={52} color="white" />}
        title="Log Out?"
        content="Are you certain you wish to proceed with logging out?"
        onConfirm={handleLogout}
        onCancel={closeLogoutModal}
        opened={logoutModalOpened}
        confirmText="Yes, Log Out"
        cancelText="Close"
      />
    </>
  );
}

export default Sidebar;
