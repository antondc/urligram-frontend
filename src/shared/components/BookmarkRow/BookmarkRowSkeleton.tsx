import React from 'react';

import { Border, SkeletonItem } from 'Vendor/components';

import './BookmarkRowSkeleton.less';

interface BookmarkRowSkeleton {
  id: number;
}

export const BookmarkRowSkeleton: React.FC<BookmarkRowSkeleton> = ({ id }) => (
  <Border grow className="BookmarkRowSkeleton" data-test-id="BookmarkRowSkeleton" key={id}>
    <div className="BookmarkRowSkeleton-left">
      <div className="BookmarkRowSkeleton-icons">
        <SkeletonItem className="BookmarkRowSkeleton-icon" />
        <SkeletonItem className="BookmarkRowSkeleton-title" />
      </div>
      <SkeletonItem className="BookmarkRowSkeleton-url" />
    </div>
    <div className="BookmarkRowSkeleton-center">
      <SkeletonItem className="BookmarkRowSkeleton-tag" />
      <SkeletonItem className="BookmarkRowSkeleton-tag" />
      <SkeletonItem className="BookmarkRowSkeleton-tag" />
    </div>
    <div className="BookmarkRowSkeleton-right">
      <SkeletonItem className="BookmarkRowSkeleton-vote" />
      <SkeletonItem className="BookmarkRowSkeleton-stat" />
    </div>
  </Border>
);

export default BookmarkRowSkeleton;
