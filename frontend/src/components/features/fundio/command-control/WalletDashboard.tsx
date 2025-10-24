import { ActionIcon, CopyButton, Tooltip } from "@mantine/core";
import { IoMdCheckmark } from "react-icons/io";
import { PiSealCheckFill } from "react-icons/pi";
import { RxCopy } from "react-icons/rx";

type WalletCardProps = {
    name: string;
    address: string;
    bagBalance: string;
    tokenizedHoldings: string;
    depositAsset: string;
};

function WalletCard({ name, address, bagBalance, tokenizedHoldings, depositAsset }: WalletCardProps) {
    return (
        <div className="bg-gradient-to-br from-[#C2FF94]/14 to-[#7FD33E]/14 p-px rounded-xl">
            <div className="bg-c3-background hover:bg-gradient-to-tr from-c3-background via-secondary/14 to-primary/30 p-4 rounded-xl">
                <div className="flex gap-4 pr-8">
                    <PiSealCheckFill className="shrink-0 size-5 text-[#09B285] mt-1" />
                    <div className="w-full">
                        <div className="flex flex-col gap-1 mb-2">
                            <h3 className="text-white font-semibold xl:text-xl text-3xl">{name}</h3>
                            <div className="flex items-center gap-2">
                                <span className="xl:text-xs text-base text-white">
                                    <span className="text-white/80 font-light">Address:</span>
                                    {" "}
                                    {address.slice(0, 6)}
                                    ...
                                    {address.slice(-6)}
                                </span>

                                <CopyButton value={address} timeout={2000}>
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

                        <div>
                            <p className="xl:text-xs text-base text-white/80 font-light mb-1">Bag Balance</p>
                            <p className="xl:text-lg text-2xl font-light text-white">{bagBalance}</p>
                        </div>

                        <div className="my-4 h-[1px] bg-gradient-to-r from-transparent via-[#BDBF1B]/16 to-transparent" />

                        <div className="flex justify-between gap-4 mt-4 mb-2">
                            <div>
                                <p className="xl:text-xs text-base text-white/80 font-light mb-1">Tokenized Asset Holdings</p>
                                <p className="xl:text-lg text-2xl font-light text-white">{tokenizedHoldings}</p>
                            </div>
                            <div className="text-right">
                                <p className="xl:text-xs text-base text-white/80 font-light mb-1">Deposit Asset</p>
                                <p className="xl:text-lg text-2xl font-light text-white">{depositAsset}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function WalletDashboard() {
    const wallets = [
        {
            name: "BASE Smart Wallet",
            address: "0x5f274a928a013a6E804C697ab063016D71eBf5a5",
            bagBalance: "$450.00",
            tokenizedHoldings: "$150.00",
            depositAsset: "$2000.00",
        },
        {
            name: "Privy Wallet",
            address: "0x5f274a928a013a6E804C697ab063016D71eBf5a5",
            bagBalance: "$450.00",
            tokenizedHoldings: "$150.00",
            depositAsset: "$2000.00",
        },
        {
            name: "Palmera Safe",
            address: "0x5f274a928a013a6E804C697ab063016D71eBf5a5",
            bagBalance: "$450.00",
            tokenizedHoldings: "$150.00",
            depositAsset: "$2000.00",
        },
        {
            name: "Privy Wallet",
            address: "0x5f274a928a013a6E804C697ab063016D71eBf5a5",
            bagBalance: "$450.00",
            tokenizedHoldings: "$150.00",
            depositAsset: "$2000.00",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            {wallets.map((wallet, index) => (
                <WalletCard key={index} {...wallet} />
            ))}
        </div>
    );
}
