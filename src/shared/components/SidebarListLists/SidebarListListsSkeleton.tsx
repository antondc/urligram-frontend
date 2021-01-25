import React from 'react';

import { Hr, SkeletonItem } from '@antoniodcorrea/components';

import './SidebarListListsSkeleton.less';

export const SidebarListListsSkeleton: React.FC = () => (
  <>
    <dd key={1} className="SidebarListListsSkeleton-item">
      <SkeletonItem className="SidebarListListsSkeleton-left" hollow />
      <SkeletonItem className="SidebarListListsSkeleton-right" hollow />
    </dd>
    <Hr spacer size="small" />
    <dd key={2} className="SidebarListListsSkeleton-item">
      <SkeletonItem className="SidebarListListsSkeleton-left" hollow />
      <SkeletonItem className="SidebarListListsSkeleton-right" hollow />
    </dd>
    <Hr spacer size="small" />
    <dd key={3} className="SidebarListListsSkeleton-item">
      <SkeletonItem className="SidebarListListsSkeleton-left" hollow />
      <SkeletonItem className="SidebarListListsSkeleton-right" hollow />
    </dd>
    <Hr spacer size="small" />
    <dd key={4} className="SidebarListListsSkeleton-item">
      <SkeletonItem className="SidebarListListsSkeleton-left" hollow />
      <SkeletonItem className="SidebarListListsSkeleton-right" hollow />
    </dd>
    <Hr spacer size="small" />
    <dd key={5} className="SidebarListListsSkeleton-item">
      <SkeletonItem className="SidebarListListsSkeleton-left" hollow />
      <SkeletonItem className="SidebarListListsSkeleton-right" hollow />
    </dd>
  </>
);
