import React from 'react';

import { SkeletonItem } from 'Vendor/components';

import './SidebarListTagsRefactorSkeleton.less';

export const SidebarListTagsRefactorSkeleton: React.FC = () => (
  <>
    <SkeletonItem className="SidebarListTagsRefactorSkeleton-item SidebarListTagsRefactorSkeleton-item1" />
    <SkeletonItem className="SidebarListTagsRefactorSkeleton-item SidebarListTagsRefactorSkeleton-item2" />
    <SkeletonItem className="SidebarListTagsRefactorSkeleton-item SidebarListTagsRefactorSkeleton-item3" />
    <SkeletonItem className="SidebarListTagsRefactorSkeleton-item SidebarListTagsRefactorSkeleton-item4" />
    <SkeletonItem className="SidebarListTagsRefactorSkeleton-item SidebarListTagsRefactorSkeleton-item5" />
    <SkeletonItem className="SidebarListTagsRefactorSkeleton-item SidebarListTagsRefactorSkeleton-item6" />
    <SkeletonItem className="SidebarListTagsRefactorSkeleton-item SidebarListTagsRefactorSkeleton-item7" />
    <SkeletonItem className="SidebarListTagsRefactorSkeleton-item SidebarListTagsRefactorSkeleton-item8" />
  </>
);
