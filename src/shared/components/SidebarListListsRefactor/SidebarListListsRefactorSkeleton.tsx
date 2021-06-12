import React from 'react';

import { Hr, SkeletonItem } from 'Vendor/components';

export const SidebarListListsRefactorSkeleton: React.FC = () => (
  <>
    <SkeletonItem className="SidebarListListsRefactor-left" />
    <SkeletonItem className="SidebarListListsRefactor-right" />
    <Hr className="SidebarListListsRefactor-spacer" spacer size="small" />
    <SkeletonItem className="SidebarListListsRefactor-left" />
    <SkeletonItem className="SidebarListListsRefactor-right" />
    <Hr className="SidebarListListsRefactor-spacer" spacer size="small" />
    <SkeletonItem className="SidebarListListsRefactor-left" />
    <SkeletonItem className="SidebarListListsRefactor-right" />
    <Hr className="SidebarListListsRefactor-spacer" spacer size="small" />
    <SkeletonItem className="SidebarListListsRefactor-left" />
    <SkeletonItem className="SidebarListListsRefactor-right" />
    <Hr className="SidebarListListsRefactor-spacer" spacer size="small" />
    <SkeletonItem className="SidebarListListsRefactor-left" />
    <SkeletonItem className="SidebarListListsRefactor-right" />
  </>
);
