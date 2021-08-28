import React from 'react';

import A from 'Components/A';
import { Hr, Tag } from 'Vendor/components';
import { SidebarListTagsSkeletonWithMemo } from './SidebarListTagsSkeleton';

import './SidebarListTags.less';

interface Props {
  className?: string;
  title: string;
  loading?: boolean;
  tags: {
    id: number;
    name: string;
  }[];
  titleHref?: string;
  tagsPathname: string;
}

const SidebarListTags: React.FC<Props> = ({ className, tags, loading, title, titleHref, tagsPathname }) => {
  if (!tags?.length && !loading) return null;

  return (
    <div className={'SidebarListTags' + (className ? ' ' + className : '')}>
      <A
        className="SidebarListTags-header"
        href={titleHref}
        frontend
        styled={!!titleHref}
        disabled={!titleHref}
        underlined
      >
        {title}
      </A>
      <Hr size="small" spacer />
      <div className="SidebarListTags-tags">
        {!!loading && <SidebarListTagsSkeletonWithMemo />}
        {!loading &&
          tags.map((tag) => (
            <A
              className="SidebarListTags-tag"
              href={`${tagsPathname}?filter[tags][]=${tag.name}`}
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
