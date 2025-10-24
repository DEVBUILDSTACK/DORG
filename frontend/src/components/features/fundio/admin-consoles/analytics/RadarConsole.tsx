"use client";
import { ActionIcon, CopyButton, Tooltip } from "@mantine/core";
import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import { MdAdd, MdOutlineArrowOutward } from "react-icons/md";
import { PiSealCheckFill } from "react-icons/pi";
import { RxCopy } from "react-icons/rx";

import Button from "@/components/ui/button/Button";

const wallets = [
    { id: "1", name: "Smart Wallet", address: "0xa9639a2378138f2739299c0e354d398544010200", balance: "$450.00" },
    { id: "2", name: "Privy Wallet", address: "0x4295789d5958380d8953216337b099e59b576a50", balance: "$559.00" },
    { id: "3", name: "Palmera Safe", address: "0x639a2378138f2739299c0e354d398544010200000", balance: "$429.00" },
    { id: "4", name: "Meta Mask", address: "0x4295789d5958380d8953216337b099e59b576a500000", balance: "$1450.00" },
];

const RadarConsole: React.FC = () => {
    return (
        <div className="bg-fundio-sidebar p-4 rounded-2xl h-full flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-3">
                <h3 className="lg:text-lg text-2xl text-white/62">Defi Treasury Radar Console</h3>
            </div>

            <div className="flex flex-col min-h-0 h-full">
                <div className="flex-1 overflow-y-auto">
                    {wallets.map((wallet, idx) => (
                        <React.Fragment key={wallet.id}>
                            <div className="flex items-center justify-between p-3 rounded-lg">
                                <div className="flex gap-3">
                                    <PiSealCheckFill className="shrink-0 size-5 text-[#09B285] mt-1" />
                                    <div>
                                        <p className="text-white font-medium text-lg">{wallet.name}</p>
                                        {/* <p className="text-xs text-gray-400">Address: {wallet.address}</p> */}
                                        <div className="flex items-center gap-2">
                                            <span className="xl:text-xs text-base text-white">
                                                <span className="text-white/80 font-light">Address:</span>
                                                {" "}
                                                {wallet.address.slice(0, 4)}
                                                ...
                                                {wallet.address.slice(-4)}
                                            </span>

                                            <CopyButton value={wallet.address} timeout={2000}>
                                                {({ copied, copy }) => (
                                                    <Tooltip classNames={{ tooltip: "text-xs" }} label={copied ? "Copied" : "Copy"} withArrow position="right">
                                                        <ActionIcon classNames={{ icon: "size-3" }} color={copied ? "teal" : "gray"} variant="subtle" onClick={copy}>
                                                            {copied ? <IoMdCheckmark /> : <RxCopy />}
                                                        </ActionIcon>
                                                    </Tooltip>
                                                )}
                                            </CopyButton>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="xl:text-xs text-base text-white/80 font-light">Balance</p>
                                    <p className="xl:text-base text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold lg:tracking-[-1px]">{wallet.balance}</p>
                                </div>
                            </div>
                            {idx < wallets.length - 1 && (
                                <div className="h-[1px] bg-gradient-to-r from-transparent via-[#BDBF1B]/16 to-transparent" />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <div className="flex justify-between gap-2 pt-4 mt-auto">
                    <div className="flex items-center xl:justify-center lg:w-3/5 md:w-full w-2/5">
                        <Button
                            className="rounded-xl !h-10 xl:!text-xs !text-base !px-4 xl:!w-full md:!w-2/5"
                            labelClass="flex items-center justify-between gap-3 !w-full "
                        >
                            View Details
                            <MdOutlineArrowOutward className="shrink-0 size-5" />
                        </Button>
                    </div>
                    <div className="flex items-center xl:justify-center justify-end lg:w-2/5 md:w-full w-2/5">
                        <Button
                            variant="light"
                            labelClass="flex items-center justify-between gap-3 !w-full bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-semibold"
                            className="rounded-xl !h-10 xl:!text-xs !text-base !px-4 xl:!w-full lg:!w-1/2 md:!w-2/5 bg-[#252525]"
                        >
                            <MdAdd className="shrink-0 size-5.5 text-primary" />
                            Fund Wallet
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RadarConsole;
