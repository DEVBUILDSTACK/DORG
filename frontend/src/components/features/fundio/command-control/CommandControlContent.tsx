"use client";

import { Skeleton, Switch } from "@mantine/core";
import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

// assets/icons
import { SectionSimulateCapitalBg } from "@/assets/images";
import BridgeDecor from "@/assets/svg/fundio/command-control/BridgeDecor";
import CrossChainDecor from "@/assets/svg/fundio/command-control/CrossChainDecor";
import OnRampDecor from "@/assets/svg/fundio/command-control/OnRampDecor";
import Plus from "@/assets/svg/fundio/command-control/Plus";
import SandBox from "@/assets/svg/fundio/command-control/SandBox";
import SwitchArrow from "@/assets/svg/fundio/command-control/SwitchArrow";

// local feature blocks
import DealFi from "./DealFi";
import OnrampModal from "./OnchainKitOnRampModalEnhanced"; // Enhanced version with presets
import PEGRateChecker from "./PEGRateChecker";
import { WalletDashboard } from "./WalletDashboardNew";
import WormholeBridgeModal from "./WormholeBridgeModal"; // expects: { isOpen, onCloseAction }

type Card = {
  id: 1 | 2 | 3;
  label: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { className?: string }>;
  decorIcon: React.ComponentType<React.SVGProps<SVGSVGElement> & { className?: string }>;
};

const commandControlCardData: Card[] = [
  { id: 1, label: "Stable Coin Cross Chain", description: "SWAP", icon: SwitchArrow, decorIcon: CrossChainDecor },
  { id: 2, label: "OnRamp/Buy", description: "DIGITAL CURRENCY", icon: Plus, decorIcon: OnRampDecor },
  { id: 3, label: "Buy Digital Currencies", description: "BRIDGE", icon: SandBox, decorIcon: BridgeDecor },
];

const CommandControlContent: React.FC = () => {
  const router = useRouter();

  // top toggles/sections
  const [isChecked, setIsChecked] = useState(false);
  const [showWalletDashboard, setShowWalletDashboard] = useState(false);

  const { ready, authenticated } = usePrivy();

  // modal state
  const [openWormhole, setOpenWormhole] = useState(false);
  const [openOnramp, setOpenOnramp] = useState(false);

  const handleSwitchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.currentTarget.checked;
    setIsChecked(newChecked);
    if (newChecked) router.push("/json-juice/command-center");
  }, [router]);

  // card clicks → open the right modal
  const handleCardClick = useCallback((id: Card["id"]) => {
    if (id === 1) setOpenWormhole(true);     // Wormhole
    else if (id === 2) setOpenOnramp(true);  // Onramp
    // else if (id === 3) { ... }
  }, []);

  return (
    <>
      <div className="space-y-6">
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {commandControlCardData.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              onClick={() => handleCardClick(item.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleCardClick(item.id);
              }}
              className="relative group w-full h-full flex flex-col items-center justify-center lg:gap-5 gap-3
                         bg-white border border-[#E5E7EB] hover:border-[#FF6B35] rounded-2xl p-5 transition-all duration-300 overflow-hidden
                         cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] shadow-sm hover:shadow-md"
            >
              <div className="hidden group-hover:block absolute inset-0 bg-linear-to-br from-[#FFE5DC]/30 via-[#FFF5F2]/20 to-[#FF6B35]/10 rounded-2xl" />

              <div className="absolute top-0 left-0 w-full flex justify-center pt-2 opacity-100 group-hover:opacity-80 transition-opacity duration-300">
                <item.decorIcon className="w-24 h-16" />
              </div>

              <div className="flex items-center justify-end w-full relative z-10">
                <item.icon className="lg:size-11 md:size-10 size-8 text-[#FF6B35]" />
              </div>

              <div className="flex flex-col lg:gap-5 h-fit w-full items-start justify-center relative z-10">
                <h2 className="lg:text-2xl md:text-xl font-medium text-[#1F2937]">{item.label}</h2>
                <h6 className="text-[#5A6C7D] font-light lg:text-xs md:text-sm text-base">
                  {item.description}
                </h6>
              </div>
            </button>
          ))}
        </div>

        {/* Wallet status toggle */}
        <div className="flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-xl p-4">
          <span className="text-[#1F2937] font-semibold text-base">Wallet Status</span>
          <Switch
            checked={isChecked}
            onChange={handleSwitchChange}
            classNames={{
              track:
                "bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] shadow-inner shadow-black/10 cursor-pointer",
              thumb: "shadow shadow-black/20",
            }}
            thumbIcon={<></>}
          />
          <span className="text-[#1F2937] font-semibold text-base">Juice DealFI</span>
        </div>

        {/* Main content area */}
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="xl:col-span-4 md:col-span-6 col-span-12">
            <PEGRateChecker
              showWalletDashboard={showWalletDashboard}
              setShowWalletDashboard={setShowWalletDashboard}
            />
          </div>
          <div className="xl:col-span-8 md:col-span-6 col-span-12">
            {ready ? (
              authenticated ? (
                <WalletDashboard />
              ) : (
                <DealFi setShowWalletDashboard={setShowWalletDashboard} />
              )
            ) : (
              <Skeleton
                classNames={{ root: "before:bg-[#E5E7EB] after:bg-[#F9FAFB] rounded-2xl" }}
                height={300}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modals mounted once, toggled by card clicks */}
      <WormholeBridgeModal
        isOpen={openWormhole}
        onCloseAction={() => setOpenWormhole(false)}  // REQUIRED by WormholeBridgeModalProps
      />
      <OnrampModal
        isOpen={openOnramp}
        onClose={() => setOpenOnramp(false)}          // OnrampModal expects onClose (not ...Action)
      />
    </>
  );
};

export default CommandControlContent;
