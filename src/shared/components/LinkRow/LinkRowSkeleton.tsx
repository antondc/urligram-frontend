import React from 'react';

import { Border, SkeletonItem } from '@antoniodcorrea/components';

import './LinkRowSkeleton.less';

interface LinkRowSkeleton {
  id: number;
}

export const LinkRowSkeleton: React.FC<LinkRowSkeleton> = ({ id }) => (
  <Border grow className="LinkRowSkeleton" data-test-id="LinkRowSkeleton" key={id}>
    <div className="LinkRowSkeleton-left">
      <div className="LinkRowSkeleton-icons">
        <SkeletonItem className="BookmarkRowSkeleton-icon" />
        <SkeletonItem className="BookmarkRowSkeleton-icon" />
        <SkeletonItem className="BookmarkRowSkeleton-icon" />
      </div>
      <div className="LinkRowSkeleton-leftTop">
        <SkeletonItem className="BookmarkRowSkeleton-title" />
        <SkeletonItem className="BookmarkRowSkeleton-url" />
      </div>
      <div className="LinkRowSkeleton-tags">
        <SkeletonItem className="BookmarkRowSkeleton-tag" />
        <SkeletonItem className="BookmarkRowSkeleton-tag" />
        <SkeletonItem className="BookmarkRowSkeleton-tag" />
      </div>
    </div>
    <div className="LinkRowSkeleton-right">
      <SkeletonItem className="BookmarkRowSkeleton-image" />
      <div className="LinkRowSkeleton-rightEnd">
        <SkeletonItem className="BookmarkRowSkeleton-vote" />
        <div className="LinkRowSkeleton-stats">
          <SkeletonItem className="BookmarkRowSkeleton-stat" />
          <SkeletonItem className="BookmarkRowSkeleton-stat" />
        </div>
      </div>
    </div>
  </Border>
);

export default LinkRowSkeleton;
