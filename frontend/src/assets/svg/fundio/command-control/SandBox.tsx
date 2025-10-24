import * as React from "react";

const SandBox: React.FC<React.SVGProps<SVGSVGElement>> = props => (
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
            strokeWidth="2"
            d="M28 38.833c.265 0 .51-.122 1.003-.368l3.955-1.968c1.751-.87 2.626-1.307 2.626-1.997v-8.667m-7.584 13c-.264 0-.51-.122-1.003-.368l-3.954-1.968c-1.752-.87-2.626-1.307-2.626-1.997v-8.667m7.583 13v-8.666m7.584-4.334c0-.69-.876-1.125-2.625-1.996l-3.956-1.97c-.494-.245-.738-.367-1.003-.367m7.584 4.333c0 .69-.876 1.126-2.625 1.997l-3.956 1.97c-.492.244-.738.367-1.003.367m-7.583-4.334c0-.69.874-1.126 2.626-1.996l3.954-1.969c.493-.246.739-.368 1.003-.368m-7.583 4.333c0 .69.875 1.126 2.625 1.997l3.955 1.97c.493.244.739.367 1.003.367m0-8.667v-4.333M38.834 37.75l-3.25-2.708M17.167 37.75l3.25-2.708"
        >
        </path>
    </svg>
);

export default SandBox;
