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
                input: cn("h-full bg-transparent border-border rounded-lg font-manrope placeholder:text-white font-thin xl:text-xs text-base text-white", selectClass),
                dropdown: "bg-fundio-sidebar border-none",
                option: "text-white hover:bg-fundio-sidebar text-xs",
                error: "xl:text-xs text-base",
            }}
            withErrorStyles={false}
            {...props}
        />
    );
};

export default Select;
