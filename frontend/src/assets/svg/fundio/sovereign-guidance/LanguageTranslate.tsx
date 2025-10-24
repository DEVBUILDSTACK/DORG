import type { SVGProps } from "react";

import React from "react";

export function LanguageTranslate(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 14 14"
            {...props}
        >
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7.5h8m-4-2v2m-2.5 0c0 2.32 2.16 4.28 5 6" />
                <path d="M9.5 7.5c.05 2.32-2.16 4.28-5 6M.5 4A3.5 3.5 0 0 1 4 .5" />
                <path d="M.5 4A3.5 3.5 0 0 1 4 .5M3 4a1 1 0 0 1 1-1" />
                <path d="M3 4a1 1 0 0 1 1-1m6-2.5A3.5 3.5 0 0 1 13.5 4" />
                <path d="M10 .5A3.5 3.5 0 0 1 13.5 4M10 3a1 1 0 0 1 1 1" />
                <path d="M10 3a1 1 0 0 1 1 1" />
            </g>
        </svg>
    );
}
export default LanguageTranslate;
