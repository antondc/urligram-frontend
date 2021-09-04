import React from 'react';

import { SkeletonItem } from 'Vendor/components';

import './BookmarkRowSkeleton.less';

interface BookmarkRowSkeleton {
  id: number;
}

export const BookmarkRowSkeleton: React.FC<BookmarkRowSkeleton> = ({ id }) => (
  <div className="BookmarkRowSkeleton" data-test-id="BookmarkRowSkeleton" key={id}>
    <div className="BookmarkRowSkeleton-title">
      <SkeletonItem className="BookmarkRowSkeleton-favicon" />
      <SkeletonItem className="BookmarkRowSkeleton-titleText" />
    </div>
    <SkeletonItem className="BookmarkRowSkeleton-details" />
    <div className="BookmarkRowSkeleton-tags">
      <SkeletonItem className="BookmarkRowSkeleton-tag" />
      <SkeletonItem className="BookmarkRowSkeleton-tag" />
      <SkeletonItem className="BookmarkRowSkeleton-tag" />
      <SkeletonItem className="BookmarkRowSkeleton-tag" />
    </div>
    <div className="BookmarkRowSkeleton-icons">
      <SkeletonItem className="BookmarkRowSkeleton-icon" />
      <SkeletonItem className="BookmarkRowSkeleton-icon" />
      <SkeletonItem className="BookmarkRowSkeleton-icon" />
    </div>
  </div>
);

export default BookmarkRowSkeleton;
