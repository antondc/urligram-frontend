import React from 'react';

import { Tag } from 'Vendor/components';

import './SidebarListTagsSkeleton.less';

export const SidebarListTagsSkeleton: React.FC = () => (
  <>
    <Tag className="SidebarListTagsSkeleton-item" key={1} size="big">
      1234
    </Tag>
    <Tag className="SidebarListTagsSkeleton-item" key={2} size="big">
      12345
    </Tag>
    <Tag className="SidebarListTagsSkeleton-item" key={3} size="big">
      123
    </Tag>
    <Tag className="SidebarListTagsSkeleton-item" key={4} size="big">
      123456
    </Tag>
    <Tag className="SidebarListTagsSkeleton-item" key={5} size="big">
      123
    </Tag>
    <Tag className="SidebarListTagsSkeleton-item" key={6} size="big">
      12345
    </Tag>
    <Tag className="SidebarListTagsSkeleton-item" key={7} size="big">
      123456
    </Tag>
    <Tag className="SidebarListTagsSkeleton-item" key={8} size="big">
      123
    </Tag>
  </>
);
