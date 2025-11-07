import * as React from "react";

const CrossChainDecor: React.FC<React.SVGProps<SVGSVGElement>> = props => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="120"
        height="80"
        fill="none"
        viewBox="0 0 120 80"
        {...props}
    >
        {/* Connected chains pattern */}
        <circle cx="20" cy="40" r="12" fill="#FFE5DC" opacity="0.6" />
        <circle cx="60" cy="40" r="16" fill="#FF6B35" opacity="0.3" />
        <circle cx="100" cy="40" r="12" fill="#FFE5DC" opacity="0.6" />
        
        {/* Connection lines */}
        <path
            d="M32 40 L48 40"
            stroke="#FF6B35"
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.5"
        />
        <path
            d="M76 40 L88 40"
            stroke="#FF6B35"
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.5"
        />
        
        {/* Swap arrows */}
        <path
            d="M52 35 L56 40 L52 45"
            stroke="#FF6B35"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.7"
            fill="none"
        />
        <path
            d="M68 45 L64 40 L68 35"
            stroke="#FF6B35"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.7"
            fill="none"
        />
        
        {/* Decorative dots */}
        <circle cx="20" cy="20" r="3" fill="#FF6B35" opacity="0.4" />
        <circle cx="100" cy="20" r="3" fill="#FF6B35" opacity="0.4" />
        <circle cx="20" cy="60" r="3" fill="#FFE5DC" opacity="0.5" />
        <circle cx="100" cy="60" r="3" fill="#FFE5DC" opacity="0.5" />
    </svg>
);

export default CrossChainDecor;
