"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaCaretRight, FaVoicemail } from "react-icons/fa6";
import { HiOutlineSun } from "react-icons/hi2";
import { MdOutlinePrivacyTip, MdOutlineReportGmailerrorred } from "react-icons/md";
import { PiInfinityBold } from "react-icons/pi";
import { TbMoonStars } from "react-icons/tb";

import DatBoard from "@/assets/svg/fundio/sovereign-guidance/DatBoard";
import DoubleTap from "@/assets/svg/fundio/sovereign-guidance/DoubleTap";
import HugeiconsCrown from "@/assets/svg/fundio/sovereign-guidance/HugeiconsCrown";
import LanguageTranslate from "@/assets/svg/fundio/sovereign-guidance/LanguageTranslate";
import PajamasAppearance from "@/assets/svg/fundio/sovereign-guidance/PajamasAppearance";
import RecentlyDelete from "@/assets/svg/fundio/sovereign-guidance/RecentlyDelete";
import { cn } from "@/lib/utils";

type SettingItemProps = {
    icon: React.ReactNode;
    title: string;
    hasChildren?: React.ReactNode;
    onClick?: () => void;
};

function SettingItem({
    icon,
    title,
    hasChildren,
    onClick,
}: SettingItemProps) {
    return (
        <div
            className={cn("flex items-center justify-between p-3 rounded-lg hover:bg-[#FFE5DC]/30 transition-colors", onClick && "cursor-pointer")}
            onClick={onClick}
        >
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center size-8 text-[#FF6B35] bg-[#FFE5DC] rounded-md">{icon}</div>
                <span className="text-[#1F2937] xl:text-sm text-lg font-medium">{title}</span>
            </div>
            {hasChildren || <FaCaretRight size={16} className="size-4 text-[#5A6C7D]" />}
        </div>
    );
}

const SovereignGuidanceContent: React.FC = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-6 divide-y divide-gray-200 [&>div]:pb-6">
            <div>
                <h2 className="xl:text-sm text-lg font-semibold text-[#5A6C7D] mb-4">Subscription</h2>
                <SettingItem
                    icon={<HugeiconsCrown className="size-4" />}
                    title="Upgrade To"
                    onClick={() => {
                        router.push("/sovereign-guidance/upgradation-plan");
                    }}
                />
            </div>

            <div>
                <h2 className="xl:text-sm text-lg font-semibold text-[#5A6C7D] mb-4">General</h2>
                <div className="space-y-2">
                    <SettingItem
                        icon={<PajamasAppearance className="size-4" />}
                        title="Appearance"
                        hasChildren={(
                            <div className="flex items-center gap-2">
                                {[{ id: "dark", icon: <TbMoonStars size={16} /> }, { id: "light", icon: <HiOutlineSun size={16} /> }].map((item, index) => (
                                    <div key={index} className="flex items-center justify-center bg-gradient-to-br from-[#FF6B35] to-[#FFE5DC] rounded-sm p-px size-8 group">
                                        <div className="bg-white rounded-sm w-full h-full group-hover:bg-[#FFE5DC] transition-colors duration-200">
                                            <button type="button" className="flex items-center justify-center rounded-sm w-full h-full cursor-pointer text-[#5A6C7D] hover:text-[#FF6B35] transition-colors">
                                                {React.cloneElement(item.icon, { className: "transition-colors" })}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    />
                    <SettingItem icon={<DoubleTap className="size-4" />} title="Haptics" />
                    <SettingItem icon={<LanguageTranslate className="size-4" />} title="App Language" />
                </div>
            </div>

            <div>
                <h2 className="xl:text-sm text-lg font-semibold text-[#5A6C7D] mb-4">Voice</h2>
                <SettingItem
                    icon={<FaVoicemail className="size-4" />}
                    title="Enable Dictation"
                    hasChildren={(
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            className={cn("relative w-12 h-6 rounded-full transition-colors", true ? "bg-[#FF6B35]" : "bg-gray-300")}
                        >
                            <div
                                className={cn(
                                    "absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform",
                                    true ? "right-0.5" : "left-0.5",
                                )}
                            />
                        </button>
                    )}
                // isToggled={dictationEnabled}
                // onToggle={() => setDictationEnabled(!dictationEnabled)}
                />
            </div>

            <div>
                <h2 className="xl:text-sm text-lg font-semibold text-[#5A6C7D] mb-4">Data & Information</h2>
                <div className="space-y-2">
                    <SettingItem icon={<PiInfinityBold className="size-4" />} title="Data Controls" />
                    <SettingItem icon={<DatBoard className="size-4" />} title="Terms of Use" />
                    <SettingItem icon={<MdOutlinePrivacyTip className="size-4" />} title="Privacy Policy" />
                    <SettingItem icon={<RecentlyDelete className="size-4" />} title="Recently Deleted" />
                </div>
            </div>

            <div>
                <SettingItem icon={<MdOutlineReportGmailerrorred size={20} />} title="Report An Issue" />
            </div>
        </div>
    );
};

export default SovereignGuidanceContent;
