import React from 'react';

import { SkeletonItem } from 'Vendor/components';

import './BookmarkRowSkeleton.less';

interface BookmarkRowSkeleton {
  id: number;
}

export const BookmarkRowSkeleton: React.FC<BookmarkRowSkeleton> = ({ id }) => (
  <div className="BookmarkRowSkeleton" data-test-id="BookmarkRowSkeleton" key={id}>
    <SkeletonItem className="BookmarkRowSkeleton-title" />
    <SkeletonItem className="BookmarkRowSkeleton-details" />
    <div className="BookmarkRowSkeleton-tags">
      <SkeletonItem className="BookmarkRowSkeleton-tag" />
      <SkeletonItem className="BookmarkRowSkeleton-tag" />
      <SkeletonItem className="BookmarkRowSkeleton-tag" />
    </div>
    <div className="BookmarkRowSkeleton-icons">
      <div className="BookmarkRowSkeleton-iconsFirst">
        <SkeletonItem className="BookmarkRowSkeleton-icon" />
        <SkeletonItem className="BookmarkRowSkeleton-icon" />
      </div>
      <div className="BookmarkRowSkeleton-iconsSecond">
        <SkeletonItem className="BookmarkRowSkeleton-icon" />
        <SkeletonItem className="BookmarkRowSkeleton-icon" />
      </div>
    </div>
  </div>
);

export default BookmarkRowSkeleton;
