import React from 'react';
import Helmet from 'react-helmet';

import Bookmark from 'Assets/svg/bookmarkRounded.svg';
import Title from 'Assets/svg/sortTitle.svg';
import A from 'Components/A';
import { SidebarListTagsSkeleton } from 'Components/SidebarListTags/SidebarListTagsSkeleton';
import { TagState } from 'Modules/Tags/tags.types';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { SortBy, Space, Tag } from 'Vendor/components';
import Main from 'Components/Main';

import './UserTags.less';

interface Props {
  tags: TagState[];
  tagsLoading: boolean;
  url: string;
  sort: string;
}

export const UserTags: React.FC<Props> = ({ tags, tagsLoading, url, sort }) => (
  <Main className="UserTags">
    <Helmet title={`${SITE_TITLE} · User Tags`} />
    <div className="UserTags-header">
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
    <div className="UserTags-tags">
      {tagsLoading ? (
        <SidebarListTagsSkeleton />
      ) : (
        tags?.map((item) => (
          <A
            className="UserTags-tag"
            href={`/bookmarks?filter[tags][]=${item?.name}`}
            key={item?.id}
            styled={false}
            frontend
          >
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
