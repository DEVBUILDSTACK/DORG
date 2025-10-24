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
                wrapper: cn("flex-1 xl:h-10 xl:text-xs text-base", wrapperClass),
                input: cn("h-full bg-transparent border-white/26 rounded-lg font-manrope placeholder:text-white/50 font-thin xl:text-xs text-base text-white font-medium", inputClass),
                error: "xl:text-xs text-base",
            }}
            withErrorStyles={false}
            {...props}
        />
    );
};

export default Input;
