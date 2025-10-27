import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

export const BaseIcon: React.FC<IconProps & { children: React.ReactNode; viewBox?: string }> = ({
  className = '',
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  children,
  viewBox = '0 0 24 24',
  style,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      {...props}
    >
      {children}
    </svg>
  );
};
