"use client";

import { Table } from "@mantine/core";
import dayjs from "dayjs";
import React from "react";

import type { GetInstallmentData } from "@/types/fundio/manage-lps.types";

type InstallmentsTableProps = {
    data: GetInstallmentData[];
};

const InstallmentsTable: React.FC<InstallmentsTableProps> = ({ data }) => {
    // table rows
    const rows = data.map(element => (
        <Table.Tr
            key={element.id}
            className="text-white xl:text-sm text-base font-normal hover:bg-[#C2FF94]/1"
        >
            <Table.Td className="max-w-[200px] truncate font-medium">
                {dayjs(element.created_at).format("DD MMM, YYYY")}
            </Table.Td>
            <Table.Td>
                <div className="flex items-center gap-4">
                    <span>
                        $
                        {element.amount}
                    </span>
                </div>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <div className="rounded-2xl border-[#C2FF94]/9 border overflow-hidden lg:w-3/5 md:w-2/3 w-full mb-8">
            <Table.ScrollContainer style={{ overflowY: "scroll", scrollbarWidth: "none" }} maxHeight={300} minWidth="100%" scrollAreaProps={{ scrollbarSize: "none" }}>
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
                        th: "bg-[#C2FF94]/4 first:pl-10 last:pr-10 font-medium",
                        tr: "whitespace-nowrap",
                        td: "py-3 first:pl-10 last:pr-10",
                        table: "rounded-xl",
                    }}
                >
                    <Table.Thead className="text-[#BFBDBD] xl:text-sm text-lg">
                        <Table.Tr className="bg-[#1F211D]">
                            <Table.Th className="rounded-tl-xl w-[200px]">Date</Table.Th>
                            <Table.Th>Commitment Amount</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {rows.length > 0 ? rows : <Table.Tr><Table.Td colSpan={6} className="text-center">No data available</Table.Td></Table.Tr>}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </div>
    );
};

export default InstallmentsTable;
