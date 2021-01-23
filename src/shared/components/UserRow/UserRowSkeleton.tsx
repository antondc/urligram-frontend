import React from 'react';

import { UserState } from 'Modules/Users/users.types';
import { A, Border, Hr, SkeletonItem, Span, Tag } from '@antoniodcorrea/components';

import './UserRowSkeleton.less';

interface UserRowSkeleton extends UserState {
  id: string;
  connections: number;
  ammountLists: number;
  ammountBookmarks: number;
  sinceTranslation: string;
}

export const UserRowSkeleton: React.FC<UserRowSkeleton> = ({
  id,
  name,
  image,
  tags,
  createdAt,
  connections,
  ammountLists,
  ammountBookmarks,
  sinceTranslation,
}) => (
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
