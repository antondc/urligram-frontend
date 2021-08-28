import React from 'react';

import Clock from 'Assets/svg/spinner6.svg';
import Updated from 'Assets/svg/updated.svg';
import User from 'Assets/svg/userFill.svg';
import ListRow from 'Components/ListRow';
import { ListRowSkeletonGroup } from 'Components/ListRow/ListSkeletonGroup';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import { Hr, Select, SelectValue, SortBy } from 'Vendor/components';

import './Lists.less';

interface Props {
  listsIds: number[];
  listsIdsLoading: boolean;
  mostUsedTags: TagState[];
  mostUsedTagsLoading: boolean;
  newUsers: UserState[];
  newUsersLoading: boolean;
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

export const Lists: React.FC<Props> = ({
  listsIds,
  listsIdsLoading,
  mostUsedTags,
  mostUsedTagsLoading,
  newUsers,
  newUsersLoading,
  url,
  page,
  totalItems,
  sort,
  allTags,
  currentQueryParamFilterTags,
  tagsSearchFormatted,
  onInputChange,
  onChange,
}) => (
  <>
    <div className="Lists">
      <div className="Lists-header">
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
            { label: 'Date', field: 'createdAt', icon: Clock },
            { label: 'Updated', field: 'updatedAt', icon: Updated },
            { label: 'Members', field: 'members', icon: User },
          ]}
          href={url}
          currentSort={sort}
          loading={listsIdsLoading}
        />
      </div>
      <div className="Lists-lists">
        {listsIdsLoading ? (
          <ListRowSkeletonGroup length={listsIds?.length || DEFAULT_PAGE_SIZE} />
        ) : (
          listsIds?.map((id) => <ListRow id={id} key={id} />)
        )}
        {!listsIdsLoading && !listsIds?.length && (
          <div className="UserBookmarks-noResults">ⵁ We didnt find any list.</div>
        )}
      </div>
      <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
      <Hr spacer size="normal" />
    </div>
    <Sidebar>
      <SidebarListTags
        className="Lists-sidebarListUsersFirst"
        title="Most Used Tags"
        loading={mostUsedTagsLoading}
        tags={mostUsedTags}
        tagsPathname="/bookmarks"
      />
      <SidebarListUsers
        title="New Users"
        users={newUsers}
        loading={newUsersLoading}
        href="users?sort=createdAt&page[size]=10"
      />
    </Sidebar>
  </>
);
