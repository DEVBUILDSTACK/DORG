import { useLogout, usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";

import { NumberBg } from "@/assets/images";
import Logo from "@/assets/svg/Logo";
import Button from "@/components/ui/button/Button";
import { useAuthLogin } from "@/hooks/useAuthLogin";
import { useWallet } from "@/hooks/useWallet";

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
    const [dialogPosition, setDialogPosition] = useState({ top: 10, right: 30 });
    const desktopAvatarRef = useRef<HTMLDivElement>(null);
    const mobileAvatarRef = useRef<HTMLDivElement>(null);
    const { user, authenticated, ready } = usePrivy();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const { login } = useAuthLogin();
    const { connectWallet } = useWallet();

    const { logout } = useLogout({
        onSuccess: () => {
            disconnect();
        },
    });

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleAvatarClick = (e: React.MouseEvent, isMobile: boolean = false) => {
        e.stopPropagation();
        const avatarRef = isMobile ? mobileAvatarRef : desktopAvatarRef;

        if (avatarRef?.current && typeof window !== 'undefined') {
            const rect = avatarRef.current.getBoundingClientRect();
            setDialogPosition({
                top: rect.bottom,
                right: window.innerWidth - rect.right,
            });
        }
        setIsProfileDialogOpen(true);
    };

    const closeProfileDialog = () => {
        setIsProfileDialogOpen(false);
    };

    return (
        <>
            <nav className="sticky container mx-auto top-0 gap-1 z-30 w-full grid grid-cols-3 lg:grid-cols-4 items-center px-4 md:px-8 lg:px-16 py-3 bg-white/0.5 backdrop-blur-sm">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0 cursor-pointer">
                    <Logo width={120} />
                </Link>

                {/* Desktop Navigation Links */}
                <div className="col-span-1 lg:col-span-2 flex justify-center">
                    <div className="hidden lg:flex gap-5 items-center bg-white/10 backdrop-blur-sm rounded-full h-full px-6 xl:px-10 py-4 xl:py-6 w-fit">
                        <Link
                            href="/"
                            className="text-xl md:text-lg lg:text-sm text-white/80 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors duration-300 whitespace-nowrap"
                        >
                            Ventures
                        </Link>
                        <Link
                            href="/insights"
                            className="text-xl md:text-lg lg:text-sm text-white/80 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors duration-300 whitespace-nowrap"
                        >
                            Insights
                        </Link>
                        <Link
                            href="/jrdp-api"
                            className="text-xl md:text-lg lg:text-sm text-white/80 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors duration-300 whitespace-nowrap"
                        >
                            JDRP API
                        </Link>
                        <Link
                            href="/deal-fi"
                            className="text-xl md:text-lg lg:text-sm text-white/80 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors duration-300 whitespace-nowrap"
                        >
                            DealFi
                        </Link>
                        <Link
                            href="/platform"
                            className="text-xl md:text-lg lg:text-sm text-white/80 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors duration-300 whitespace-nowrap"
                        >
                            Platform
                        </Link>
                        <Link
                            href="/blogs"
                            className="text-xl md:text-lg lg:text-sm text-white/80 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors duration-300 whitespace-nowrap"
                        >
                            Blogs
                        </Link>
                    </div>
                </div>

                {/* Desktop Buttons */}
                {
                    ready && (
                        <>
                            <div className="hidden lg:flex gap-3 lg:gap-3 items-center justify-end">
                                {
                                    authenticated
                                        ? (
                                                <>
                                                    {(!address || !isConnected)
                                                        && (
                                                            <>
                                                                <Button
                                                                    variant="primary"
                                                                    className="w-fit"
                                                                    onClick={() => connectWallet()}
                                                                >
                                                                    <span className="text-dark-green">Connect Wallet</span>
                                                                </Button>
                                                            </>
                                                        )}

                                                    <div
                                                        ref={desktopAvatarRef}
                                                        className="z-[100] flex w-13 h-13 shrink-0 justify-center py-2 cursor-pointer items-center"
                                                        style={{
                                                            backgroundImage: `url(${NumberBg.src})`,
                                                            backgroundSize: "contain",
                                                            backgroundPosition: "center",
                                                            backgroundRepeat: "no-repeat",
                                                        }}
                                                        onClick={e => handleAvatarClick(e, false)}
                                                    >
                                                        <p className="text-sm font-medium">
                                                            {user?.google
                                                                ? (user?.google?.name)?.split(" ")[0].slice(0, 1).toUpperCase()
                                                                : user?.email?.address?.slice(0, 1).toUpperCase()}
                                                        </p>
                                                    </div>

                                                </>
                                            )
                                        : (
                                                <div className="flex w-full h-full justify-end items-end">
                                                    <div className="relative bg-gradient-to-r from-primary to-secondary rounded-full p-[2px] before:w-full before:h-35 before:bg-gradient-to-b before:from-background/7 before:from-35% before:via-background before:to-background/7 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:animate-rotate overflow-hidden">
                                                        <Button className="bg-background" onClick={() => login({ loginMethods: ["google", "apple", "email"] })}>
                                                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent whitespace-nowrap">
                                                                Get Started
                                                            </span>
                                                        </Button>
                                                    </div>
                                                </div>
                                            // <div className="flex cursor-pointer font-semibold rounded-full bg-gradient-to-r from-primary to-secondary p-[2px] shadow-lg items-center justify-center">
                                            //     <Button variant="outline" className="bg-background" onClick={() => login({ loginMethods: ["google", "apple", "email"] })}>
                                            //         <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent whitespace-nowrap">
                                            //             Get Started
                                            //         </span>
                                            //     </Button>
                                            // </div>
                                            )
                                }
                            </div>

                            <div className="flex items-center justify-end gap-3">
                                {authenticated && (
                                    <div
                                        ref={mobileAvatarRef}
                                        className="z-[100] flex w-9 h-9 lg:hidden shrink-0 items-center justify-center py-2 cursor-pointer"
                                        style={{
                                            backgroundImage: `url(${NumberBg.src})`,
                                            backgroundSize: "contain",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                        }}
                                        onClick={e => handleAvatarClick(e, true)}
                                    >
                                        <p className="text-sm font-medium">
                                            {user?.google
                                                ? (user?.google?.name)?.split(" ")[0].slice(0, 1).toUpperCase()
                                                : user?.email?.address?.slice(0, 1).toUpperCase()}
                                        </p>
                                    </div>
                                )}

                                {/* Mobile Menu Button */}
                                <button
                                    type="button"
                                    className="lg:hidden flex flex-col gap-1 p-2 w-fit items-end"
                                    onClick={toggleMobileMenu}
                                    aria-label="Toggle mobile menu"
                                >
                                    <div className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}></div>
                                    <div className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}></div>
                                    <div className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></div>
                                </button>
                            </div>
                        </>
                    )
                }
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300  ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>

                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleMobileMenu}></div>
                {/* Mobile Menu Content */}
                <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-gray-900 to-black border-l border-white/10 transform transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                    {/* Mobile Navigation Links */}
                    <div className="flex flex-col gap-6 p-8 w-full ">
                        <button
                            type="button"
                            className="flex flex-col gap-1 p-2 justify-end items-end"
                            onClick={toggleMobileMenu}
                            aria-label="Toggle mobile menu"
                        >
                            <div className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}></div>
                            <div className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}></div>
                            <div className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></div>
                        </button>

                        <Link
                            href="/"
                            className="text-xl md:text-lg text-white/80 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors duration-300 py-2"
                            onClick={toggleMobileMenu}
                        >
                            Ventures
                        </Link>
                        <Link
                            href="/insights"
                            className="text-xl md:text-lg text-white/80 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors duration-300 py-2"
                            onClick={toggleMobileMenu}
                        >
                            Insights
                        </Link>
                        <Link
                            href="/jdrp-api"
                            className="text-xl md:text-lg text-white/80 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors duration-300 py-2"
                            onClick={toggleMobileMenu}
                        >
                            JDRP API
                        </Link>
                        <Link
                            href="/deal-fi"
                            className="text-xl md:text-lg text-white/80 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors duration-300 py-2"
                            onClick={toggleMobileMenu}
                        >
                            DealFi
                        </Link>
                        <Link
                            href="/platform"
                            className="text-xl md:text-lg text-white/80 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors duration-300 py-2"
                            onClick={toggleMobileMenu}
                        >
                            Platform
                        </Link>
                        <Link
                            href="/blogs"
                            className="text-xl md:text-lg text-white/80 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors duration-300 py-2"
                            onClick={toggleMobileMenu}
                        >
                            Blogs
                        </Link>

                        {/* Mobile CTA Buttons */}
                        {
                            ready && (
                                <div className="flex flex-col gap-4 mt-8">

                                    {
                                        authenticated
                                            ? (
                                                    <>
                                                        <div className="flex cursor-pointer font-semibold rounded-full bg-gradient-to-r from-primary to-secondary p-[2px] shadow-lg items-center justify-center w-full">
                                                            <Button variant="outline" className="bg-background !w-full " onClick={() => logout()}>
                                                                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent whitespace-nowrap">
                                                                    Log out
                                                                </span>
                                                            </Button>
                                                        </div>
                                                        {(!address || !isConnected)
                                                            && (
                                                                <>
                                                                    <Button
                                                                        variant="primary"
                                                                        className="w-full"
                                                                        onClick={() => connectWallet()}
                                                                    >
                                                                        <span className="text-dark-green">Connect Wallet</span>
                                                                    </Button>
                                                                </>
                                                            )}
                                                    </>
                                                )
                                            : (
                                                    <div className="flex cursor-pointer font-semibold rounded-full bg-gradient-to-r from-primary to-secondary p-[2px] shadow-lg items-center justify-center">
                                                        <Button variant="outline" className="bg-black w-full" onClick={() => login({ loginMethods: ["google", "apple", "email"] })}>
                                                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                                                Get Started
                                                            </span>
                                                        </Button>
                                                    </div>
                                                )
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

        </>
    );
};

export default Navbar;
