import { FloatingIndicator, UnstyledButton } from "@mantine/core";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

type TabsProps = {
    data: string[];
    rootClassName?: string;
    tabButtonClassName?: string;
    active: number;
    setActive: (index: number) => void;
    theme?: "Fundio" | "JsonJuice";
};

const Tabs: React.FC<TabsProps> = ({ data, rootClassName, tabButtonClassName, active, setActive, theme = "Fundio" }) => {
    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});

    const setControlRef = (index: number) => (node: HTMLButtonElement) => {
        controlsRefs[index] = node;
        setControlsRefs(controlsRefs);
    };

    const controls = data.map((item, index) => (
        <UnstyledButton
            key={item}
            ref={setControlRef(index)}
            onClick={() => setActive(index)}
            mod={{ active: active === index }}
            className={cn(
                "px-6 py-3 text-sm font-semibold transition-colors duration-200",
                index === 0 && "rounded-l-xl",
                index === data.length - 1 && "rounded-r-xl",
                tabButtonClassName,
            )}
        >
            <span className={cn(
                "relative z-10 transition-colors duration-200",
                active === index ? "text-white" : "text-[#5A6C7D]",
            )}
            >
                {item}
            </span>
        </UnstyledButton>
    ));

    return (
        <div ref={setRootRef} className="shrink-0 relative">
            <div className={cn("w-fit rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-1", rootClassName)}>
                {controls}
            </div>

            <FloatingIndicator
                target={controlsRefs[active]}
                parent={rootRef}
                className="rounded-lg bg-[#0A4A7A] shadow-sm"
            />
        </div>
    );
};

export default Tabs;
