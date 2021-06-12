import React from 'react';

import { Hr, SkeletonItem } from 'Vendor/components';

import './SidebarListBookmarksRefactorSkeleton.less';

export const SidebarListBookmarksRefactorSkeleton: React.FC = () => (
  <>
    <dd key={1} className="SidebarListBookmarksRefactorSkeleton-item">
      <SkeletonItem className="SidebarListBookmarksRefactorSkeleton-left" hollow />
      <SkeletonItem className="SidebarListBookmarksRefactorSkeleton-right" hollow />
    </dd>
    <Hr spacer size="small" />
    <dd key={2} className="SidebarListBookmarksRefactorSkeleton-item">
      <SkeletonItem className="SidebarListBookmarksRefactorSkeleton-left" hollow />
      <SkeletonItem className="SidebarListBookmarksRefactorSkeleton-right" hollow />
    </dd>
    <Hr spacer size="small" />
    <dd key={3} className="SidebarListBookmarksRefactorSkeleton-item">
      <SkeletonItem className="SidebarListBookmarksRefactorSkeleton-left" hollow />
      <SkeletonItem className="SidebarListBookmarksRefactorSkeleton-right" hollow />
    </dd>
    <Hr spacer size="small" />
    <dd key={4} className="SidebarListBookmarksRefactorSkeleton-item">
      <SkeletonItem className="SidebarListBookmarksRefactorSkeleton-left" hollow />
      <SkeletonItem className="SidebarListBookmarksRefactorSkeleton-right" hollow />
    </dd>
    <Hr spacer size="small" />
    <dd key={5} className="SidebarListBookmarksRefactorSkeleton-item">
      <SkeletonItem className="SidebarListBookmarksRefactorSkeleton-left" hollow />
      <SkeletonItem className="SidebarListBookmarksRefactorSkeleton-right" hollow />
    </dd>
  </>
);
