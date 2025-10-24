import type { ButtonProps, PolymorphicComponentProps } from "@mantine/core";
import type { ReactNode } from "react";

import { Button as MantineButton } from "@mantine/core";

import { cn } from "@/lib/utils";

type CustomButtonProps = {
    variant?: "primary" | "secondary" | "light" | "outline" | "outline-destructive";
    children: ReactNode;
    labelClass?: string;
} & PolymorphicComponentProps<"button", ButtonProps>;

const Button: React.FC<CustomButtonProps> = ({ variant = "primary", labelClass, ...props }) => {
    return (
        <MantineButton
            {...props}
            className={cn("w-full text-2xl md:text-xl lg:text-sm font-semibold rounded-full outline-none text-[#252500] lg:tracking-[-0.5px] px-8 md:px-5 lg:px-10 xl:h-12 h-10 ", variant === "primary" && "bg-gradient-to-r from-primary to-secondary border-none", variant === "secondary" && "bg-gray", variant === "light" && "bg-[#F4F5FA] font-medium", variant === "outline" && "relative bg-transparent text-white font-medium overflow-hidden border-white/22", variant === "outline-destructive" && "bg-transparent border border-red-500 text-red-500 font-medium", "disabled:opacity-50 disabled:cursor-not-allowed", props?.className)}
            classNames={{
                label: cn("flex items-center gap-3 overflow-visible", labelClass),
            }}
        >
            {props.children}
        </MantineButton>
    );
};

export default Button;
