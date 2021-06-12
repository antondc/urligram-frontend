import React from 'react';

import A from 'Components/A';
import { Span, Tag } from 'Vendor/components';
import { SidebarListTagsSkeleton } from './SidebarListTagsSkeleton';

import './SidebarListTags.less';

interface Props {
  loading?: boolean;
  items: {
    id: number;
    name: string;
  }[];
}

const SidebarListTags: React.FC<Props> = ({ items, loading }) => {
  if (!items?.length && !loading) return <Span weight="semiBold">ⵁ Nothing here yet.</Span>;

  return (
    <dl className="SidebarListTags-tags">
      {!loading &&
        items.map((item) => (
          <A
            className="SidebarListTags-tag"
            href={`/bookmarks?filter[tags][]=${item.name}`}
            key={`SidebarListTags-tags-${item.id}`}
            styled={false}
            frontend
          >
            <Tag size="medium" variant="simple">
              {item.name}
            </Tag>
          </A>
        ))}
      {!!loading && <SidebarListTagsSkeleton />}
    </dl>
  );
};
export default SidebarListTags;
