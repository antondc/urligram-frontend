import React from 'react';

import { SkeletonItem } from 'Vendor/components';

import './ListRowSkeleton.less';

interface ListRowSkeleton {
  id: number;
}

export const ListRowSkeleton: React.FC<ListRowSkeleton> = ({ id }) => (
  <div className="ListRowSkeleton" data-test-id="ListRowSkeleton" key={id}>
    <div className="ListRowSkeleton-main">
      <SkeletonItem className="ListRowSkeleton-title" />
      <SkeletonItem className="ListRowSkeleton-description" />
    </div>
    <div className="ListRowSkeleton-tags">
      <SkeletonItem className="ListRowSkeleton-tag" />
      <SkeletonItem className="ListRowSkeleton-tag" />
      <SkeletonItem className="ListRowSkeleton-tag" />
    </div>
    <div className="ListRowSkeleton-icons">
      <SkeletonItem className="ListRowSkeleton-icon" />
      <SkeletonItem className="ListRowSkeleton-icon ListRowSkeleton-iconLarge" />
    </div>
  </div>
);

export default ListRowSkeleton;
