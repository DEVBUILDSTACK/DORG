import Link from "next/link";
import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { LuMail, LuPhoneCall } from "react-icons/lu";

import Footer_BankIcon from "@/assets/svg/Footer_BankIcon";
import Footer_DiscordIcon from "@/assets/svg/Footer_DiscordIcon";
import Footer_TelegramIcon from "@/assets/svg/Footer_TelegramIcon";
import Footer_XIcon from "@/assets/svg/Footer_XIcon";
import Logo from "@/assets/svg/Logo";

const Footer: React.FC = () => {
    return (
        <footer className="container mx-auto mt-24 w-full h-full overflow-hidden relative">

            <div
                className="absolute -top-50 left-0 -z-10 w-full h-150 bg-no-repeat bg-[length:100%_100%]"
                style={{
                    background: "radial-gradient(closest-side, rgba(43, 89, 92, 0.1), rgba(97, 148, 61, 0.1), transparent)",
                }}
            />

            <div className="flex flex-col items-center justify-center w-full h-full px-4 md:px-8 lg:px-16 mt-10 lg:mt-20 mb-10">
                <hr className="hidden lg:block w-full h-[1px] bg-white/10 border-none" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center w-full h-full">
                    <div className="flex flex-col md:col-span-2 lg:col-span-1 h-full items-start justify-center gap-5 lg:border-r border-white/10">
                        <Link href="/" className="flex-shrink-0 cursor-pointer">
                            <Logo color1="#ffffff" color2="#ffffff" width={100} className="text-white" />
                        </Link>

                        <div className="flex items-center justify-center gap-5">
                            <Link href="#" className="flex items-center justify-center gap-5 rounded-full cursor-pointer border border-secondary/20 p-3 hover:scale-110 transition-all duration-300">
                                <Footer_BankIcon />
                            </Link>
                            <Link href="#" className="flex items-center shrink-0 justify-center gap-5 rounded-full cursor-pointer border border-secondary/20 p-3 hover:scale-110 transition-all duration-300">
                                <Footer_XIcon />
                            </Link>
                            <Link href="#" className="flex items-center shrink-0 justify-center gap-5 rounded-full cursor-pointer border border-secondary/20 p-3 hover:scale-110 transition-all duration-300">
                                <Footer_DiscordIcon />
                            </Link>
                            <Link href="#" className="flex items-center shrink-0 justify-center gap-5 rounded-full cursor-pointer border border-secondary/20 p-3 hover:scale-110 transition-all duration-300">
                                <Footer_TelegramIcon />
                            </Link>

                        </div>
                    </div>

                    <hr className="block md:hidden w-full h-[1px] bg-white/10 border-none mt-5" />

                    <div className="flex flex-col h-full w-full items-start justify-center gap-5 md:border-r border-white/10 py-3 md:p-5 ">
                        <Link href="#" className="text-lg md:text-sm text-white cursor-pointer hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors duration-300">
                            <p>Cloud Desk</p>
                        </Link>
                        <Link href="#" className="text-lg md:text-sm text-white cursor-pointer hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors duration-300">
                            <p>Knowledge Base</p>
                        </Link>
                        <Link href="#" className="text-lg md:text-sm text-white cursor-pointer hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors duration-300">
                            <p>Developer</p>
                        </Link>
                        <Link href="#" className="text-lg md:text-sm text-white cursor-pointer hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors duration-300">
                            <p>Leaderboard Share2Earn Rewards</p>
                        </Link>
                        <Link href="/" className="text-lg md:text-sm text-white cursor-pointer hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors duration-300">
                            <p>Sura Guidance</p>
                        </Link>
                    </div>

                    <div className="flex flex-col h-full items-start justify-center gap-5 py-3 md:p-5">
                        <div className="flex items-center gap-5 ">
                            <div className="flex items-center gap-5 rounded-full cursor-pointer border border-secondary/20 p-3 hover:scale-110 transition-all duration-300">
                                <IoLocationOutline color="#C7E79D" />
                            </div>
                            <Link href="#" className="w-fit text-lg md:text-sm text-white cursor-pointer hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors duration-300">
                                <p>506 Spring Street #13308 Los Angeles, California 90013</p>
                            </Link>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="flex items-center gap-5 rounded-full cursor-pointer border border-secondary/20 p-3 hover:scale-110 transition-all duration-300">
                                <LuPhoneCall color="#C7E79D" />
                            </div>
                            <Link href="#" className="w-fit text-lg md:text-sm text-white cursor-pointer hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors duration-300">
                                <p>+1 1234567890</p>
                            </Link>
                        </div>

                        <div className="flex items-center gap-5">
                            <div className="flex items-center gap-5  rounded-full cursor-pointer border border-secondary/20 p-3 hover:scale-110 transition-all duration-300">
                                <LuMail color="#C7E79D" />
                            </div>
                            <div className="flex flex-col justify-between">
                                <Link href="#" className="w-fit text-lg md:text-sm text-white cursor-pointer hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors duration-300">
                                    <p>Desk@jsonjuiceapi.com</p>
                                </Link>
                                <Link href="#" className="w-fit text-lg md:text-sm text-white cursor-pointer hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors duration-300">
                                    <p>PartnerAdmin@jsonjuiceapi.com</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="w-full h-[1px] bg-white/10 border-none" />

                <div className="grid grid-cols-1 md:grid-cols-3 items-start justify-center w-full h-full">
                    <div className="flex h-full items-center justify-center md:justify-start gap-2 md:border-r border-white/3 pt-10">
                        <Link href="#" className="text-xl md:text-sm text-white/50 cursor-pointer hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors duration-300">
                            <p>Terms </p>
                        </Link>
                        <span className="text-white/50">|</span>
                        <Link href="#" className="text-xl md:text-sm text-white/50 cursor-pointer hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors duration-300">
                            <p>Privacy Policy</p>
                        </Link>
                    </div>

                    <div className="hidden lg:flex flex-col h-full items-center justify-center gap-5 md:border-r border-white/3 p-5"></div>

                    <div className="flex flex-col md:col-span-2 lg:col-span-1 h-full w-full md:items-end items-center justify-end gap-5 cursor-default lg:pt-10">
                        <p className="text-xl md:text-base text-white/50 ">
                            ©
                            {new Date().getFullYear()}
                            {" "}
                            Fundio. All rights reserved
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
