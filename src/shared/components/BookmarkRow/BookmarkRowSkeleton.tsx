import React from 'react';

import { Border, SkeletonItem } from '@antoniodcorrea/components';

import './BookmarkRowSkeleton.less';

interface BookmarkRowSkeleton {
  id: number;
}

export const BookmarkRowSkeleton: React.FC<BookmarkRowSkeleton> = ({ id }) => (
  <Border grow className="BookmarkRowSkeleton" data-test-id="BookmarkRowSkeleton" key={id}>
    <div className="BookmarkRowSkeleton-left">
      <div className="BookmarkRowSkeleton-icons">
        <SkeletonItem className="BookmarkRowSkeleton-icon" />
        <SkeletonItem className="BookmarkRowSkeleton-icon" />
        <SkeletonItem className="BookmarkRowSkeleton-icon" />
      </div>
      <div className="BookmarkRowSkeleton-leftTop">
        <SkeletonItem className="BookmarkRowSkeleton-title" />
        <SkeletonItem className="BookmarkRowSkeleton-url" />
      </div>
      <div className="BookmarkRowSkeleton-tags">
        <SkeletonItem className="BookmarkRowSkeleton-tag" />
        <SkeletonItem className="BookmarkRowSkeleton-tag" />
        <SkeletonItem className="BookmarkRowSkeleton-tag" />
      </div>
    </div>
    <div className="BookmarkRowSkeleton-right">
      <SkeletonItem className="BookmarkRowSkeleton-image" />
      <div className="BookmarkRowSkeleton-rightEnd">
        <SkeletonItem className="BookmarkRowSkeleton-vote" />
        <div className="BookmarkRowSkeleton-stats">
          <SkeletonItem className="BookmarkRowSkeleton-stat" />
          <SkeletonItem className="BookmarkRowSkeleton-stat" />
        </div>
      </div>
    </div>
  </Border>
);

export default BookmarkRowSkeleton;
