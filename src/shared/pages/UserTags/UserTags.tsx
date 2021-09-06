import React from 'react';
import Helmet from 'react-helmet';

import Bookmark from 'Assets/svg/bookmarkRounded.svg';
import Title from 'Assets/svg/sortTitle.svg';
import TagIcon from 'Assets/svg/tag.svg';
import A from 'Components/A';
import CardItem from 'Components/CardItem';
import Main from 'Components/Main';
import { SidebarListTagsSkeleton } from 'Components/SidebarListTags/SidebarListTagsSkeleton';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { SortBy, Space, Tag } from 'Vendor/components';

import './UserTags.less';

interface Props {
  user: UserState;
  tags: TagState[];
  tagsLoading: boolean;
  url: string;
  sort: string;
}

export const UserTags: React.FC<Props> = ({ user, tags, tagsLoading, url, sort }) => (
  <Main className="UserTags">
    <Helmet title={`${SITE_TITLE} · User Tags`} />
    <CardItem className="UserTags-header">
      <div className="UserLists-headerTitle">
        <TagIcon className="List-headerIcon" />
        {user?.name && `${user?.name}'s tags`}
      </div>
      <div className="UserLists-separator" />
      <SortBy
        options={[
          { label: 'Bookmarks', field: 'count', icon: Bookmark },
          { label: 'Name', field: 'name', icon: Title },
        ]}
        href={url}
        currentSort={sort}
        loading={tagsLoading}
      />
    </CardItem>
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
            <Tag>
              {item?.name}
              <Space />
              <Space />
              <Space />
              {item?.count}
            </Tag>
          </A>
        ))
      )}
    </div>
  </Main>
);
