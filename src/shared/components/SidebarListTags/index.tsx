import React from 'react';

import { Tag } from '@antoniodcorrea/components';
import { SidebarListTagsSkeleton } from './SidebarListTagsSkeleton';

import './SidebarListTags.less';

interface Props {
  loading?: boolean;
  items: {
    id: number;
    name: string;
  }[];
}

const SidebarListTags: React.FC<Props> = ({ items, loading }) => (
  <dl className="SidebarListTags-tags">
    {!loading && items?.length ? (
      items.map((item) => (
        <Tag size="big" className="SidebarListTags-tag" key={item.id}>
          {item.name}
        </Tag>
      ))
    ) : (
      <SidebarListTagsSkeleton />
    )}
  </dl>
);
export default SidebarListTags;
