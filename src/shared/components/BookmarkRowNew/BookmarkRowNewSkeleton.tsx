import React from 'react';

import { SkeletonItem } from '@antoniodcorrea/components';

import './BookmarkRowNewSkeleton.less';

interface BookmarkRowNewSkeleton {
  id: number;
}

export const BookmarkRowNewSkeleton: React.FC<BookmarkRowNewSkeleton> = ({ id }) => (
  <span className="BookmarkRowNewSkeleton" data-test-id="BookmarkRowNewSkeleton" key={id}>
    <span className="BookmarkRowNewSkeleton-title">
      <SkeletonItem className="BookmarkRowNewSkeleton-favicon" />
      <SkeletonItem className="BookmarkRowNewSkeleton-titleText" />
    </span>
    <SkeletonItem className="BookmarkRowNewSkeleton-description" />
    <span className="BookmarkRowNewSkeleton-tags">
      <SkeletonItem className="BookmarkRowNewSkeleton-tag" />
      <SkeletonItem className="BookmarkRowNewSkeleton-tag" />
      <SkeletonItem className="BookmarkRowNewSkeleton-tag" />
      <SkeletonItem className="BookmarkRowNewSkeleton-tag" />
    </span>
    <span className="BookmarkRowNewSkeleton-icons">
      <SkeletonItem className="BookmarkRowNewSkeleton-icon" />
      <SkeletonItem className="BookmarkRowNewSkeleton-icon" />
      <SkeletonItem className="BookmarkRowNewSkeleton-icon" />
    </span>
    <SkeletonItem className="BookmarkRowNewSkeleton-bookmarker" />
    <SkeletonItem className="BookmarkRowNewSkeleton-actions" />
  </span>
);
