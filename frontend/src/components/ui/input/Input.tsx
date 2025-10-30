import type { PolymorphicComponentProps, TextInputProps } from "@mantine/core";

import { TextInput as MantineTextInput } from "@mantine/core";
import React from "react";

import { cn } from "@/lib/utils";

type CustomInputProps = {
    wrapperClass?: string;
    inputClass?: string;
} & PolymorphicComponentProps<typeof MantineTextInput, TextInputProps>;

const Input: React.FC<CustomInputProps> = ({ wrapperClass, inputClass, ...props }) => {
    return (
        <MantineTextInput
            classNames={{
                root: "w-full",
                wrapper: cn("flex-1 h-12", wrapperClass),
                input: cn(
                    "h-full bg-white border border-[#E5E7EB] rounded-xl text-[#0A4A7A] placeholder:text-[#9CA3AF] transition-all duration-200",
                    "focus:border-[#0A4A7A] focus:ring-2 focus:ring-[#0A4A7A]/20",
                    "disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] disabled:cursor-not-allowed",
                    inputClass
                ),
                label: "text-sm font-semibold text-[#0A4A7A] mb-2",
                error: "text-sm text-[#DC2626] mt-1",
            }}
            withErrorStyles={true}
            {...props}
        />
    );
};

export default Input;
