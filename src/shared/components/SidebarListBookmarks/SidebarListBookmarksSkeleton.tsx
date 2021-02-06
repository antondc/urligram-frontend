import React from 'react';

import { Hr, SkeletonItem } from '@antoniodcorrea/components';

import './SidebarListBookmarksSkeleton.less';

export const SidebarListBookmarksSkeleton: React.FC = () => (
  <>
    <dd key={1} className="SidebarListBookmarksSkeleton-item">
      <SkeletonItem className="SidebarListBookmarksSkeleton-left" hollow />
      <SkeletonItem className="SidebarListBookmarksSkeleton-right" hollow />
    </dd>
    <Hr spacer size="small" />
    <dd key={2} className="SidebarListBookmarksSkeleton-item">
      <SkeletonItem className="SidebarListBookmarksSkeleton-left" hollow />
      <SkeletonItem className="SidebarListBookmarksSkeleton-right" hollow />
    </dd>
    <Hr spacer size="small" />
    <dd key={3} className="SidebarListBookmarksSkeleton-item">
      <SkeletonItem className="SidebarListBookmarksSkeleton-left" hollow />
      <SkeletonItem className="SidebarListBookmarksSkeleton-right" hollow />
    </dd>
    <Hr spacer size="small" />
    <dd key={4} className="SidebarListBookmarksSkeleton-item">
      <SkeletonItem className="SidebarListBookmarksSkeleton-left" hollow />
      <SkeletonItem className="SidebarListBookmarksSkeleton-right" hollow />
    </dd>
    <Hr spacer size="small" />
    <dd key={5} className="SidebarListBookmarksSkeleton-item">
      <SkeletonItem className="SidebarListBookmarksSkeleton-left" hollow />
      <SkeletonItem className="SidebarListBookmarksSkeleton-right" hollow />
    </dd>
  </>
);
