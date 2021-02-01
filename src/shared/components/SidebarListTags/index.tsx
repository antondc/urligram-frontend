import React from 'react';

import { A, Tag } from '@antoniodcorrea/components';
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
        <A
          className="SidebarListTags-tag"
          href={`/tags/${item.name}`}
          key={`SidebarListTags-tags-${item.id}`}
          styled={false}
          frontend
        >
          <Tag size="big">{item.name}</Tag>
        </A>
      ))
    ) : (
      <SidebarListTagsSkeleton />
    )}
  </dl>
);
export default SidebarListTags;
