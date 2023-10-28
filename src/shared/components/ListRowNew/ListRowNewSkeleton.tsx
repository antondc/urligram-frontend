import React from 'react';

import { SkeletonItem } from '@antoniodcorrea/components';

import './ListRowNewSkeleton.less';

interface ListRowNewSkeleton {
  id: number;
}

export const ListRowNewSkeleton: React.FC<ListRowNewSkeleton> = ({ id }) => (
  <div className="ListRowNewSkeleton" data-test-id="ListRowNewSkeleton" key={id}>
    <div className="ListRowNewSkeleton-title">
      <SkeletonItem className="ListRowNewSkeleton-favicon" />
      <SkeletonItem className="ListRowNewSkeleton-titleText" />
    </div>
    <SkeletonItem className="ListRowNewSkeleton-details" />
    <div className="ListRowNewSkeleton-tags">
      <SkeletonItem className="ListRowNewSkeleton-tag" />
      <SkeletonItem className="ListRowNewSkeleton-tag" />
      <SkeletonItem className="ListRowNewSkeleton-tag" />
      <SkeletonItem className="ListRowNewSkeleton-tag" />
    </div>
    <div className="ListRowNewSkeleton-icons">
      <SkeletonItem className="ListRowNewSkeleton-icon" />
    </div>
  </div>
);
