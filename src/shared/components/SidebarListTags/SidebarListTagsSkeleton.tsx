import React from 'react';

import { Tag } from 'Vendor/components';

import './SidebarListTagsSkeleton.less';

export const SidebarListTagsSkeleton: React.FC = () => (
  <>
    <Tag className="SidebarListTagsSkeleton-item" key={1} size="medium" variant="simple">
      1234
    </Tag>
    <Tag className="SidebarListTagsSkeleton-item" key={2} size="medium" variant="simple">
      12345
    </Tag>
    <Tag className="SidebarListTagsSkeleton-item" key={3} size="medium" variant="simple">
      123
    </Tag>
    <Tag className="SidebarListTagsSkeleton-item" key={4} size="medium" variant="simple">
      123456
    </Tag>
    <Tag className="SidebarListTagsSkeleton-item" key={5} size="medium" variant="simple">
      123
    </Tag>
    <Tag className="SidebarListTagsSkeleton-item" key={6} size="medium" variant="simple">
      12345
    </Tag>
    <Tag className="SidebarListTagsSkeleton-item" key={7} size="medium" variant="simple">
      123456
    </Tag>
    <Tag className="SidebarListTagsSkeleton-item" key={8} size="medium" variant="simple">
      123
    </Tag>
  </>
);
