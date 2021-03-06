import React from 'react';

import { Border, Hr, SkeletonItem, Span } from '@antoniodcorrea/components';

import './ListRowSkeleton.less';

interface ListRowSkeleton {
  id?: number;
}

export const ListRowSkeleton: React.FC<ListRowSkeleton> = ({ id }) => (
  <Border grow className="ListRowSkeleton" data-test-id="ListRowSkeleton" key={'ListRowSkeleton-' + id}>
    <div className="ListRowSkeleton-left">
      <SkeletonItem className="ListRowSkeleton-icons" />
      <SkeletonItem className="ListRowSkeleton-title" />
      <SkeletonItem className="ListRowSkeleton-description" />
    </div>
    <div className="UserRowSkeleton-center">
      <SkeletonItem className="UserRowSkeleton-tag UserRowSkeleton-tag1" />
      <SkeletonItem className="UserRowSkeleton-tag UserRowSkeleton-tag2" />
      <SkeletonItem className="UserRowSkeleton-tag UserRowSkeleton-tag3" />
      <SkeletonItem className="UserRowSkeleton-tag UserRowSkeleton-tag1" />
      <SkeletonItem className="UserRowSkeleton-tag UserRowSkeleton-tag1" />
      <SkeletonItem className="UserRowSkeleton-tag UserRowSkeleton-tag2" />
      <SkeletonItem className="UserRowSkeleton-tag UserRowSkeleton-tag3" />
      <SkeletonItem className="UserRowSkeleton-tag UserRowSkeleton-tag1" />
      <SkeletonItem className="UserRowSkeleton-tag UserRowSkeleton-tag1" />
      <SkeletonItem className="UserRowSkeleton-tag UserRowSkeleton-tag1" />
      <SkeletonItem className="UserRowSkeleton-tag UserRowSkeleton-tag2" />
    </div>
    <div className="ListRowSkeleton-right">
      <SkeletonItem className="ListRowSkeleton-stat" />
      <SkeletonItem className="ListRowSkeleton-stat" />
      <SkeletonItem className="ListRowSkeleton-stat" />
    </div>
  </Border>
);

export default ListRowSkeleton;
