import React from 'react';

import { Frame, SkeletonItem } from 'Vendor/components';

import './BookmarkRowSkeleton.less';

interface BookmarkRowSkeleton {
  id: number;
}

export const BookmarkRowSkeleton: React.FC<BookmarkRowSkeleton> = ({ id }) => (
  <Frame
    grow
    className="BookmarkRowSkeleton"
    data-test-id="BookmarkRowSkeleton"
    key={id}
    borderTop={false}
    borderLeft={false}
    borderRight={false}
    borderBottom={false}
  >
    <div className="BookmarkRowSkeleton-main">
      <SkeletonItem className="BookmarkRowSkeleton-mainTitle" />
      <SkeletonItem className="BookmarkRowSkeleton-mainDetails" />
    </div>

    <div className="BookmarkRowSkeleton-icons">
      <SkeletonItem className="BookmarkRowSkeleton-icon" />
      <SkeletonItem className="BookmarkRowSkeleton-icon" />
      <SkeletonItem className="BookmarkRowSkeleton-icon" />
    </div>
    <div className="BookmarkRowSkeleton-tags">
      <SkeletonItem className="BookmarkRowSkeleton-tag" />
      <SkeletonItem className="BookmarkRowSkeleton-tag" />
      <SkeletonItem className="BookmarkRowSkeleton-tag" />
    </div>
  </Frame>
);

export default BookmarkRowSkeleton;
