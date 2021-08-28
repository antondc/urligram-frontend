import React from 'react';

import Bookmark from 'Assets/svg/bookmarkFilled.svg';
import Title from 'Assets/svg/sortTitle.svg';
import Clock from 'Assets/svg/spinner6.svg';
import A from 'Components/A';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarListTags from 'Components/SidebarListTags';
import UserRow from 'Components/UserRow';
import { UserRowSkeletonGroup } from 'Components/UserRow/UserRowSkeletonGroup';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import { Hr, Select, SelectValue, SortBy, Space } from 'Vendor/components';

import './Followers.less';

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
  allTags: TagState[];
  currentQueryParamFilterTags: SelectValue[];
  tagsSearchFormatted: {
    label: string;
    value: string;
  }[];
  onInputChange: (string: string) => void;
  onChange: (string: SelectValue[]) => void;
}

export const Followers: React.FC<Props> = ({
  userId,
  user,
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
  allTags,
  currentQueryParamFilterTags,
  tagsSearchFormatted,
  onInputChange,
  onChange,
}) => (
  <>
    <div className="Followers">
      <div className="Followers-header Followers-headerTitle">
        Followers of
        <Space />
        <A href={`/users/${userId}/followers`} underlined frontend>
          @{user?.name}
        </A>
      </div>
      <div className="Followers-header">
        <Select
          className="Bookmarks-select"
          label="Select tags"
          value={currentQueryParamFilterTags}
          defaultOptions={allTags.map((item) => ({ label: item.name, value: item.name }))}
          options={[...tagsSearchFormatted, ...allTags.map((item) => ({ label: item.name, value: item.name }))].filter(
            (v, i, a) => a.findIndex((t) => t.value === v.value) === i
          )}
          onInputChange={onInputChange}
          onChange={onChange}
          maxItems={4}
          grow
          hideLabelOnFill
        />
        <SortBy
          options={[
            { label: 'Bookmarks', field: 'bookmarks', icon: Bookmark },
            { label: 'Login', field: 'login', icon: Clock },
            { label: 'Name', field: 'name', icon: Title },
          ]}
          href={url}
          currentSort={sort}
          loading={usersLoading}
        />
      </div>
      <div className="Followers-followers">
        {usersLoading ? (
          <UserRowSkeletonGroup length={usersCurrentIds?.length || DEFAULT_PAGE_SIZE} />
        ) : (
          usersCurrentIds?.map((id) => <UserRow id={id} key={id} />)
        )}
        {!usersLoading && !usersCurrentIds?.length && (
          <div className="Followers-noResults">ⵁ We didnt find any user.</div>
        )}
      </div>
      <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
      <Hr spacer size="normal" />
    </div>
    <Sidebar>
      <SidebarListTags
        className="Followers-sidebarListTagsFirst"
        tags={userMostUsedTags}
        title="User Most Followed Tags"
        titleHref={`/users/${userId}/bookmarks`}
        tagsPathname={`/users/${userId}/bookmarks`}
        loading={userMostUsedTagsLoading}
      />
      <SidebarListTags
        title="Most Followed Tags"
        loading={mostUsedTagsLoading}
        tags={mostUsedTags}
        tagsPathname="/bookmarks"
      />
    </Sidebar>
  </>
);
