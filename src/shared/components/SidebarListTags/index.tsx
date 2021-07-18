import React from 'react';

import A from 'Components/A';
import { Hr, Tag } from 'Vendor/components';
import { SidebarListTagsSkeleton } from './SidebarListTagsSkeleton';

import './SidebarListTags.less';

interface Props {
  className?: string;
  title: string;
  loading?: boolean;
  tags: {
    id: number;
    name: string;
  }[];
  href?: string;
}

const SidebarListTags: React.FC<Props> = ({ tags, loading, title, href, className }) => {
  if (!tags?.length && !loading) return null;

  return (
    <div className={'SidebarListTags' + (className ? ' ' + className : '')}>
      <A className="SidebarListTags-header" href={href} frontend styled={!!href} disabled={!href} underlined>
        {title}
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
    </div>
  );
};
export default SidebarListTags;
