import React from 'react';

import { SkeletonItem } from 'Vendor/components';

import './ListRowSkeleton.less';

interface ListRowSkeleton {
  id: number;
}

export const ListRowSkeleton: React.FC<ListRowSkeleton> = ({ id }) => (
  <div className="ListRowSkeleton" data-test-id="ListRowSkeleton" key={id}>
    <div className="ListRowSkeleton-main">
      <SkeletonItem className="ListRowSkeleton-skeletonItem ListRowSkeleton-title" />
      <SkeletonItem className="ListRowSkeleton-skeletonItem ListRowSkeleton-description" />
    </div>
    <div className="ListRowSkeleton-tags">
      <SkeletonItem className="ListRowSkeleton-skeletonItem ListRowSkeleton-tag" />
      <SkeletonItem className="ListRowSkeleton-skeletonItem ListRowSkeleton-tag" />
      <SkeletonItem className="ListRowSkeleton-skeletonItem ListRowSkeleton-tag" />
    </div>
    <div className="ListRowSkeleton-icons">
      <SkeletonItem className="ListRowSkeleton-skeletonItem ListRowSkeleton-icon" />
      <SkeletonItem className="ListRowSkeleton-skeletonItem ListRowSkeleton-icon ListRowSkeleton-iconLarge" />
    </div>
  </div>
);

export default ListRowSkeleton;
