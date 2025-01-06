import React from 'react';

import { SkeletonItem } from '@antoniodcorrea/components';

import './BookmarkRowSkeleton.less';

interface BookmarkRowSkeleton {
  id: number;
}

export const BookmarkRowSkeleton: React.FC<BookmarkRowSkeleton> = ({ id }) => (
  <span className="BookmarkRowSkeleton" data-test-id="BookmarkRowSkeleton" key={id}>
    <span className="BookmarkRowSkeleton-title">
      <SkeletonItem className="BookmarkRowSkeleton-favicon" />
      <SkeletonItem className="BookmarkRowSkeleton-titleText" />
    </span>
    <SkeletonItem className="BookmarkRowSkeleton-description" />
    <span className="BookmarkRowSkeleton-tags">
      <SkeletonItem className="BookmarkRowSkeleton-tag" />
      <SkeletonItem className="BookmarkRowSkeleton-tag" />
      <SkeletonItem className="BookmarkRowSkeleton-tag" />
      <SkeletonItem className="BookmarkRowSkeleton-tag" />
    </span>
    <span className="BookmarkRowSkeleton-icons">
      <SkeletonItem className="BookmarkRowSkeleton-icon" />
      <SkeletonItem className="BookmarkRowSkeleton-icon" />
      <SkeletonItem className="BookmarkRowSkeleton-icon" />
    </span>
    <SkeletonItem className="BookmarkRowSkeleton-bookmarker" />
    <SkeletonItem className="BookmarkRowSkeleton-actions" />
  </span>
);
