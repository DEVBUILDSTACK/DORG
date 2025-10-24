import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { AutoRenewal, FLPData, LPType, Tier } from "@/types/landing-page/simulateCapital.types";

type FLPStore = {
    // State
    stepCount: number;
    signature: string;
    cohortPhase: number;
    tierData: Tier[];
    lpsData: LPType[];
    autoRenewalData: AutoRenewal[];
    flpData: FLPData | null;

    // Actions
    setStepCount: (stepCount: number) => void;
    setTierData: (tierData: Tier[]) => void;
    setLpsData: (lpsData: LPType[]) => void;
    setAutoRenewalData: (autoRenewalData: AutoRenewal[]) => void;
    setFLPData: (flpData: FLPData) => void;
    setSignature: (signature: string) => void;
    setCohortPhase: (cohortPhase: number) => void;

    getStepCount: () => number;
    getTierData: () => Tier[];
    getLpsData: () => LPType[];
    getAutoRenewalData: () => AutoRenewal[];
    getFLPData: () => FLPData | null;
    getSignature: () => string;
    getCohortPhase: () => number;

    clearStepCount: () => void;
    clearTierData: () => void;
    clearLpsData: () => void;
    clearAutoRenewalData: () => void;
    clearFLPData: () => void;
    clearSignature: () => void;
    clearCohortPhase: () => void;
};

const useFLPStore = create<FLPStore>()(
    persist(
        devtools((set, get) => ({
            // Initial state
            stepCount: 0,
            tierData: [],
            lpsData: [],
            autoRenewalData: [],
            flpData: null,
            signature: "",
            cohortPhase: 0,

            // Actions
            setStepCount: (stepCount: number) => set({ stepCount }),
            setTierData: (tierData: Tier[]) => set({ tierData }),
            setLpsData: (lpsData: LPType[]) => set({ lpsData }),
            setAutoRenewalData: (autoRenewalData: AutoRenewal[]) => set({ autoRenewalData }),
            setFLPData: (flpData: FLPData) => set({ flpData }),
            setSignature: (signature: string) => set({ signature }),
            setCohortPhase: (cohortPhase: number) => set({ cohortPhase }),

            getStepCount: () => get().stepCount,
            getTierData: () => get().tierData,
            getLpsData: () => get().lpsData,
            getAutoRenewalData: () => get().autoRenewalData,
            getFLPData: () => get().flpData,
            getSignature: () => get().signature,
            getCohortPhase: () => get().cohortPhase,

            clearStepCount: () => set({ stepCount: 0 }),
            clearTierData: () => set({ tierData: [] }),
            clearLpsData: () => set({ lpsData: [] }),
            clearAutoRenewalData: () => set({ autoRenewalData: [] }),
            clearFLPData: () => set({ flpData: null }),
            clearSignature: () => set({ signature: "" }),
            clearCohortPhase: () => set({ cohortPhase: 0 }),
        })),
        {
            name: "flp-store",
        },
    ),
);

export default useFLPStore;
