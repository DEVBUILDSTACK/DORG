"use client";

import { Skeleton, Switch } from "@mantine/core";
import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

// assets/icons
import { SectionSimulateCapitalBg } from "@/assets/images";
import Plus from "@/assets/svg/fundio/command-control/Plus";
import SandBox from "@/assets/svg/fundio/command-control/SandBox";
import SwitchArrow from "@/assets/svg/fundio/command-control/SwitchArrow";

// local feature blocks
import DealFi from "./DealFi";
import OnrampModal from "./OnchainKitOnRampModal"; // expects: { isOpen, onClose }
import PEGRateChecker from "./PEGRateChecker";
import { WalletDashboard } from "./WalletDashboard";
import WormholeBridgeModal from "./WormholeBridgeModal"; // expects: { isOpen, onCloseAction }

type Card = {
  id: 1 | 2 | 3;
  label: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { className?: string }>;
};

const commandControlCardData: Card[] = [
  { id: 1, label: "Stable Coin Cross Chain", description: "SWAP", icon: SwitchArrow },
  { id: 2, label: "OnRamp/Buy", description: "DIGITAL CURRENCY", icon: Plus },
  { id: 3, label: "Buy Digital Currencies", description: "BRIDGE", icon: SandBox },
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
                         bg-fundio-sidebar rounded-2xl p-5 transition-all duration-700 overflow-hidden
                         cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <div className="hidden group-hover:block absolute top-0 right-0 w-full h-full rotate-x-180">
                <Image
                  src={SectionSimulateCapitalBg}
                  alt="YieldBg"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center justify-end w-full">
                <item.icon className="lg:size-11 md:size-10 size-8" />
              </div>

              <div className="flex flex-col lg:gap-5 h-fit w-full items-start justify-center">
                <h2 className="lg:text-2xl md:text-xl font-medium text-white">{item.label}</h2>
                <h6 className="text-white/80 font-light lg:text-xs md:text-sm text-base">
                  {item.description}
                </h6>
              </div>
            </button>
          ))}
        </div>

        {/* Wallet status toggle */}
        <div className="flex items-center gap-3">
          <span className="text-white/80 font-semibold text-base">Wallet Status</span>
          <Switch
            checked={isChecked}
            onChange={handleSwitchChange}
            classNames={{
              track:
                "bg-gradient-to-r from-[#BDBF1B] to-[#86BB4A] shadow-inner shadow-black/50 cursor-pointer",
              thumb: "shadow shadow-black/50",
            }}
            thumbIcon={<></>}
          />
          <span className="text-white/80 font-semibold text-base">Juice DealFI</span>
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
                classNames={{ root: "before:bg-[#1D1F1B] after:bg-gray-400/5 rounded-2xl" }}
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
