import React from 'react';

import { Border, Hr, SkeletonItem } from '@antoniodcorrea/components';

import './BookmarkRowSkeleton.less';

interface BookmarkRowSkeleton {
  id: number;
}

export const BookmarkRowSkeleton: React.FC<BookmarkRowSkeleton> = ({ id }) => (
  <Border grow className="BookmarkRowSkeleton" data-test-id="BookmarkRowSkeleton" key={id}>
    <div className="BookmarkRowSkeleton-left">
      <div className="BookmarkRowSkeleton-icons">
        <SkeletonItem hollow className="BookmarkRowSkeleton-icon" />
        <SkeletonItem hollow className="BookmarkRowSkeleton-icon" />
        <SkeletonItem hollow className="BookmarkRowSkeleton-icon" />
      </div>
      <div className="BookmarkRowSkeleton-leftTop">
        <SkeletonItem hollow className="BookmarkRowSkeleton-title" />
        <Hr spacer size="zero" />
        <SkeletonItem hollow className="BookmarkRowSkeleton-url" />
      </div>
      <div className="BookmarkRowSkeleton-tags">
        <SkeletonItem hollow className="BookmarkRowSkeleton-tag" />
        <SkeletonItem hollow className="BookmarkRowSkeleton-tag" />
        <SkeletonItem hollow className="BookmarkRowSkeleton-tag" />
        <SkeletonItem hollow className="BookmarkRowSkeleton-tag" />
      </div>
    </div>
    <div className="BookmarkRowSkeleton-right">
      <SkeletonItem hollow className="BookmarkRowSkeleton-image" />
      <div className="BookmarkRowSkeleton-rightEnd">
        <SkeletonItem hollow className="BookmarkRowSkeleton-vote" />
        <div className="BookmarkRowSkeleton-stats">
          <SkeletonItem hollow className="BookmarkRowSkeleton-stat" />
          <SkeletonItem hollow className="BookmarkRowSkeleton-stat" />
        </div>
      </div>
    </div>
  </Border>
);

export default BookmarkRowSkeleton;
