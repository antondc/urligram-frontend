import React from 'react';

import { Hr, SkeletonItem } from 'Vendor/components';

export const RecentBookmarksReceivedSkeleton: React.FC = () => (
  <>
    <SkeletonItem className="RecentBookmarksReceived-title" />
    <Hr size="nano" spacer />
    <SkeletonItem className="RecentBookmarksReceived-title" />
    <Hr size="nano" spacer />
    <SkeletonItem className="RecentBookmarksReceived-title" />
    <Hr size="nano" spacer />
    <SkeletonItem className="RecentBookmarksReceived-title" />
    <Hr size="nano" spacer />
    <SkeletonItem className="RecentBookmarksReceived-title" />
  </>
);
