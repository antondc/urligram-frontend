import React from 'react';

import { Frame, SkeletonItem } from 'Vendor/components';

import './ListRowSkeleton.less';

interface ListRowSkeleton {
  id: number;
}

export const ListRowSkeleton: React.FC<ListRowSkeleton> = ({ id }) => (
  <Frame grow className="ListRowSkeleton" data-test-id="ListRowSkeleton" key={id}>
    <div className="ListRowSkeleton-left">
      <div className="ListRowSkeleton-icons">
        <SkeletonItem className="ListRowSkeleton-icon" />
        <SkeletonItem className="ListRowSkeleton-title" />
      </div>
      <SkeletonItem className="ListRowSkeleton-url" />
    </div>
    <div className="ListRowSkeleton-center">
      <SkeletonItem className="ListRowSkeleton-tag" />
      <SkeletonItem className="ListRowSkeleton-tag" />
      <SkeletonItem className="ListRowSkeleton-tag" />
    </div>
    <div className="ListRowSkeleton-right">
      <SkeletonItem className="ListRowSkeleton-vote" />
      <SkeletonItem className="ListRowSkeleton-stat" />
    </div>
  </Frame>
);

export default ListRowSkeleton;
