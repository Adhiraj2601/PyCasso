// Icon components for grid cells
// Each icon is an inline SVG designed to render crisply at small sizes

import React from 'react';

interface IconProps {
  color?: string;
}

export const SnowflakeIcon: React.FC<IconProps> = ({ color = 'white' }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="12" cy="12" r="2" fill={color} />
    {/* Branch tips */}
    <path
      d="M12 5l-1.5 1.5M12 5l1.5 1.5M12 19l-1.5-1.5M12 19l1.5-1.5M5 12l1.5-1.5M5 12l1.5 1.5M19 12l-1.5-1.5M19 12l-1.5 1.5"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({ color = 'white' }) => (
  <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export const HeartIcon: React.FC<IconProps> = ({ color = 'white' }) => (
  <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const DiamondIcon: React.FC<IconProps> = ({ color = 'white' }) => (
  <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L22 12L12 22L2 12L12 2Z" />
  </svg>
);

export const CircleIcon: React.FC<IconProps> = ({ color = 'white' }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="8" fill={color} />
  </svg>
);

export const CrossIcon: React.FC<IconProps> = ({ color = 'white' }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

export const TriangleIcon: React.FC<IconProps> = ({ color = 'white' }) => (
  <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L22 21H2L12 3Z" />
  </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ color = 'white' }) => (
  <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

// Icon registry: maps string names to components
const iconMap: Record<string, React.FC<IconProps>> = {
  snowflake: SnowflakeIcon,
  star: StarIcon,
  heart: HeartIcon,
  diamond: DiamondIcon,
  circle: CircleIcon,
  cross: CrossIcon,
  triangle: TriangleIcon,
  moon: MoonIcon,
  '❄': SnowflakeIcon,
  '⭐': StarIcon,
  '❤': HeartIcon,
  '◆': DiamondIcon,
  '●': CircleIcon,
  '✕': CrossIcon,
  '▲': TriangleIcon,
  '🌙': MoonIcon,
};

export function getIconComponent(iconName: string): React.FC<IconProps> | null {
  if (!iconName || iconName.trim() === '') return null;
  return iconMap[iconName.toLowerCase()] || null;
}

export function getIconColor(cellColor: string): string {
  // Choose a contrasting icon color based on the cell background
  const darkColors = ['black', 'blue', 'purple', 'brown', 'red'];
  return darkColors.includes(cellColor.toLowerCase()) ? 'white' : '#1a1a2e';
}
