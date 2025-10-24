import * as React from "react";

const RecentlyDelete: React.FC<React.SVGProps<SVGSVGElement>> = props => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        fill="none"
        viewBox="0 0 22 22"
        {...props}
    >
        <path
            fill="#fff"
            d="M17.417 17.417H4.583V4.583h5.5V2.75h-5.5A1.84 1.84 0 0 0 2.75 4.583v12.834a1.84 1.84 0 0 0 1.833 1.833h12.834a1.84 1.84 0 0 0 1.833-1.833V13.75h-1.833z"
        >
        </path>
        <path
            fill="#fff"
            d="M13.75 4.583h5.5v5.5a.917.917 0 0 1-.916.917h-3.667a.917.917 0 0 1-.916-.917zm6.417-1.833h-1.833l-.523-.917h-2.62l-.524.917h-1.833v.916h7.333z"
        >
        </path>
    </svg>
);

export default RecentlyDelete;
