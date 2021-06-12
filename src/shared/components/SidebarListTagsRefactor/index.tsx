import React from 'react';

import A from 'Components/A';
import { FadeInOut, Frame, H4, Hr, Span, Tag } from 'Vendor/components';
import { SidebarListTagsRefactorSkeleton } from './SidebarListTagsRefactorSkeleton';

import './SidebarListTagsRefactor.less';

interface Props {
  loading?: boolean;
  tags: {
    id: number;
    name: string;
  }[];
  title: string;
  href?: string;
}

const SidebarListTagsRefactor: React.FC<Props> = ({ tags, loading, title, href }) => {
  if (!tags?.length && !loading) return <Span weight="semiBold">ⵁ Nothing here yet.</Span>;

  return (
    <Frame className="SidebarListTagsRefactor" grow borders={false}>
      <A href={href} frontend styled={!!href} disabled={!href}>
        <H4>{title}</H4>
      </A>
      <Hr size="small" spacer />
      <FadeInOut className="SidebarListTagsRefactor-tags" valueToUpdate={loading} appear>
        {!tags?.length && <Span weight="semiBold">ⵁ Nothing here yet.</Span>}
        {!!tags?.length && !!loading && <SidebarListTagsRefactorSkeleton />}
        {!loading &&
          tags?.length &&
          tags.map((tag) => (
            <A
              className="SidebarListTagsRefactor-tag"
              href={`/bookmarks?filter[tags][]=${tag.name}`}
              key={`SidebarListTagsRefactor-tags-${tag.id}`}
              styled={false}
              frontend
            >
              <Tag size="medium" variant="simple">
                {tag.name}
              </Tag>
            </A>
          ))}
      </FadeInOut>
    </Frame>
  );
};
export default SidebarListTagsRefactor;
