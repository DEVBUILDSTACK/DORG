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
                wrapper: cn("flex-1 xl:h-10 xl:text-xs text-base", wrapperClass),
                input: cn("h-full bg-white border border-[#E5E7EB] rounded-lg font-manrope placeholder:text-[#9CA3AF] font-normal xl:text-xs text-base text-[#1F2937] hover:border-[#FF6B35] focus:border-[#FF6B35]", selectClass),
                dropdown: "bg-white border border-[#E5E7EB] shadow-lg",
                option: "text-[#1F2937] hover:bg-[#FF6B35]/10 hover:text-[#FF6B35] text-xs transition-colors",
                error: "xl:text-xs text-base",
            }}
            withErrorStyles={false}
            {...props}
        />
    );
};

export default Select;
