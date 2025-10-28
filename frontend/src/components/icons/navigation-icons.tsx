import React from 'react';
import { BaseIcon, IconProps } from './BaseIcon';

export const ChevronDown: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <polyline points="6 9 12 15 18 9" />
  </BaseIcon>
);

export const ChevronUp: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <polyline points="18 15 12 9 6 15" />
  </BaseIcon>
);

export const ChevronRight: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <polyline points="9 18 15 12 9 6" />
  </BaseIcon>
);

export const ChevronLeft: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <polyline points="15 18 9 12 15 6" />
  </BaseIcon>
);

export const ArrowRight: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </BaseIcon>
);

export const ArrowLeft: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </BaseIcon>
);

export const ArrowUp: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </BaseIcon>
);

export const ArrowDown: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </BaseIcon>
);

export const ArrowUpRight: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </BaseIcon>
);

export const Home: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </BaseIcon>
);
