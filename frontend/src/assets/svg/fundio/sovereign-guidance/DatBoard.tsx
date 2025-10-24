import * as React from "react";

const DatBoard: React.FC<React.SVGProps<SVGSVGElement>> = props => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        fill="none"
        viewBox="0 0 22 22"
        {...props}
    >
        <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M18.097 6.717a1.896 1.896 0 1 0-2.352-2.351 8.21 8.21 0 0 0-9.028 0 1.897 1.897 0 1 0-2.351 2.351 8.24 8.24 0 0 0-1.353 4.514 8.13 8.13 0 0 0 1.05 4.008 1.883 1.883 0 0 0 .846 3.578 1.91 1.91 0 0 0 1.593-.872 8.18 8.18 0 0 0 9.458 0 1.898 1.898 0 0 0 3.49-1.024 1.88 1.88 0 0 0-1.05-1.682 8.13 8.13 0 0 0 1.05-4.008 8.24 8.24 0 0 0-1.354-4.514"
        >
        </path>
        <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M11.232 15.656a4.425 4.425 0 1 0 0-8.85 4.425 4.425 0 0 0 0 8.85"
        >
        </path>
        <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M11.23 11.863a.632.632 0 1 0 0-1.264.632.632 0 0 0 0 1.264"
        >
        </path>
    </svg>
);

export default DatBoard;
