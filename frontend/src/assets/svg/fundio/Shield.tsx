import * as React from "react";

const Shield: React.FC<React.SVGProps<SVGSVGElement>> = props => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 2v20m9-10H3m8.998-10C8.99 2 7.04 4.019 4.734 4.755c-.938.3-1.407.449-1.597.66-.19.21-.245.519-.356 1.135-1.19 6.596 1.41 12.694 7.61 15.068.665.255.998.382 1.61.382s.946-.128 1.612-.383c6.199-2.373 8.796-8.471 7.606-15.067-.111-.616-.167-.925-.357-1.136s-.658-.36-1.596-.659C16.959 4.019 15.006 2 11.998 2"
        >
        </path>
    </svg>
);

export default Shield;
