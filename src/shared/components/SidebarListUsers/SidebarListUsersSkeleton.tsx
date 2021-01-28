import React from 'react';

import { Hr, SkeletonItem } from '@antoniodcorrea/components';

import './SidebarListUsersSkeleton.less';

export const SidebarListUsersSkeleton: React.FC = () => (
  <>
    <dd key={1} className="SidebarListUsersSkeleton-item">
      <SkeletonItem className="SidebarListUsersSkeleton-left" hollow />
      <SkeletonItem className="SidebarListUsersSkeleton-right" hollow />
    </dd>
    <Hr spacer size="small" />
    <dd key={2} className="SidebarListUsersSkeleton-item">
      <SkeletonItem className="SidebarListUsersSkeleton-left" hollow />
      <SkeletonItem className="SidebarListUsersSkeleton-right" hollow />
    </dd>
    <Hr spacer size="small" />
    <dd key={3} className="SidebarListUsersSkeleton-item">
      <SkeletonItem className="SidebarListUsersSkeleton-left" hollow />
      <SkeletonItem className="SidebarListUsersSkeleton-right" hollow />
    </dd>
    <Hr spacer size="small" />
    <dd key={4} className="SidebarListUsersSkeleton-item">
      <SkeletonItem className="SidebarListUsersSkeleton-left" hollow />
      <SkeletonItem className="SidebarListUsersSkeleton-right" hollow />
    </dd>
    <Hr spacer size="small" />
    <dd key={5} className="SidebarListUsersSkeleton-item">
      <SkeletonItem className="SidebarListUsersSkeleton-left" hollow />
      <SkeletonItem className="SidebarListUsersSkeleton-right" hollow />
    </dd>
  </>
);
