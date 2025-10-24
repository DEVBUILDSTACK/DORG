import React from "react";

const ProtocolArrowButton: React.FC = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="none"
            viewBox="0 0 62 62"
            className=""
        >
            <path
                fill="url(#paint0_linear_2059_276)"
                d="M0 31C0 13.88 13.88 0 31 0s31 13.88 31 31-13.88 31-31 31S0 48.12 0 31"
            >
            </path>
            <path
                fill="#163900"
                d="m23.533 39-1.867-1.867 12.8-12.8H22.999v-2.666h16v16h-2.666V26.2z"
            >
            </path>
            <defs>
                <linearGradient
                    id="paint0_linear_2059_276"
                    x1="0"
                    x2="56.093"
                    y1="18.5"
                    y2="18.9"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#BEFD89"></stop>
                    <stop offset="1" stopColor="#8DB6F3"></stop>
                </linearGradient>
            </defs>
        </svg>
    );
};

export default ProtocolArrowButton;
