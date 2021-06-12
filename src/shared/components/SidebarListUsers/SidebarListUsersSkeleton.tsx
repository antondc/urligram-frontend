import React from 'react';

import { Hr, SkeletonItem } from 'Vendor/components';

import './SidebarListUsersSkeleton.less';

export const SidebarListUsersSkeleton: React.FC = () => (
  <>
    <SkeletonItem className="SidebarListUsersSkeleton-left" />
    <SkeletonItem className="SidebarListUsersSkeleton-right" />
    <SkeletonItem className="SidebarListUsersSkeleton-right" />
    <SkeletonItem className="SidebarListUsersSkeleton-right" />
    <Hr spacer size="small" className="SidebarListUsers-spacer" />
    <SkeletonItem className="SidebarListUsersSkeleton-left" />
    <SkeletonItem className="SidebarListUsersSkeleton-right" />
    <SkeletonItem className="SidebarListUsersSkeleton-right" />
    <SkeletonItem className="SidebarListUsersSkeleton-right" />
    <Hr spacer size="small" className="SidebarListUsers-spacer" />
    <SkeletonItem className="SidebarListUsersSkeleton-left" />
    <SkeletonItem className="SidebarListUsersSkeleton-right" />
    <SkeletonItem className="SidebarListUsersSkeleton-right" />
    <SkeletonItem className="SidebarListUsersSkeleton-right" />
    <Hr spacer size="small" className="SidebarListUsers-spacer" />
    <SkeletonItem className="SidebarListUsersSkeleton-left" />
    <SkeletonItem className="SidebarListUsersSkeleton-right" />
    <SkeletonItem className="SidebarListUsersSkeleton-right" />
    <SkeletonItem className="SidebarListUsersSkeleton-right" />
    <Hr spacer size="small" className="SidebarListUsers-spacer" />
    <SkeletonItem className="SidebarListUsersSkeleton-left" />
    <SkeletonItem className="SidebarListUsersSkeleton-right" />
    <SkeletonItem className="SidebarListUsersSkeleton-right" />
    <SkeletonItem className="SidebarListUsersSkeleton-right" />
  </>
);
