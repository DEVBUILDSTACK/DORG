"use client";

import { Table } from "@mantine/core";
import dayjs from "dayjs";
import React from "react";

import type { YieldData } from "@/types/fundio/manage-lps.types";

type YieldTableProps = {
    data: YieldData[];
};

const YieldTable: React.FC<YieldTableProps> = ({ data }) => {
    // table rows
    let cumulative = 0;
    const rows = data.map((element) => {
        cumulative += Number(element.yield_amount);

        return (
            <Table.Tr
                key={element.id}
                className="text-[#1F2937] xl:text-sm text-base font-normal hover:bg-[#FFE5DC]/30"
            >
                <Table.Td className="max-w-[200px] truncate font-medium">
                    {dayjs(element.start_date).format("DD MMM, YYYY")}
                </Table.Td>
                <Table.Td>{element.yield_amount}</Table.Td>
                <Table.Td className="text-[#FF6B35] font-semibold">{element.yield_rate}</Table.Td>
                <Table.Td>{(cumulative).toFixed(2)}</Table.Td>
            </Table.Tr>
        );
    });

    return (
        <div className="rounded-2xl border-[#FF6B35]/20 border overflow-hidden lg:w-3/5 md:w-2/3 w-full mb-8 bg-white">
            <Table.ScrollContainer style={{ overflowY: "scroll", scrollbarWidth: "none" }} maxHeight={300} minWidth="100%" scrollAreaProps={{ scrollbarSize: "none" }}>
                <Table
                    stickyHeader
                    verticalSpacing="sm"
                    horizontalSpacing="lg"
                    withRowBorders={false}
                    highlightOnHover
                    highlightOnHoverColor="#FFE5DC"
                    bgcolor="#FFFFFF"
                    borderColor="#FFE5DC"
                    classNames={{
                        th: "bg-[#FFE5DC] first:pl-10 last:pr-10 font-semibold",
                        tr: "whitespace-nowrap",
                        td: "py-3 first:pl-10 last:pr-10",
                        table: "rounded-xl",
                    }}
                >
                    <Table.Thead className="text-[#5A6C7D] xl:text-sm text-lg z-10">
                        <Table.Tr className="bg-[#FFE5DC]">
                            <Table.Th className="rounded-tl-xl w-[200px]">Date</Table.Th>
                            <Table.Th className="w-[140px]">Earn Yield</Table.Th>
                            <Table.Th>Add Yield</Table.Th>
                            <Table.Th>Total Yield</Table.Th>
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

export default YieldTable;
