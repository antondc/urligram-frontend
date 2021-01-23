import React from 'react';

import { Border, Hr, SkeletonItem, Span } from '@antoniodcorrea/components';

import './ListRowSkeleton.less';

interface ListRowSkeleton {
  id: number;
}

export const ListRowSkeleton: React.FC<ListRowSkeleton> = ({ id }) => (
  <Border grow className="ListRowSkeleton" data-test-id="ListRowSkeleton" key={'ListRowSkeleton-' + id}>
    <div className="ListRowSkeleton-left">
      <div className="ListRowSkeleton-leftTop">
        <div className="ListRowSkeleton-icons">
          <SkeletonItem hollow className="ListRowSkeleton-icon" />
          <SkeletonItem hollow className="ListRowSkeleton-icon" />
          <SkeletonItem hollow className="ListRowSkeleton-icon" />
        </div>
        <Hr spacer size="micro" />
        <SkeletonItem hollow className="ListRowSkeleton-title" />

        <Hr spacer size="micro" />
        <Span size="nano">
          <SkeletonItem hollow className="UserRowSkeleton-detail" />
          <Span size="nano" className="UserRowSkeleton-dot">
            ·
          </Span>
          <SkeletonItem hollow className="UserRowSkeleton-detail" />
          <Span size="nano" className="UserRowSkeleton-dot">
            ·
          </Span>
          <SkeletonItem hollow className="UserRowSkeleton-detail" />
        </Span>
      </div>
      <div className="ListRowSkeleton-leftBottom">
        <SkeletonItem hollow className="ListRowSkeleton-tag" />
        <SkeletonItem hollow className="ListRowSkeleton-tag" />
        <SkeletonItem hollow className="ListRowSkeleton-tag" />
      </div>
    </div>
    <div className="ListRowSkeleton-right">
      <SkeletonItem hollow className="ListRowSkeleton-image" />

      <div className="ListRow-rightEnd">
        <div className="ListRow-stats">
          <SkeletonItem hollow className="ListRowSkeleton-stat" />
          <SkeletonItem hollow className="ListRowSkeleton-stat" />
        </div>
      </div>
    </div>
  </Border>
);

export default ListRowSkeleton;
