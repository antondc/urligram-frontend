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
          <SkeletonItem className="ListRowSkeleton-icon" />
          <SkeletonItem className="ListRowSkeleton-icon" />
          <SkeletonItem className="ListRowSkeleton-icon" />
        </div>
        <Hr spacer size="micro" />
        <SkeletonItem className="ListRowSkeleton-title" />

        <Hr spacer size="micro" />
        <Span size="nano">
          <SkeletonItem className="UserRowSkeleton-detail" />
          <Span size="nano" className="UserRowSkeleton-dot">
            ·
          </Span>
          <SkeletonItem className="UserRowSkeleton-detail" />
          <Span size="nano" className="UserRowSkeleton-dot">
            ·
          </Span>
          <SkeletonItem className="UserRowSkeleton-detail" />
        </Span>
      </div>
      <div className="ListRowSkeleton-leftBottom">
        <SkeletonItem className="ListRowSkeleton-tag" />
        <SkeletonItem className="ListRowSkeleton-tag" />
        <SkeletonItem className="ListRowSkeleton-tag" />
      </div>
    </div>
    <div className="ListRowSkeleton-right">
      <SkeletonItem className="ListRowSkeleton-image" />

      <div className="ListRow-rightEnd">
        <div className="ListRow-stats">
          <SkeletonItem className="ListRowSkeleton-stat" />
          <SkeletonItem className="ListRowSkeleton-stat" />
        </div>
      </div>
    </div>
  </Border>
);

export default ListRowSkeleton;
