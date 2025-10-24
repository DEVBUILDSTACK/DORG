import React from "react";

const Star: React.FC<React.SVGProps<SVGSVGElement>> = ({ width }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width || 26}
            height="26"
            fill="none"
            viewBox="0 0 26 26"
        >
            <path
                fill="#fff"
                fillOpacity="0.3"
                d="m13.907 20.652-1.06 5.04-1.061-5.04a8.73 8.73 0 0 0-6.746-6.746L0 12.846l5.04-1.061a8.73 8.73 0 0 0 6.746-6.746l1.06-5.04 1.06 5.04a8.73 8.73 0 0 0 6.747 6.746l5.04 1.06-5.04 1.06a8.73 8.73 0 0 0-6.746 6.747"
            >
            </path>
        </svg>
    );
};

export default Star;
