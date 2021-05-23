import React from 'react';

import { SkeletonItem } from 'Vendor/components';

import './SidebarListTagsSkeleton.less';

export const SidebarListTagsSkeleton: React.FC = () => (
  <>
    <SkeletonItem className="SidebarListTagsSkeleton-item SidebarListTagsSkeleton-item1" />
    <SkeletonItem className="SidebarListTagsSkeleton-item SidebarListTagsSkeleton-item2" />
    <SkeletonItem className="SidebarListTagsSkeleton-item SidebarListTagsSkeleton-item3" />
    <SkeletonItem className="SidebarListTagsSkeleton-item SidebarListTagsSkeleton-item4" />
    <SkeletonItem className="SidebarListTagsSkeleton-item SidebarListTagsSkeleton-item5" />
    <SkeletonItem className="SidebarListTagsSkeleton-item SidebarListTagsSkeleton-item6" />
    <SkeletonItem className="SidebarListTagsSkeleton-item SidebarListTagsSkeleton-item7" />
    <SkeletonItem className="SidebarListTagsSkeleton-item SidebarListTagsSkeleton-item8" />
  </>
);
