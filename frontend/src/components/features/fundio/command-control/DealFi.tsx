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
            className="h-full p-8 rounded-2xl relative overflow-hidden flex flex-col justify-center items-center text-center"
            style={{
                background: "linear-gradient(135deg, #D4FF8D 9%, #E2ED97 26%, #9DD687 42%, #B8E2B0 77%, #EEF1C9 94%)",
            }}
        >
            {/* <button
                type="button"
                onClick={() => setShowWalletDashboard(true)}
                className="absolute top-4 right-4 text-black hover:text-black/60 cursor-pointer"
            >
                <IoIosClose className="size-8" />
            </button> */}

            <div className="mb-8">
                <h2 className="lg:text-4xl text-5xl font-bold text-dark-green mb-4 lg:tracking-[-1px]">
                    DealFi, Moving At The
                    <br />
                    <span className="text-dark-green">Speed Of Social</span>
                </h2>
                <p className="text-dark-green xl:text-xs text-base font-bold">JSONJuiceAPI: Powering DealFi</p>
            </div>

            <div className="flex justify-center gap-4 mb-6 w-full">
                <Button
                    variant="outline"
                    className="rounded-xl h-10 xl:!text-xs !text-base !px-4 xl:w-1/5 lg:w-1/2 md:w-1/5 border-dark-green text-dark-green font-bold"
                    onClick={() => router.push("/")}
                >
                    Get Started
                </Button>
                {
                    setShowWalletDashboard && (
                        <Button
                            onClick={() => setShowWalletDashboard?.(true)}
                            className="rounded-xl h-10 xl:!text-xs !text-base !px-4 xl:w-1/6 lg:w-1/2 md:w-1/5 bg-dark-green text-white font-bold"
                        >
                            Pricing
                        </Button>
                    )
                }
            </div>

            <div className="text-black/40 mb-4">
                <p className="xl:text-[12px] text-base font-medium">Login with</p>
            </div>

            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={() => login({
                        loginMethods: ["google"],
                    })}
                    className="xl:size-16 lg:size-12 size-10 border border-dark-green/30 rounded-full flex items-center justify-center hover:bg-gray-100/20 transition-colors cursor-pointer"
                >
                    <FcGoogle className="xl:size-7 lg:size-5 size-4" />
                </button>
                <button
                    type="button"
                    onClick={() => login({
                        loginMethods: ["email"],
                    })}
                    className="xl:size-16 lg:size-12 size-10 border border-dark-green/30 rounded-full flex items-center justify-center hover:bg-gray-100/20 transition-colors cursor-pointer"
                >
                    <MailBox className="xl:size-7 lg:size-5 size-4" />
                </button>
            </div>
        </div>
    );
};

export default DealFi;
