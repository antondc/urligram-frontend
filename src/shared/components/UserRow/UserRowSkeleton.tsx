import React from 'react';

import { Border, Hr, SkeletonItem, Span } from '@antoniodcorrea/components';

import './UserRowSkeleton.less';

interface UserRowSkeleton {
  id: string;
}

export const UserRowSkeleton: React.FC<UserRowSkeleton> = ({ id }) => (
  <Border grow className="UserRowSkeleton" data-test-id="UserRowSkeleton" key={'UserRowSkeleton-' + id}>
    <div className="UserRowSkeleton-left">
      <div className="UserRowSkeleton-leftTop">
        <SkeletonItem className="UserRowSkeleton-title" />
        <Hr spacer size="micro" />
        <Hr spacer size="micro" />
        <Hr spacer size="zero" />
        <Span size="nano">
          <SkeletonItem className="UserRowSkeleton-detail" />
          <Span size="nano" className="UserRowSkeleton-dot">
            ·
          </Span>
          <SkeletonItem className="UserRowSkeleton-detail" />
          <Span size="nano" className="UserRowSkeleton-dot">
            ·
          </Span>
          <SkeletonItem className="UserRowSkeleton-detail" />
          <Span size="nano" className="UserRowSkeleton-dot">
            ·
          </Span>
          <SkeletonItem className="UserRowSkeleton-detail" />
        </Span>
      </div>
      <div className="UserRowSkeleton-leftBottom">
        <SkeletonItem className="UserRowSkeleton-tag" />
        <SkeletonItem className="UserRowSkeleton-tag" />
        <SkeletonItem className="UserRowSkeleton-tag" />
        <SkeletonItem className="UserRowSkeleton-tag" />
      </div>
    </div>
    <div className="UserRowSkeleton-right">
      <SkeletonItem className="UserRowSkeleton-image" />
    </div>
  </Border>
);

export default UserRowSkeleton;
