import React from 'react';

interface PawIconProps {
  className?: string;
  size?: number;
  color?: string;
  rotate?: number;
}

export const PawIcon: React.FC<PawIconProps> = ({
  className = '',
  size = 20,
  color = 'currentColor',
  rotate = 0,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        transformOrigin: 'center',
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
      aria-hidden="true"
    >
      {/* Main pad */}
      <path d="M12 11.5C9.5 11.5 7.5 13.8 7.5 16.5C7.5 18.8 9.3 21 12 21C14.7 21 16.5 18.8 16.5 16.5C16.5 13.8 14.5 11.5 12 11.5Z" />
      {/* Toe 1 (left outer) */}
      <ellipse cx="6" cy="10" rx="2" ry="3" transform="rotate(-20 6 10)" />
      {/* Toe 2 (left inner) */}
      <ellipse cx="9.8" cy="6.8" rx="2" ry="3.2" transform="rotate(-6 9.8 6.8)" />
      {/* Toe 3 (right inner) */}
      <ellipse cx="14.2" cy="6.8" rx="2" ry="3.2" transform="rotate(6 14.2 6.8)" />
      {/* Toe 4 (right outer) */}
      <ellipse cx="18" cy="10" rx="2" ry="3" transform="rotate(20 18 10)" />
    </svg>
  );
};
