"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";

import { HappyWoman } from "@/assets/images";
import Star from "@/assets/svg/Star";
import Button from "@/components/ui/button/Button";
import { cn } from "@/lib/utils";

type PricingPlan = {
    name: string;
    price: string;
    period: string;
    isPopular?: boolean;
    features: string[];
    buttonText: string;
    buttonStyle: string;
};

const plans: PricingPlan[] = [
    {
        name: "Premium Basic",
        price: "$9.99",
        period: "per month",
        features: ["Access to premium Features", "Priority Support", "Monthly Updates"],
        buttonText: "Choose Basic",
        buttonStyle: "bg-white text-[#1F2937] hover:bg-[#FFE5DC]",
    },
    {
        name: "One-Day Pass",
        price: "$2.99",
        period: "24 hours Access",
        isPopular: true,
        features: ["Full Premium Access", "Risk-Free Trial", "Instant Activation"],
        buttonText: "Get One-Day Pass",
        buttonStyle: "bg-[#FF6B35] text-white hover:bg-[#FF8C5A]",
    },
    {
        name: "Premium Pro",
        price: "$19.99",
        period: "per month",
        features: ["All Basic Features", "Advanced Analytics", "24/7 Support"],
        buttonText: "Choose Pro",
        buttonStyle: "bg-white text-[#1F2937] hover:bg-[#FFE5DC]",
    },
];

const UpgradationPlan = () => {
    const router = useRouter();

    return (
        <div className="relative rounded-2xl max-w-7xl w-full overflow-hidden bg-gradient-to-br from-[#FFE5DC] to-white">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#FF6B35] rounded-full h-10 w-3/5 shadow-xl shadow-orange-300 blur-[150px]" />

            {/* Background Sparkles */}
            <div className="absolute top-1/5 left-1/6"><Star width={16} className="text-[#FF6B35]" /></div>
            <div className="absolute top-8 right-1/5"><Star width={16} className="text-[#FF6B35]" /></div>
            <div className="absolute top-6 left-1/3"><Star width={16} className="text-[#FF6B35]" /></div>
            <div className="absolute top-12 right-1/2"><Star width={16} className="text-[#FF6B35]" /></div>
            <div className="absolute top-2/5 left-1/5"><Star width={16} className="text-[#FF6B35]" /></div>
            <div className="absolute top-1/3 left-1/4"><Star width={16} className="text-[#FF6B35]" /></div>
            <div className="absolute top-1/4 right-1/5"><Star width={10} className="text-[#FF6B35]" /></div>
            <div className="absolute top-1/4 right-1/3"><Star width={10} className="text-[#FF6B35]" /></div>
            <div className="relative z-10">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="absolute top-2 right-2 z-10 flex items-center justify-center bg-white hover:bg-[#FFE5DC] border border-gray-200 rounded transition-colors cursor-pointer xl:size-8 size-6"
                >
                    <IoClose className="size-4 text-[#1F2937]" />
                </button>

                <div className="p-4 md:p-6 xl:p-12">
                    <div className="xl:ml-56 md:ml-28 flex md:flex-row flex-col items-center justify-center xl:mt-8 mt-6">
                        <div>
                            <div className="flex flex-col items-center justify-center gap-6 text-center mb-8">
                                <h1 className="xl:text-3xl text-5xl font-bold text-[#1F2937]">Unlock Your One-Day Pass</h1>
                                <p className="text-[#5A6C7D] xl:text-xs text-base font-light max-w-2xl mx-auto">Experience premium, risk-free. Just one tap away.</p>
                            </div>

                            <div className="flex flex-row gap-4 justify-center mb-12">
                                <div className="bg-gradient-to-r from-[#FF6B35] to-[#FFE5DC] rounded-xl p-px">
                                    <Button
                                        className="rounded-xl !h-10 xl:!text-xs !px-6 !text-base w-fit bg-white hover:bg-[#FFE5DC]"
                                        labelClass="bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] bg-clip-text text-transparent font-semibold"
                                    >
                                        Activate One-Day Pass
                                    </Button>
                                </div>

                                <Button
                                    className="rounded-xl !h-10 xl:!text-xs !px-6 !text-base w-fit bg-[#FF6B35] hover:bg-[#FF8C5A]"
                                    labelClass="font-normal text-white"
                                >
                                    See Premium Plans
                                </Button>
                            </div>
                        </div>

                        <div className="md:-mb-10 md:w-1/4 w-1/2">
                            <Image
                                src={HappyWoman}
                                alt="Happy Woman"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xl:w-2/3 w-full">
                            {plans.map((plan, index) => (
                                <div
                                    key={index}
                                    className={cn("rounded-2xl overflow-hidden", plan.isPopular && "bg-gradient-to-br from-[#FF6B35] to-[#FFE5DC] p-px")}
                                >
                                    <div className={cn("flex flex-col p-4 rounded-2xl h-full", plan.isPopular ? "bg-white" : "bg-white/80 backdrop-blur-sm border border-gray-200")}>
                                        <div className="mb-6">
                                            <h3 className="xl:text-xs text-base font-semibold text-[#1F2937] mb-2">{plan.name}</h3>
                                            <div>
                                                <span className="xl:text-xl text-2xl font-bold text-[#FF6B35]">
                                                    {plan.price}
                                                    /
                                                </span>
                                                <span className="text-[#5A6C7D] lg:text-[11px] text-base">{plan.period}</span>
                                            </div>
                                        </div>

                                        <ul className="space-y-3 mb-8 list-disc list-inside lg:text-[11px] text-base font-light">
                                            {plan.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className="text-[#1F2937]">
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-auto">
                                            <Button
                                                className={cn("rounded-lg !h-8 xl:!text-xs !px-6 !text-base w-full", plan.isPopular ? "bg-[#FF6B35] hover:bg-[#FF8C5A]" : "bg-white border border-[#FF6B35] text-[#FF6B35] hover:bg-[#FFE5DC]")}
                                                labelClass="font-normal lg:text-[11px] xl:text-xs text-base"
                                            >
                                                {plan.buttonText}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpgradationPlan;
