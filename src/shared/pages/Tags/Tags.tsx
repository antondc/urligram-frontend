import React from 'react';

import A from 'Components/A';
import Sidebar from 'Components/Sidebar';
import { SidebarListTagsSkeleton } from 'Components/SidebarListTags/SidebarListTagsSkeleton';
import SidebarListUsers from 'Components/SidebarListUsers';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { Hr, SortBy, Space, Tag } from 'Vendor/components';

import './Tags.less';

interface Props {
  tags: TagState[];
  tagsLoading: boolean;
  mostFollowedUsers: UserState[];
  mostFollowedUsersLoading: boolean;
  newUsers: UserState[];
  newUsersLoading: boolean;
  url: string;
  sort: string;
}

export const Tags: React.FC<Props> = ({
  tags,
  tagsLoading,
  mostFollowedUsers,
  mostFollowedUsersLoading,
  newUsers,
  newUsersLoading,
  url,
  sort,
}) => (
  <>
    <div className="Tags">
      <div className="Tags-header">
        <SortBy
          options={[
            { label: 'Bookmarks', field: 'count' },
            { label: 'Name', field: 'name' },
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
            <A
              className="Tags-tag"
              href={`/bookmarks?filter[tags][]=${item.name}`}
              key={item.id}
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
        className="Tags-sidebarListUsersFirst"
        title="Following Users"
        users={mostFollowedUsers}
        href={'/users?sort=-followers&page[size]=10'}
        loading={mostFollowedUsersLoading}
      />
      <SidebarListUsers
        users={newUsers}
        title="Following Users"
        href={'/users?sort=-createdAt&page[size]=10'}
        loading={newUsersLoading}
      />
    </Sidebar>
  </>
);
