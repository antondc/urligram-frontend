import React from 'react';

import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarListTags from 'Components/SidebarListTags';
import UserRow from 'Components/UserRow';
import { UserRowSkeletonGroup } from 'Components/UserRow/UserRowSkeletonGroup';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import { A, Hr, SortBy, Space } from 'Vendor/components';

import './Following.less';

export interface Props {
  user: UserState;
  userId: string;
  usersCurrentIds: string[];
  usersLoading: boolean;
  mostUsedTags: TagState[];
  mostUsedTagsLoading: boolean;
  userMostUsedTags: TagState[];
  userMostUsedTagsLoading: boolean;
  url: string;
  page: {
    size: number;
    offset: number;
  };
  totalItems: number;
  sort: string;
}

export const Following: React.FC<Props> = ({
  user,
  userId,
  usersCurrentIds,
  usersLoading,
  mostUsedTags,
  mostUsedTagsLoading,
  userMostUsedTags,
  userMostUsedTagsLoading,
  page,
  totalItems,
  url,
  sort,
}) => (
  <>
    <div className="Following">
      <div className="Following-header Following-headerTitle">
        Users following
        <Space />
        <A href={`/users/${userId}/following`} underlined>
          @{user?.name}
        </A>
      </div>
      <div className="Following-header">
        <SortBy
          options={[
            { label: 'Name', field: 'name' },
            { label: 'Login', field: 'login' },
            { label: 'Bookmarks', field: 'bookmarks' },
          ]}
          href={url}
          currentSort={sort}
          loading={usersLoading}
        />
      </div>

      <div className="Following-following">
        {usersLoading ? (
          <UserRowSkeletonGroup length={usersCurrentIds?.length || DEFAULT_PAGE_SIZE} />
        ) : (
          usersCurrentIds?.map((id) => <UserRow id={id} key={id} />)
        )}
        {!usersLoading && !usersCurrentIds?.length && (
          <div className="Following-noResults">ⵁ We didnt find any user.</div>
        )}
      </div>
      <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
      <Hr spacer size="normal" />
    </div>
    <Sidebar>
      <SidebarListTags
        className="Following-sidebarListTagsFirst"
        title="User Most Followed Tags"
        href={`users/${userId}/bookmarks`}
        loading={userMostUsedTagsLoading}
        tags={userMostUsedTags}
      />
      <SidebarListTags title="Most Followed Tags" loading={mostUsedTagsLoading} tags={mostUsedTags} />
    </Sidebar>
  </>
);
