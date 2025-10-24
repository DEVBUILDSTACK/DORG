"use client";

import { Pagination, Table } from "@mantine/core";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React from "react";

import type { LPListResponse } from "@/types/fundio/manage-lps.types";
import type { Metadata } from "@/types/landing-page/simulateCapital.types";

import { PAGE_LIMIT } from "@/lib/landing-page/constants";
import { cn } from "@/lib/utils";

type LPDetailsTableProps = {
    data: LPListResponse[];
    metadata?: Metadata;
    currentPage?: number;
    setCurrentPage?: (page: number) => void;
};

const RecentCommitmentsTable: React.FC<LPDetailsTableProps> = ({ data, metadata, currentPage, setCurrentPage }) => {
    const router = useRouter();

    // table rows
    const rows = data?.map(element => (
        <Table.Tr
            key={element.lp_id}
            className="text-white xl:text-sm text-base font-normal cursor-pointer hover:bg-[#C2FF94]/1"
            onClick={() => { router.push(`/admin-consoles/manage-lps/${element.lp_id}`); }}
        >
            <Table.Td className="max-w-[250px] truncate font-medium" title={element.lp_type_name}>
                {element.lp_type_name}
            </Table.Td>
            <Table.Td className={cn(
                "font-bold",
                element.lp_fund_status === "Funded" ? "bg-linear-to-r from-secondary to-[#7FD33E] bg-clip-text text-transparent" : "text-[#BDBF1B]",
            )}
            >
                {element.lp_fund_status}
            </Table.Td>
            <Table.Td>
                {element.total_commited}
                {" "}
                USDC
            </Table.Td>
            <Table.Td>
                {element.orginate_fee}
                {" "}
                %
            </Table.Td>
            <Table.Td>
                {element.configurd_yield}
                {" "}
                %
            </Table.Td>
            <Table.Td>
                {element.current_yield}
                {" "}
                %
            </Table.Td>
            <Table.Td>
                {element.duration}
                {" "}
                Months
            </Table.Td>
            <Table.Td>{element.remittance_name}</Table.Td>
            <Table.Td>
                {element.total_installments}
                {" "}
                Payments
            </Table.Td>
            <Table.Td>{dayjs(element.created_at).format("DD MMM, YYYY")}</Table.Td>
            <Table.Td>
                {/* <div className="flex items-center justify-between gap-6"> */}
                <span>
                    $
                    {element.next_installment_amount}
                </span>
                {/* {element.nextInstallment.status === "Paid"
                        ? <span className="font-extralight xl:text-xs text-base">{dayjs(element.nextInstallment.paymentDate).format("DD MMM, YYYY")}</span>
                        : <Button variant="primary" className="rounded-sm !h-5 !px-6 xl:!text-[10px] !text-base !font-medium">Pay</Button>} */}
                {/* </div> */}
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <div className="rounded-2xl border-[#C2FF94]/9 border overflow-hidden">
            <Table.ScrollContainer style={{ overflowY: "scroll", scrollbarWidth: "none" }} maxHeight={400} minWidth="100%" scrollAreaProps={{ scrollbarSize: "none" }}>
                <Table
                    stickyHeader
                    verticalSpacing="sm"
                    horizontalSpacing="lg"
                    withRowBorders={false}
                    highlightOnHover
                    highlightOnHoverColor="#1d1f1b"
                    bgcolor="#181818"
                    borderColor="#C2FF9417"
                    classNames={{
                        th: "bg-[#C2FF94]/7 md:first:pl-10 md:last:pr-10 xl:text-sm text-lg font-medium",
                        tr: "whitespace-nowrap",
                        td: "py-3 md:first:pl-10 md:last:pr-10",
                        table: "rounded-xl",
                        tbody: "bg-[#C2FF94]/3",
                        thead: "bg-[#181818]",
                    }}
                >
                    <Table.Thead className="text-[#BFBDBD] text-sm">
                        <Table.Tr>
                            <Table.Th className="rounded-tl-xl w-[250px]">Contact</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Total Committed</Table.Th>
                            <Table.Th>Origination Fee</Table.Th>
                            <Table.Th>Configured Yield</Table.Th>
                            <Table.Th>Interest Yield</Table.Th>
                            <Table.Th>Contract Duration</Table.Th>
                            <Table.Th>Interest Remittance Mode</Table.Th>
                            <Table.Th>LP Funding Payments</Table.Th>
                            <Table.Th>Started At</Table.Th>
                            <Table.Th>Next Installment</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {rows?.length > 0 ? rows : <Table.Tr><Table.Td colSpan={11} className="text-center">No data available</Table.Td></Table.Tr>}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
            {metadata && (metadata.has_more || metadata.total_records > PAGE_LIMIT)
                && (
                    <div className="flex items-center justify-center my-3">
                        <Pagination
                            classNames={{
                                control: "bg-[#181818] text-xs border-[#C2FF94]/20 data-[active=true]:text-white data-[active=true]:bg-[#C2FF94]/20 text-white/50",
                            }}
                            total={metadata?.total_records / PAGE_LIMIT}
                            value={currentPage}
                            onChange={setCurrentPage}
                        />
                    </div>
                )}
        </div>
    );
};

export default RecentCommitmentsTable;
