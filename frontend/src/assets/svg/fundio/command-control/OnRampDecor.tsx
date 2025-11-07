import * as React from "react";

const OnRampDecor: React.FC<React.SVGProps<SVGSVGElement>> = props => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="120"
        height="80"
        fill="none"
        viewBox="0 0 120 80"
        {...props}
    >
        {/* Currency symbols and cards */}
        <rect
            x="15"
            y="25"
            width="35"
            height="30"
            rx="6"
            fill="#FFE5DC"
            opacity="0.6"
        />
        <rect
            x="70"
            y="25"
            width="35"
            height="30"
            rx="6"
            fill="#FF6B35"
            opacity="0.3"
        />
        
        {/* Plus/Add symbol */}
        <circle cx="60" cy="40" r="18" fill="#FFE5DC" opacity="0.5" />
        <path
            d="M60 30 L60 50 M50 40 L70 40"
            stroke="#FF6B35"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
        />
        
        {/* Currency symbol (Dollar) */}
        <text
            x="32"
            y="45"
            fontSize="20"
            fontWeight="bold"
            fill="#FF6B35"
            opacity="0.6"
        >
            $
        </text>
        
        {/* Crypto symbol */}
        <circle cx="87" cy="40" r="8" stroke="#FF6B35" strokeWidth="2" fill="none" opacity="0.6" />
        <path
            d="M87 35 L87 45 M83 40 L91 40"
            stroke="#FF6B35"
            strokeWidth="1.5"
            opacity="0.6"
        />
        
        {/* Decorative elements */}
        <circle cx="25" cy="15" r="4" fill="#FF6B35" opacity="0.4" />
        <circle cx="95" cy="15" r="4" fill="#FFE5DC" opacity="0.5" />
        <circle cx="25" cy="65" r="3" fill="#FFE5DC" opacity="0.5" />
        <circle cx="95" cy="65" r="3" fill="#FF6B35" opacity="0.4" />
    </svg>
);

export default OnRampDecor;
