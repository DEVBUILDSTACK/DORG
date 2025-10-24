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
                "px-5 py-2 xl:text-xs text-base font-semibold",
                index === 0 && "rounded-l-lg",
                index === data.length - 1 && "rounded-r-lg",
                tabButtonClassName,
            )}
        >
            <span className={cn(
                "relative z-10",
                active === index ? (theme === "Fundio" ? "text-c3-background" : "text-black") : (theme === "Fundio" ? "bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text" : "text-primary"),
            )}
            >
                {item}
            </span>
        </UnstyledButton>
    ));

    return (
        <div ref={setRootRef} className="shrink-0 relative">
            <div className={cn("w-fit rounded-lg border border-[#C2FF94]/10", rootClassName)}>
                <div className="flex items-center justify-center w-full h-full p-0.5 rounded-xl bg-c3-background">
                    {controls}
                </div>
            </div>

            <FloatingIndicator
                target={controlsRefs[active]}
                parent={rootRef}
                className={cn("rounded-lg", theme === "Fundio" ? "bg-gradient-to-r from-primary to-secondary" : "bg-primary")}
            />
        </div>
    );
};

export default Tabs;
