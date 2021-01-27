import React from 'react';

import { Border, Hr, SkeletonItem, Span } from '@antoniodcorrea/components';

import './UserRowSkeleton.less';

interface UserRowSkeleton {
  id: number;
}

export const UserRowSkeleton: React.FC<UserRowSkeleton> = ({ id }) => (
  <Border grow className="UserRowSkeleton" data-test-id="UserRowSkeleton" key={'UserRowSkeleton-' + id}>
    <div className="UserRowSkeleton-left">
      <div className="UserRowSkeleton-leftTop">
        <SkeletonItem hollow className="UserRowSkeleton-title" />
        <Hr spacer size="micro" />
        <Hr spacer size="micro" />
        <Hr spacer size="zero" />
        <Span size="nano">
          <SkeletonItem hollow className="UserRowSkeleton-detail" />
          <Span size="nano" className="UserRowSkeleton-dot">
            ·
          </Span>
          <SkeletonItem hollow className="UserRowSkeleton-detail" />
          <Span size="nano" className="UserRowSkeleton-dot">
            ·
          </Span>
          <SkeletonItem hollow className="UserRowSkeleton-detail" />
          <Span size="nano" className="UserRowSkeleton-dot">
            ·
          </Span>
          <SkeletonItem hollow className="UserRowSkeleton-detail" />
        </Span>
      </div>
      <div className="UserRowSkeleton-leftBottom">
        <SkeletonItem hollow className="UserRowSkeleton-tag" />
        <SkeletonItem hollow className="UserRowSkeleton-tag" />
        <SkeletonItem hollow className="UserRowSkeleton-tag" />
        <SkeletonItem hollow className="UserRowSkeleton-tag" />
      </div>
    </div>
    <div className="UserRowSkeleton-right">
      <SkeletonItem hollow className="UserRowSkeleton-image" />
    </div>
  </Border>
);

export default UserRowSkeleton;
