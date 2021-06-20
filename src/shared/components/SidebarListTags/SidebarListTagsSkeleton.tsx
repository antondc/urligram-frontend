import React from 'react';

import { SkeletonItem } from 'Vendor/components';

import './SidebarListTagsSkeleton.less';

interface Props {
  length?: number;
}

export const SidebarListTagsSkeleton: React.FC<Props> = ({ length = 10 }) => (
  <>
    {Array.from({ length }, (_, index) => (
      <SkeletonItem
        className={'SidebarListTagsSkeleton-item SidebarListTagsSkeleton-item' + (Math.floor(Math.random() * 6) + 1)}
        key={index}
      />
    ))}
  </>
);
