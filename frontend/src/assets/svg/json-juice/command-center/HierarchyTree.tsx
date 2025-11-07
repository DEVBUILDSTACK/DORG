import * as React from "react";

const HierarchyTree: React.FC<React.SVGProps<SVGSVGElement>> = props => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <g clipPath="url(#clip0_2358_366)">
            <path
                stroke="currentColor"
                strokeWidth="1.333"
                d="M16.127 20a9 9 0 0 0 2.559-1.975m0 0a2 2 0 0 1 .692-3.086 2 2 0 0 1 1.186-.161m-1.878 3.247a2.003 2.003 0 0 0 3.273-.275 2 2 0 0 0-1.395-2.972M8 20.065a9 9 0 0 1-2.686-2.04m0 0a2 2 0 1 1-1.877-3.247m1.877 3.247a2 2 0 0 0-1.877-3.247M5.5 23.5s5.122 0 5.697-9.667M18.5 23.5s-5.122 0-5.698-9.667m-9.365.945A9 9 0 0 1 3 12c0-.97.153-1.903.437-2.778m0 0q.163.027.336.028a2 2 0 0 0 1.54-3.275M3.437 9.222A2 2 0 0 1 1.964 8.1a2 2 0 0 1 3.35-2.125 9 9 0 0 1 4.81-2.78m0 0a2 2 0 0 0 3.753 0m-3.752 0a2 2 0 1 1 3.752 0m0 0a9 9 0 0 1 4.81 2.78m0 0a2 2 0 1 1 1.877 3.247m-1.877-3.247a2 2 0 0 0 1.877 3.247m0 0c.284.875.437 1.809.437 2.778s-.153 1.903-.437 2.778m-9.366-.945a2 2 0 1 0 1.605-3.665 2 2 0 0 0-1.605 3.665Z"
            >
            </path>
        </g>
        <defs>
            <clipPath id="clip0_2358_366">
                <path fill="currentColor" d="M0 0h24v24H0z"></path>
            </clipPath>
        </defs>
    </svg>
);

export default HierarchyTree;
