import React from 'react';
import Helmet from 'react-helmet';

import Bookmark from 'Assets/svg/bookmarkRounded.svg';
import Title from 'Assets/svg/sortTitle.svg';
import A from 'Components/A';
import Main from 'Components/Main';
import { SidebarListTagsSkeleton } from 'Components/SidebarListTags/SidebarListTagsSkeleton';
import { TagState } from 'Modules/Tags/tags.types';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { SortBy, Space, Tag } from 'Vendor/components';

import './Tags.less';

interface Props {
  tags: TagState[];
  tagsLoading: boolean;
  url: string;
  sort: string;
}

export const Tags: React.FC<Props> = ({ tags, tagsLoading, url, sort }) => (
  <Main className="Tags">
    <Helmet title={`${SITE_TITLE} · Tags`} />
    <div className="Tags-header">
      <SortBy
        options={[
          { label: 'Bookmarks', field: 'count', icon: Bookmark },
          { label: 'Name', field: 'name', icon: Title },
        ]}
        href={url}
        currentSort={sort}
        loading={tagsLoading}
      />
    </div>
    <div className="Tags-tags">
      {tagsLoading ? (
        <SidebarListTagsSkeleton length={tags?.length || 70} />
      ) : (
        tags?.map((item) => (
          <A className="Tags-tag" href={`/bookmarks?filter[tags][]=${item.name}`} key={item.id} styled={false} frontend>
            <Tag size="medium">
              {item?.name}
              <Space />
              {item?.count}
            </Tag>
          </A>
        ))
      )}
    </div>
  </Main>
);
