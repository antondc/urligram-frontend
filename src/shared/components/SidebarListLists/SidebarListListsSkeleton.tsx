import React from 'react';

import { Hr, SkeletonItem } from 'Vendor/components';

export const SidebarListListsSkeleton: React.FC = () => (
  <>
    <SkeletonItem className="SidebarListLists-title" />
    <SkeletonItem className="SidebarListLists-descriptionItem" />
    <SkeletonItem className="SidebarListLists-descriptionItem" />
    <Hr className="SidebarListLists-spacer" spacer size="small" />
    <SkeletonItem className="SidebarListLists-title" />
    <SkeletonItem className="SidebarListLists-descriptionItem" />
    <SkeletonItem className="SidebarListLists-descriptionItem" />
    <Hr className="SidebarListLists-spacer" spacer size="small" />
    <SkeletonItem className="SidebarListLists-title" />
    <SkeletonItem className="SidebarListLists-descriptionItem" />
    <SkeletonItem className="SidebarListLists-descriptionItem" />
    <Hr className="SidebarListLists-spacer" spacer size="small" />
    <SkeletonItem className="SidebarListLists-title" />
    <SkeletonItem className="SidebarListLists-descriptionItem" />
    <SkeletonItem className="SidebarListLists-descriptionItem" />
    <Hr className="SidebarListLists-spacer" spacer size="small" />
    <SkeletonItem className="SidebarListLists-title" />
    <SkeletonItem className="SidebarListLists-descriptionItem" />
    <SkeletonItem className="SidebarListLists-descriptionItem" />
  </>
);
