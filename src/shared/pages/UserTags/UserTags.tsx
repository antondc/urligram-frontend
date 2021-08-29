import React from 'react';
import Helmet from 'react-helmet';

import Bookmark from 'Assets/svg/bookmarkRounded.svg';
import Title from 'Assets/svg/sortTitle.svg';
import A from 'Components/A';
import Sidebar from 'Components/Sidebar';
import { SidebarListTagsSkeleton } from 'Components/SidebarListTags/SidebarListTagsSkeleton';
import SidebarListUsers from 'Components/SidebarListUsers';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { Hr, SortBy, Space, Tag } from 'Vendor/components';

import './UserTags.less';

interface Props {
  tags: TagState[];
  tagsLoading: boolean;
  mostFollowedUsers: UserState[];
  mostFollowedUsersLoading: boolean;
  newUsers: UserState[];
  newUsersLoading: boolean;
  url: string;
  sort: string;
  user: UserState;
}

export const UserTags: React.FC<Props> = ({
  tags,
  tagsLoading,
  mostFollowedUsers,
  mostFollowedUsersLoading,
  newUsers,
  newUsersLoading,
  url,
  sort,
  user,
}) => (
  <>
    <Helmet title={`${SITE_TITLE} · User Tags`} />
    <div className="UserTags">
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
      <Hr spacer size="normal" />
    </div>
    <Sidebar>
      <SidebarListUsers
        className="UserTags-sidebarListUsersFirst"
        title="Following Users"
        href={'/users?sort=-followers&page[size]=10'}
        loading={mostFollowedUsersLoading}
        users={mostFollowedUsers}
      />
      <SidebarListUsers
        title="New Users"
        href={'/users?sort=-createdAt&page[size]=10'}
        loading={newUsersLoading}
        users={newUsers}
      />
    </Sidebar>
  </>
);
