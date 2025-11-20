import * as React from "react";

const BridgeDecor: React.FC<React.SVGProps<SVGSVGElement>> = props => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="120"
        height="80"
        fill="none"
        viewBox="0 0 120 80"
        {...props}
    >
        {/* Bridge arch pattern */}
        <path
            d="M10 60 Q30 20, 50 40 T90 60"
            stroke="#FF6B35"
            strokeWidth="3"
            fill="none"
            opacity="0.5"
            strokeLinecap="round"
        />
        <path
            d="M10 60 Q30 25, 50 42 T90 60"
            stroke="#FFE5DC"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
            strokeLinecap="round"
        />
        
        {/* Network nodes */}
        <circle cx="10" cy="60" r="8" fill="#FFE5DC" opacity="0.7" />
        <circle cx="50" cy="40" r="10" fill="#FF6B35" opacity="0.4" />
        <circle cx="90" cy="60" r="8" fill="#FFE5DC" opacity="0.7" />
        
        {/* Inner dots for nodes */}
        <circle cx="10" cy="60" r="3" fill="#FF6B35" opacity="0.8" />
        <circle cx="50" cy="40" r="4" fill="#FF6B35" opacity="0.7" />
        <circle cx="90" cy="60" r="3" fill="#FF6B35" opacity="0.8" />
        
        {/* Transfer arrows */}
        <path
            d="M25 50 L35 45"
            stroke="#FF6B35"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
        />
        <path
            d="M30 52 L35 48"
            stroke="#FF6B35"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.5"
        />
        <path
            d="M65 45 L75 50"
            stroke="#FF6B35"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
        />
        <path
            d="M70 48 L75 52"
            stroke="#FF6B35"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.5"
        />
        
        {/* Decorative particles */}
        <circle cx="60" cy="25" r="3" fill="#FFE5DC" opacity="0.6" />
        <circle cx="20" cy="45" r="2" fill="#FF6B35" opacity="0.5" />
        <circle cx="80" cy="45" r="2" fill="#FF6B35" opacity="0.5" />
        <circle cx="40" cy="30" r="2" fill="#FFE5DC" opacity="0.5" />
    </svg>
);

export default BridgeDecor;
