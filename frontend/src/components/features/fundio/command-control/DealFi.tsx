"use client";

import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

import MailBox from "@/assets/svg/fundio/command-control/MailBox";
import Button from "@/components/ui/button/Button";
import { useAuthLogin } from "@/hooks/useAuthLogin";

type DealFiProps = {
    setShowWalletDashboard?: React.Dispatch<React.SetStateAction<boolean>>;
};

const DealFi: React.FC<DealFiProps> = ({ setShowWalletDashboard = undefined }) => {
    const router = useRouter();

    const { login } = useAuthLogin();

    return (
        <div
            className="h-full p-8 rounded-2xl relative overflow-hidden flex flex-col justify-center items-center text-center border border-[#E5E7EB] shadow-sm"
            style={{
                background: "linear-gradient(135deg, #FFE5DC 0%, #FFF5F2 25%, #FFE5DC 50%, #FFF0EB 75%, #FFE5DC 100%)",
            }}
        >
            <div className="mb-8">
                <h2 className="lg:text-4xl text-5xl font-bold text-[#1F2937] mb-4 lg:tracking-[-1px]">
                    DealFi, Moving At The
                    <br />
                    <span className="text-[#FF6B35]">Speed Of Social</span>
                </h2>
                <p className="text-[#5A6C7D] xl:text-xs text-base font-bold">JSONJuiceAPI: Powering DealFi</p>
            </div>

            <div className="flex justify-center gap-4 mb-6 w-full">
                <Button
                    variant="outline"
                    className="rounded-xl h-10 xl:!text-xs !text-base !px-4 xl:w-1/5 lg:w-1/2 md:w-1/5 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35]/10 font-bold"
                    onClick={() => router.push("/")}
                >
                    Get Started
                </Button>
                {
                    setShowWalletDashboard && (
                        <Button
                            onClick={() => setShowWalletDashboard?.(true)}
                            className="rounded-xl h-10 xl:!text-xs !text-base !px-4 xl:w-1/6 lg:w-1/2 md:w-1/5 bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white font-bold"
                        >
                            Pricing
                        </Button>
                    )
                }
            </div>

            <div className="text-[#5A6C7D] mb-4">
                <p className="xl:text-[12px] text-base font-medium">Login with</p>
            </div>

            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={() => login({
                        loginMethods: ["google"],
                    })}
                    className="xl:size-16 lg:size-12 size-10 border border-[#FF6B35]/30 rounded-full flex items-center justify-center hover:bg-[#FF6B35]/10 transition-colors cursor-pointer"
                >
                    <FcGoogle className="xl:size-7 lg:size-5 size-4" />
                </button>
                <button
                    type="button"
                    onClick={() => login({
                        loginMethods: ["email"],
                    })}
                    className="xl:size-16 lg:size-12 size-10 border border-[#FF6B35]/30 rounded-full flex items-center justify-center hover:bg-[#FF6B35]/10 transition-colors cursor-pointer"
                >
                    <MailBox className="xl:size-7 lg:size-5 size-4" />
                </button>
            </div>
        </div>
    );
};

export default DealFi;
