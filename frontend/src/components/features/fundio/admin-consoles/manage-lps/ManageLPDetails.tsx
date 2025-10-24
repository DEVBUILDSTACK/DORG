"use client";

import { Divider, Loader, Modal, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Trash } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { LiaArrowLeftSolid } from "react-icons/lia";
import { encodeFunctionData, parseUnits } from "viem";
import { useAccount, usePublicClient, useSwitchChain, useWalletClient } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";

import { SectionSimulateCapitalBg } from "@/assets/images";
import InstallmentsTable from "@/components/features/fundio/admin-consoles/manage-lps/InstallmentsTable";
import YieldTable from "@/components/features/fundio/admin-consoles/manage-lps/YieldTable";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import ConfirmationModal from "@/components/ui/modal/ConfirmationModal";
import Tabs from "@/components/ui/tabs/Tabs";
import { useWallet } from "@/hooks/useWallet";
import { getUser } from "@/lib/api/auth/auth";
import { deleteLp, getLPById, getLPInstallmentById, getLPYieldById, installment, safeUpdate } from "@/lib/api/fundio/manage-lps";
import { createSafeWallet } from "@/lib/api/fundio/safe";
import { getCurrentCohort } from "@/lib/api/landing-page/cohort";
import { isProduction, QUERY_KEYS, USDC_ADDRESSES } from "@/lib/constants";
import { QUERY_KEY } from "@/lib/landing-page/constants";
import queryClient from "@/lib/query.config";
import { cn, formatNumber } from "@/lib/utils";
import useFLPStore from "@/store/useFLPStore";

const LabelValueBlock: React.FC<{
  label: string;
  value: string[] | string;
  labelClassName?: string;
  valueClassName?: string;
}> = ({ label, value, labelClassName, valueClassName }) => {
  return (
    <div className="xl:text-sm text-lg space-y-2">
      <p className={cn("text-[#BFBDBD]", labelClassName)}>{label}</p>
      <p className={cn("text-white", valueClassName)}>
        {Array.isArray(value)
          ? value.map((item, index) => (
              <span
                key={index}
                className="relative mr-5 after:absolute after:-right-3 after:top-1/2 after:-translate-y-1/2 after:w-1 after:h-1 after:rounded-full after:bg-white last:after:hidden"
              >
                {item}
              </span>
            ))
          : value}
      </p>
    </div>
  );
};

const ManageLPDetails: React.FC = () => {
  const router = useRouter();

  // ✅ TYPE useParams and normalize to string
  const rawParams = useParams<{ lpId: string }>();
  const lpId = Array.isArray(rawParams?.lpId) ? rawParams.lpId[0] : rawParams?.lpId;

  const [activeTab, setActiveTab] = useState<"installments" | "yield">("installments");
  const [payModalOpened, { open: openPayModal, close: closePayModal }] = useDisclosure(false);
  const [confirmationModalOpened, { open: openConfirmationModal, close: closeConfirmationModal }] = useDisclosure(false);
  const [amount, setAmount] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const { getAutoRenewalData } = useFLPStore();
  const { isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { connectWallet } = useWallet();
  const publicClient = usePublicClient();
  const { switchChainAsync } = useSwitchChain();
  const address = walletClient?.account?.address;

  // Dynamic chain and USDC contract selection based on environment
  const currentChain = isProduction ? base : baseSepolia;
  const usdcContractAddress = USDC_ADDRESSES[currentChain.id as keyof typeof USDC_ADDRESSES];

  // ERC20 ABI
  const usdcContractAbi = useMemo(
    () =>
      [
        {
          type: "function",
          name: "transfer",
          inputs: [
            { name: "to", type: "address" },
            { name: "amount", type: "uint256" },
          ],
          outputs: [{ name: "", type: "bool" }],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "decimals",
          inputs: [],
          outputs: [{ name: "", type: "uint8" }],
          stateMutability: "view",
        },
      ] as const,
    []
  );

  // Function to convert USDC amount to wei (6 decimals)
  const parseUSDC = (val: string): bigint => parseUnits(val, 6);

  const { data: userData } = useQuery({
    queryKey: [QUERY_KEYS.GET_USER_DETAIL],
    queryFn: () => getUser(),
    retry: 2,
  });

  // ✅ Only run LP queries when lpId is available
  const { data: lpDetails, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.GET_LP_DETAIL, lpId],
    queryFn: () => getLPById(lpId as string),
    enabled: Boolean(lpId),
    retry: 2,
  });

  const installmentDetails = useQuery({
    queryKey: [QUERY_KEYS.GET_INSTALLMENT_DETAIL, lpId],
    queryFn: () => getLPInstallmentById(lpId as string),
    enabled: Boolean(lpId),
    retry: 2,
  });

  const yieldDetails = useQuery({
    queryKey: [QUERY_KEYS.GET_YIELD_DETAIL, lpId],
    queryFn: () => getLPYieldById(lpId as string),
    enabled: Boolean(lpId),
    retry: 2,
  });

  const { data: currentCohort } = useQuery({
    queryKey: [QUERY_KEY.CURRENT_COHORT],
    queryFn: getCurrentCohort,
    retry: 2,
  });

  const updateInstallmentMutation = useMutation({
    mutationFn: (data: { lp_id: string; amount: string; cohort_schedule_id?: string | undefined }) => installment(data),
    onSuccess: () => {
      installmentDetails.refetch();
      yieldDetails.refetch();
    },
  });

  const updateSafeAddressMutation = useMutation({
    mutationFn: (data: { safe_address: string }) => safeUpdate(data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.GET_USER_DETAIL], exact: true });
    },
  });

  const deleteLpMutation = useMutation({
    mutationFn: (lp_id: string) => deleteLp(lp_id),
    onSuccess: () => {
      closeConfirmationModal();
      router.push("/admin-consoles/manage-lps");
    },
  });

  const safe_address: string | undefined = userData?.data?.safe_address;

  const autoRenewal = getAutoRenewalData()?.find((item) => item.id === lpDetails?.autorenewal_id);
  const installmentAmount = (Number(lpDetails?.total_commitment) / Number(lpDetails?.installments || 1)).toFixed(4);
  const maximumAmount = Number(lpDetails?.total_commitment) - Number(lpDetails?.commited_amount);

  const isAmountValid = useMemo(() => {
    const numAmount = Number(amount);
    return numAmount >= Number(installmentAmount) && numAmount <= maximumAmount && numAmount > 0;
  }, [amount, installmentAmount, maximumAmount]);

  const executeDirectUSDCTransfer = useCallback(
    async (safeAddress: string, usdcAmount: string) => {
      try {
        if (!address || !walletClient) {
          throw new Error("Wallet not connected");
        }

        const currentChainId = await walletClient.getChainId();
        const targetChainId = currentChain.id;

        if (currentChainId !== targetChainId) {
          await switchChainAsync({ chainId: targetChainId });
        }

        const transferData = encodeFunctionData({
          abi: usdcContractAbi,
          functionName: "transfer",
          args: [safeAddress as `0x${string}`, parseUSDC(usdcAmount)],
        });

        const transactionHash = await walletClient.sendTransaction({
          to: usdcContractAddress,
          data: transferData,
          value: BigInt(0),
          chain: currentChain,
        });

        if (publicClient) {
          await publicClient.waitForTransactionReceipt({
            hash: transactionHash,
            timeout: 120_000,
          });
        }

        await updateInstallmentMutation.mutateAsync({
          lp_id: lpId as string,
          amount: usdcAmount,
        });

        return { executed: true, txHash: transactionHash };
      } catch (error) {
        console.error("USDC transfer error:", error);
        throw error;
      }
    },
    [address, walletClient, usdcContractAddress, usdcContractAbi, currentChain, publicClient, lpId, switchChainAsync, updateInstallmentMutation]
  );

  const createSafe = useCallback(async () => {
    try {
      if (!address || !walletClient) {
        connectWallet();
        throw new Error("Wallet not connected");
      }
      setIsDeploying(true);

      const currentChainId = await walletClient.getChainId();
      const targetChainId = currentChain.id;

      if (currentChainId !== targetChainId) {
        await switchChainAsync({ chainId: targetChainId });
      }

      const safeResult = await createSafeWallet();
      const safeAddress = safeResult.safeAddress;

      await updateSafeAddressMutation.mutateAsync({ safe_address: safeAddress });
      const usdcResult = await executeDirectUSDCTransfer(safeAddress, amount);

      return {
        safeAddress,
        usdcTransferHash: usdcResult.txHash,
        isDeployed: true,
        usdcTransaction: usdcResult,
        isExisting: false,
      };
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setIsDeploying(false);
    }
  }, [address, walletClient, switchChainAsync, amount, connectWallet, currentChain, executeDirectUSDCTransfer, updateSafeAddressMutation]);

  const handlePayment = useCallback(async () => {
    if (!lpId) return;
    if (safe_address) {
      await executeDirectUSDCTransfer(safe_address, amount);
    } else {
      await createSafe();
    }
  }, [safe_address, executeDirectUSDCTransfer, amount, createSafe, lpId]);

  // ✅ Guard render if lpId is missing (shouldn’t happen, but keeps TS + build happy)
  if (!lpId) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Link href="/admin-consoles/manage-lps">
            <LiaArrowLeftSolid className="lg:size-6 size-5" />
          </Link>
          <h1 className="xl:text-sm text-base">Manage LP</h1>
        </div>
        <div className="text-white/70">Invalid LP route. Missing <code>lpId</code>.</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin-consoles/manage-lps">
            <LiaArrowLeftSolid className="lg:size-6 size-5" />
          </Link>
          {lpDetails && <h1 className="xl:text-sm text-base">{lpDetails?.lp_type_name}</h1>}
          {lpDetails && (
            <div
              className={cn(
                "flex items-center justify-center px-4 py-1 bg-white/8 rounded-full ml-3 text-center"
              )}
            >
              <span
                className={cn(
                  "xl:text-sm text-base",
                  lpDetails?.fund_status === "Funded"
                    ? "bg-linear-to-r from-[#BEFD89] to-[#7FD33E] bg-clip-text text-transparent"
                    : "text[#BDBF1B]"
                )}
              >
                {lpDetails?.fund_status === "Funded" ? "Funded" : "Pending"}
              </span>
            </div>
          )}
        </div>

        {lpDetails && Number(lpDetails?.commited_amount) === 0 && (
          <div
            className={cn(
              "flex items-center justify-center text-red-400 px-3 py-2 bg-fundio-sidebar rounded-lg ml-3 text-center cursor-pointer"
            )}
            onClick={() => {
              openConfirmationModal();
            }}
          >
            <Trash size={18} />
          </div>
        )}
      </div>

      {error ? (
        <div>Try Again!</div>
      ) : !isLoading ? (
        <div className="flex flex-col gap-7">
          {/* top cards ... unchanged below */}
          {/* (keeping your original UI/content verbatim) */}
          {/* ---------------- TOP CARDS ---------------- */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            <div className="relative group md:col-span-1 col-span-2 w-full h-full flex flex-col items-center justify-end lg:gap-5 gap-3 bg-fundio-sidebar lg:rounded-2xl md:rounded-xl rounded-lg p-5 transition-all duration-700 overflow-hidden">
              <div className="hidden group-hover:block absolute top-0 right-0 w-full h-full rotate-x-180">
                <Image src={SectionSimulateCapitalBg} alt="YieldBg" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col lg:gap-5 md:gap-1 gap-2 h-fit w-full items-start justify-end">
                <h2 className="text-4xl font-medium text-white">
                  {formatNumber(Number(lpDetails?.total_commitment))} USDC
                </h2>
                <h6 className="text-white/80 font-light xl:text-xs text-lg">Total Commitment</h6>
              </div>
            </div>

            <div className="relative group w-full h-full flex flex-col items-center justify-center lg:gap-4 gap-2 bg-fundio-sidebar lg:rounded-2xl md:rounded-xl rounded-lg px-5 py-3 transition-all duration-700 overflow-hidden">
              <div className="hidden group-hover:block absolute top-0 right-0 w-full h-full rotate-x-180">
                <Image src={SectionSimulateCapitalBg} alt="YieldBg" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col lg:gap-2 h-fit w-full items-start justify-end">
                <h2 className="text-2xl font-medium text-white">
                  {formatNumber(Number(lpDetails?.commited_amount))} USDC
                </h2>
                <h6 className="text-white/80 font-light xl:text-xs text-base">Committed</h6>
              </div>

              <Divider orientation="vertical" classNames={{ root: "shrink-0 border-none h-[1.5px] bg-linear-to-l from-transparent via-[#BDBF1B]/20 to-transparent w-4/5 " }} />

              <div className="flex lg:gap-2 h-fit w-full items-end justify-between">
                <div className="flex flex-col items-start gap-2">
                  <h2 className="text-2xl font-medium text-white">
                    {formatNumber(Number(lpDetails?.pending_amount))} USDC
                  </h2>
                  <h6 className="text-white/80 font-light xl:text-xs text-base">Pending Funding</h6>
                </div>

                {(Number(lpDetails?.pending_amount) > 0 && (lpDetails?.effective_date && new Date(lpDetails.effective_date) > new Date())) ? (
                  <Button
                    variant="primary"
                    onClick={() => openPayModal()}
                    className="rounded-sm !h-8 lg:!px-8 !px-6 xl:!text-[10px] !text-base !font-medium w-fit"
                  >
                    <span className="xl:text-xs text-base">Pay</span>
                  </Button>
                ) : null}
              </div>
            </div>

            <div className="relative group w-full h-full flex flex-col items-center justify-center lg:gap-4 gap-2 bg-fundio-sidebar lg:rounded-2xl md:rounded-xl rounded-lg px-5 py-3 transition-all duration-700 overflow-hidden">
              <div className="hidden group-hover:block absolute top-0 right-0 w-full h-full rotate-x-180">
                <Image src={SectionSimulateCapitalBg} alt="YieldBg" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col lg:gap-2 h-fit w-full items-start justify-end">
                <h2 className="text-2xl font-medium text-white">{lpDetails?.yield_interest_rate}%</h2>
                <h6 className="text-white/80 font-light xl:text-xs text-base">Interested Yield</h6>
              </div>

              <Divider orientation="vertical" classNames={{ root: "shrink-0 border-none h-[1.5px] bg-linear-to-l from-transparent via-[#BDBF1B]/20 to-transparent w-4/5" }} />

              <div className="flex flex-col lg:gap-2 h-fit w-full items-start justify-end">
                <h2 className="text-2xl font-medium text-white">
                  {formatNumber(Number(lpDetails?.total_withdrawable_amount))} USDC
                </h2>
                <h6 className="text-white/80 font-light xl:text-xs text-base">Total Withdrawable Amount</h6>
              </div>
            </div>
          </div>

          {/* (rest of your component stays the same) */}
          {/* ... LP Details rows, Interest section, Tabs, Modals ... */}

          {/* Pay modal */}
          <Modal
            opened={payModalOpened}
            onClose={closePayModal}
            size="sm"
            centered
            withCloseButton={false}
            classNames={{
              content: "bg-[#181818] rounded-xl",
              body: "p-0 rounded-xl bg-radial-[at_100%_0%] from-[#8DB6F3]/30 from-15% via-[#BEFD89]/30 via-40% to-transparent to-50%  overflow-hidden",
            }}
          >
            <div className="flex flex-col gap-4 backdrop-blur-3xl px-6 py-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h2 className="xl:text-xl text-3xl text-white font-medium">{lpDetails?.lp_type_name}</h2>
                  <Button
                    variant="light"
                    onClick={closePayModal}
                    className="rounded-full !size-6 !p-0 xl:!text-[10px] !text-base !font-medium w-fit bg-white/5"
                  >
                    <IoMdClose className="size-4 text-white" />
                  </Button>
                </div>
                <p className="text-white font-light xl:text-[11px] text-base lg:text-sm">Pay your next installment.</p>
              </div>

              <div className="h-px w-full bg-white/5" />

              <div className="flex flex-col gap-2">
                <p className="text-white/80 font-light xl:text-[11px] text-base lg:text-sm">Pending Funding</p>
                <p className="text-white font-light text-2xl">
                  {formatNumber(Number(lpDetails?.pending_amount))} USDC
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Input
                  name="InstallmentAmount"
                  placeholder="Enter USDC"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  min={installmentAmount}
                  max={lpDetails?.total_commitment}
                  inputClass={`${isAmountValid || !amount ? "!border-[#C2FF94]/20" : "!border-red-500/50"}`}
                />
                <div className="space-y-1">
                  <p className="text-white/80 font-light xl:text-[11px] text-base lg:text-sm tracking-wide">
                    Installment Amount: {installmentAmount} USDC
                  </p>
                  {amount && !isAmountValid && lpDetails?.pending_amount !== "0" && (
                    <p className="text-red-400 font-light xl:text-[10px] text-sm">
                      Amount must be between {installmentAmount} and {Number(lpDetails?.total_commitment)} USDC
                    </p>
                  )}
                </div>
              </div>

              {/* Pay Button */}
              {address && isConnected ? (
                <div className="flex justify-end mt-4">
                  <Button
                    onClick={async () => {
                      try {
                        await handlePayment();
                        closePayModal();
                      } catch (error) {
                        console.error("Payment failed:", error);
                      }
                    }}
                    variant="primary"
                    disabled={isDeploying || updateInstallmentMutation.isPending || !isAmountValid}
                    className="rounded-lg !h-10 xl:!text-xs !text-base !font-medium"
                  >
                    {isDeploying ? <Loader size="xs" color="#ffffff" /> : "Pay"}
                  </Button>
                </div>
              ) : (
                <div className="flex justify-end mt-4">
                  <Button onClick={connectWallet} variant="primary" className="rounded-lg !h-10 xl:!text-xs !text-base !font-medium">
                    Connect Wallet
                  </Button>
                </div>
              )}
            </div>
          </Modal>

          <ConfirmationModal
            icon={<Trash size={52} color="white" />}
            title={`Delete ${lpDetails?.lp_type_name}?`}
            content={`Are you certain you wish to proceed with deleting this ${lpDetails?.lp_type_name}?`}
            onConfirm={() => deleteLpMutation.mutate(lpId)}
            onCancel={closeConfirmationModal}
            opened={confirmationModalOpened}
            confirmText="Yes, Delete"
            cancelText="Close"
          />

          {activeTab === "installments" && <InstallmentsTable data={installmentDetails?.data || []} />}
          {activeTab === "yield" && <YieldTable data={yieldDetails?.data || []} />}
        </div>
      ) : (
        <Skeleton classNames={{ root: "before:bg-[#1D1F1B] after:bg-gray-400/5" }} height={300} />
      )}
    </div>
  );
};

export default ManageLPDetails;
