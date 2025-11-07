import * as React from "react";

const Shield: React.FC<React.SVGProps<SVGSVGElement>> = props => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <g clipPath="url(#clip0_shield)">
            <path
                fill="currentColor"
                d="M12 2.5c3.008 0 4.961 2.019 7.267 2.755.938.299 1.406.449 1.596.659.19.211.246.52.357 1.136 1.19 6.596-1.407 12.694-7.606 15.067-.666.255-.999.383-1.612.383s-.945-.127-1.61-.382c-6.2-2.374-8.8-8.472-7.61-15.068.111-.616.166-.924.356-1.135.19-.211.659-.36 1.597-.66C7.041 4.52 8.991 2.5 12 2.5m0 1.5a1 1 0 0 0-1 1v7.5H3.5a1 1 0 0 0 0 2H11v7.5a1 1 0 0 0 2 0V14.5h7.5a1 1 0 0 0 0-2H13V5a1 1 0 0 0-1-1"
            >
            </path>
        </g>
        <defs>
            <clipPath id="clip0_shield">
                <path fill="currentColor" d="M0 0h24v24H0z"></path>
            </clipPath>
        </defs>
    </svg>
);

export default Shield;
