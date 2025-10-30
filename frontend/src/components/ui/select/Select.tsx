import type { PolymorphicComponentProps, SelectProps } from "@mantine/core";

import { Select as MantineSelect } from "@mantine/core";
import React from "react";

import { cn } from "@/lib/utils";

type CustomSelectProps = {
    wrapperClass?: string;
    selectClass?: string;
} & PolymorphicComponentProps<typeof MantineSelect, SelectProps>;

const Select: React.FC<CustomSelectProps> = ({ wrapperClass, selectClass, ...props }) => {
    return (
        <MantineSelect
            classNames={{
                root: "w-full",
                wrapper: cn("flex-1 h-12", wrapperClass),
                input: cn(
                    "h-full bg-white border border-[#E5E7EB] rounded-xl text-[#0A4A7A] transition-all duration-200",
                    "focus:border-[#0A4A7A] focus:ring-2 focus:ring-[#0A4A7A]/20",
                    selectClass
                ),
                dropdown: "bg-white border border-[#E5E7EB] rounded-xl shadow-lg mt-1",
                option: "text-[#0A4A7A] hover:bg-[#F9FAFB] rounded-lg mx-1 px-3",
                label: "text-sm font-semibold text-[#0A4A7A] mb-2",
                error: "text-sm text-[#DC2626] mt-1",
            }}
            withErrorStyles={true}
            {...props}
        />
    );
};

export default Select;
