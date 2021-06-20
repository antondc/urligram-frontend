import React from 'react';

import { Hr, SkeletonItem } from 'Vendor/components';

export const SidebarListBookmarksSkeleton: React.FC = () => (
  <>
    <SkeletonItem className="SidebarListBookmarks-title" />
    <SkeletonItem className="SidebarListBookmarks-descriptionItem" />
    <SkeletonItem className="SidebarListBookmarks-descriptionItem" />
    <SkeletonItem className="SidebarListBookmarks-title" />
    <SkeletonItem className="SidebarListBookmarks-descriptionItem" />
    <SkeletonItem className="SidebarListBookmarks-descriptionItem" />
    <SkeletonItem className="SidebarListBookmarks-title" />
    <SkeletonItem className="SidebarListBookmarks-descriptionItem" />
    <SkeletonItem className="SidebarListBookmarks-descriptionItem" />
    <SkeletonItem className="SidebarListBookmarks-title" />
    <SkeletonItem className="SidebarListBookmarks-descriptionItem" />
    <SkeletonItem className="SidebarListBookmarks-descriptionItem" />
    <SkeletonItem className="SidebarListBookmarks-title" />
    <SkeletonItem className="SidebarListBookmarks-descriptionItem" />
    <SkeletonItem className="SidebarListBookmarks-descriptionItem" />
  </>
);
