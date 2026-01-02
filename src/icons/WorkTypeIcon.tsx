import React from 'react';
import Sprites from './WorkTypeSprites.svg';

export type IWorkTypeIcon =
  | 'fire'
  | 'electricity'
  | 'earth'
  | 'gas'
  | 'heavylifting'
  | 'repair'
  | 'tech'
  | 'height';

interface WorkTypeIconProps {
  className?: string;
  icon: IWorkTypeIcon;
}

export const WorkTypeIcon: React.FC<WorkTypeIconProps> = ({
  className,
  icon,
}) => {
  return (
    <svg className={className}>
      <use href={Sprites + '#' + icon} />
    </svg>
  );
};
