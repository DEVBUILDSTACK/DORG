import * as React from "react";

const SwitchArrow: React.FC<React.SVGProps<SVGSVGElement>> = props => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="44"
        height="44"
        fill="none"
        viewBox="0 0 56 56"
        {...props}
    >
        <rect width="56" height="56" fill="#fff" fillOpacity="0.05" rx="28"></rect>
        <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.667"
            d="M30.167 18.25 18.25 30.167m0 0v-4.334m0 4.334h4.333m10.834-4.334h4.333m0 0v4.334m0-4.334L25.833 37.75"
        >
        </path>
    </svg>
);

export default SwitchArrow;
