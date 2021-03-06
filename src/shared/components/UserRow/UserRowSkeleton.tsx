import React from 'react';

import { Border, Hr, SkeletonItem, Span } from '@antoniodcorrea/components';

import './UserRowSkeleton.less';

interface UserRowSkeleton {
  id: number;
}

export const UserRowSkeleton: React.FC<UserRowSkeleton> = ({ id }) => (
  <Border grow className="UserRowSkeleton" data-test-id="UserRowSkeleton" key={'UserRowSkeleton-' + id}>
    <div className="UserRowSkeleton-left">
      <SkeletonItem className="UserRowSkeleton-title" />
      <SkeletonItem className="UserRowSkeleton-details" />
    </div>
    <div className="UserRowSkeleton-center">
      <SkeletonItem className="UserRowSkeleton-tag UserRowSkeleton-tag1" />
      <SkeletonItem className="UserRowSkeleton-tag UserRowSkeleton-tag2" />
      <SkeletonItem className="UserRowSkeleton-tag UserRowSkeleton-tag3" />
      <SkeletonItem className="UserRowSkeleton-tag UserRowSkeleton-tag1" />
      <SkeletonItem className="UserRowSkeleton-tag UserRowSkeleton-tag1" />
      <SkeletonItem className="UserRowSkeleton-tag UserRowSkeleton-tag2" />
      <SkeletonItem className="UserRowSkeleton-tag UserRowSkeleton-tag3" />
      <SkeletonItem className="UserRowSkeleton-tag UserRowSkeleton-tag1" />
      <SkeletonItem className="UserRowSkeleton-tag UserRowSkeleton-tag1" />
      <SkeletonItem className="UserRowSkeleton-tag UserRowSkeleton-tag1" />
      <SkeletonItem className="UserRowSkeleton-tag UserRowSkeleton-tag2" />
    </div>
    <div className="UserRowSkeleton-right">
      <SkeletonItem className="UserRowSkeleton-image" />
    </div>
  </Border>
);

export default UserRowSkeleton;
