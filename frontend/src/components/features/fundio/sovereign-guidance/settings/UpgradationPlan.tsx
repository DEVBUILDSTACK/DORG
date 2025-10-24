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
        buttonStyle: "bg-white text-black hover:bg-gray-100",
    },
    {
        name: "One-Day Pass",
        price: "$2.99",
        period: "24 hours Access",
        isPopular: true,
        features: ["Full Premium Access", "Risk-Free Trial", "Instant Activation"],
        buttonText: "Get One-Day Pass",
        buttonStyle: "bg-[#7FD33E] text-black hover:bg-[#6BC42E]",
    },
    {
        name: "Premium Pro",
        price: "$19.99",
        period: "per month",
        features: ["All Basic Features", "Advanced Analytics", "24/7 Support"],
        buttonText: "Choose Pro",
        buttonStyle: "bg-white text-black hover:bg-gray-100",
    },
];

const UpgradationPlan = () => {
    const router = useRouter();

    return (
        <div className="relative rounded-2xl max-w-7xl w-full overflow-hidden">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full h-10 w-3/5 shadow-xl shadow-white blur-[150px]" />

            {/* Background Sparkles */}
            <div className="absolute top-1/5 left-1/6"><Star width={16} /></div>
            <div className="absolute top-8 right-1/5"><Star width={16} /></div>
            <div className="absolute top-6 left-1/3"><Star width={16} /></div>
            <div className="absolute top-12 right-1/2"><Star width={16} /></div>
            <div className="absolute top-2/5 left-1/5"><Star width={16} /></div>
            <div className="absolute top-1/3 left-1/4"><Star width={16} /></div>
            <div className="absolute top-1/4 right-1/5"><Star width={10} /></div>
            <div className="absolute top-1/4 right-1/3"><Star width={10} /></div>
            <div className="relative z-10">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="absolute top-2 right-2 z-10 flex items-center justify-center bg-white/4 hover:bg-white/10 border border-white/20 rounded transition-colors cursor-pointer xl:size-8 size-6"
                >
                    <IoClose className="size-4" />
                </button>

                <div className="p-4 md:p-6 xl:p-12">
                    <div className="xl:ml-56 md:ml-28 flex md:flex-row flex-col items-center justify-center xl:mt-8 mt-6">
                        <div>
                            <div className="flex flex-col items-center justify-center gap-6 text-center mb-8">
                                <h1 className="xl:text-3xl text-5xl font-bold text-white">Unlock Your One-Day Pass</h1>
                                <p className="text-white xl:text-xs text-base font-light max-w-2xl mx-auto">Experience premium, risk-free. Just one tap away.</p>
                            </div>

                            <div className="flex flex-row gap-4 justify-center mb-12">
                                <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-px">
                                    <Button
                                        className="rounded-xl !h-10 xl:!text-xs !px-6 !text-base w-fit bg-c3-background"
                                        labelClass="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-normal"
                                    >
                                        Activate One-Day Pass
                                    </Button>
                                </div>

                                <Button
                                    className="rounded-xl !h-10 xl:!text-xs !px-6 !text-base w-fit"
                                    labelClass="font-normal"
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
                                    // className={cn(
                                    //   "relative p-6 rounded-xl border transition-all hover:scale-105",
                                    //   plan.isPopular
                                    //     ? "border-[#7FD33E] bg-gradient-to-br from-[#1D1F1B] to-[#272A24] lg:scale-105"
                                    //     : "border-gray-700 bg-[#1D1F1B] hover:border-gray-600",
                                    // )}
                                    className={cn("rounded-2xl overflow-hidden", plan.isPopular && "bg-gradient-to-br from-primary to-secondary p-px")}
                                >
                                    <div className={cn("flex flex-col p-4 rounded-2xl h-full", plan.isPopular ? "bg-[#232428]" : "bg-[#232428]/25 backdrop-blur-3xl")}>
                                        <div className="mb-6">
                                            <h3 className="xl:text-xs text-base font-light text-white mb-2">{plan.name}</h3>
                                            <div>
                                                <span className="xl:text-xl text-2xl font-bold text-white">
                                                    {plan.price}
                                                    /
                                                </span>
                                                <span className="text-white lg:text-[11px] text-base">{plan.period}</span>
                                            </div>
                                        </div>

                                        <ul className="space-y-3 mb-8 list-disc list-inside lg:text-[11px] text-base font-light">
                                            {plan.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className="text-white">
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-auto">
                                            <Button
                                                className={cn("rounded-lg !h-8 xl:!text-xs !px-6 !text-base w-full", plan.isPopular ? "" : "bg-white text-black")}
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
