import React from 'react';

import { SkeletonItem } from '@antoniodcorrea/components';

import './ListRowSkeleton.less';

interface ListRowSkeleton {
  id: number;
}

export const ListRowSkeleton: React.FC<ListRowSkeleton> = ({ id }) => (
  <div className="ListRowSkeleton" data-test-id="ListRowSkeleton" key={id}>
    <div className="ListRowSkeleton-title">
      <SkeletonItem className="ListRowSkeleton-favicon" />
      <SkeletonItem className="ListRowSkeleton-titleText" />
    </div>
    <SkeletonItem className="ListRowSkeleton-details" />
    <div className="ListRowSkeleton-tags">
      <SkeletonItem className="ListRowSkeleton-tag" />
      <SkeletonItem className="ListRowSkeleton-tag" />
      <SkeletonItem className="ListRowSkeleton-tag" />
      <SkeletonItem className="ListRowSkeleton-tag" />
    </div>
    <div className="ListRowSkeleton-icons">
      <SkeletonItem className="ListRowSkeleton-icon" />
    </div>
  </div>
);
