import React from 'react';

import { Frame, SkeletonItem } from 'Vendor/components';

import './ListRowSkeleton.less';

interface ListRowSkeleton {
  id: number;
}

export const ListRowSkeleton: React.FC<ListRowSkeleton> = ({ id }) => (
  <Frame grow className="ListRowSkeleton" data-test-id="ListRowSkeleton" key={id} borders={false}>
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
  </Frame>
);

export default ListRowSkeleton;
