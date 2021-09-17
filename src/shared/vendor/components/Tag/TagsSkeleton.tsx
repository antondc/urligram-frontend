import React, { memo } from 'react';

import { SkeletonItem } from 'Vendor/components';

import './TagsSkeleton.less';

interface Props {
  length?: number;
}

export const TagsSkeleton: React.FC<Props> = ({ length = 10 }) => (
  <>
    {Array.from({ length }, (_, index) => (
      <SkeletonItem
        className={'TagsSkeleton-item TagsSkeleton-item' + (Math.floor(Math.random() * 6) + 1)}
        key={index}
      />
    ))}
  </>
);

export const TagsSkeletonWithMemo = memo(TagsSkeleton);
