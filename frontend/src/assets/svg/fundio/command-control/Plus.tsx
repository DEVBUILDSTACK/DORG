import * as React from "react";

const Plus: React.FC<React.SVGProps<SVGSVGElement>> = props => (
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
            fill="#fff"
            d="M28 37.75q-.46 0-.771-.312a1.05 1.05 0 0 1-.312-.771v-7.584h-7.584q-.46 0-.771-.312A1.05 1.05 0 0 1 18.25 28q0-.459.312-.771a1.05 1.05 0 0 1 .771-.312h7.584v-7.584q0-.46.312-.771.312-.31.771-.312.46 0 .772.312.315.314.311.771v7.584h7.584q.46 0 .772.312t.311.771q0 .46-.312.772a1.04 1.04 0 0 1-.771.311h-7.584v7.584q0 .46-.312.772a1.04 1.04 0 0 1-.771.311"
        >
        </path>
    </svg>
);

export default Plus;
