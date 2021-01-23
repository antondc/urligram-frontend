import React from 'react';

import { Border } from '@antoniodcorrea/components';

import './BookmarkRowSkeleton.less';

interface BookmarkRowSkeleton {
  id: number;
}

export const BookmarkRowSkeleton: React.FC<BookmarkRowSkeleton> = ({ id }) => (
  <Border grow className="BookmarkRowSkeleton" data-test-id="BookmarkRowSkeleton" key={id}>
    <div className="BookmarkRowSkeleton-left">
      <div className="BookmarkRowSkeleton-icons">
        <div className="BookmarkRowSkeleton-icon" />
        <div className="BookmarkRowSkeleton-icon" />
        <div className="BookmarkRowSkeleton-icon" />
      </div>
      <div className="BookmarkRowSkeleton-leftTop">
        <div className="BookmarkRowSkeleton-title" />
        <div className="BookmarkRowSkeleton-url" />
      </div>
      <div className="BookmarkRowSkeleton-tags">
        <div className="BookmarkRowSkeleton-tag" />
        <div className="BookmarkRowSkeleton-tag" />
      </div>
    </div>
    <div className="BookmarkRowSkeleton-right">
      <div className="BookmarkRowSkeleton-image" />
      <div className="BookmarkRowSkeleton-rightEnd">
        <div className="BookmarkRowSkeleton-vote" />
        <div className="BookmarkRowSkeleton-stats">
          <div className="BookmarkRowSkeleton-stat" />
          <div className="BookmarkRowSkeleton-stat" />
          <div className="BookmarkRowSkeleton-stat" />
        </div>
      </div>
    </div>
  </Border>
);

export default BookmarkRowSkeleton;
