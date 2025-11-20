import React from "react";

import { cn } from "@/lib/utils";

function PageContent({
    children,
    className,
    mainClassName,
}: {
    children: React.ReactNode;
    className?: string;
    mainClassName?: string;
}) {
    return (
        <main
            className={cn(
                "h-[calc(100vh-var(--h-nav)-1rem)] space-y-4 md:pl-10",
                mainClassName,
            )}
        >
            <div
                className={cn(
                    "w-full h-full pt-4 md:px-6 px-4 lg:pt-6 overflow-y-auto rounded-xl",
                    className,
                )}
            >
                {children}
            </div>
        </main>
    );
}

export default PageContent;
