import React from 'react';

import A from 'Components/A';
import { Frame, H4, Hr, Tag } from 'Vendor/components';
import { SidebarListTagsSkeleton } from './SidebarListTagsSkeleton';

import './SidebarListTags.less';

interface Props {
  title: string;
  loading?: boolean;
  tags: {
    id: number;
    name: string;
  }[];
  href?: string;
  padding?: boolean;
  borderBottom?: boolean;
}

const SidebarListTags: React.FC<Props> = ({ tags, loading, title, href, padding = true, borderBottom = true }) => {
  if (!tags?.length && !loading) return null;

  return (
    <Frame
      className="SidebarListTags"
      grow
      borderTop={false}
      borderRight={false}
      borderLeft={false}
      borderBottom={borderBottom}
      padding={!!padding ? 'normal' : 'none'}
    >
      <A href={href} frontend styled={!!href} disabled={!href} underlined>
        <H4>{title}</H4>
      </A>
      <Hr size="small" spacer />
      <div className="SidebarListTags-tags">
        {!!loading && <SidebarListTagsSkeleton />}
        {!loading &&
          tags.map((tag) => (
            <A
              className="SidebarListTags-tag"
              href={`/bookmarks?filter[tags][]=${tag.name}`}
              key={`SidebarListTags-tags-${tag.id}`}
              styled={false}
              frontend
            >
              <Tag size="medium" variant="simple">
                {tag.name}
              </Tag>
            </A>
          ))}
      </div>
    </Frame>
  );
};
export default SidebarListTags;
