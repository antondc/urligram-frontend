import React from 'react';

import Bookmark from 'Assets/svg/bookmarkRounded.svg';
import Clock from 'Assets/svg/spinner6.svg';
import User from 'Assets/svg/userFill.svg';
import A from 'Components/A';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import ListRow from 'Components/ListRow';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarListTags from 'Components/SidebarListTags';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import { Hr, Select, SelectValue, SortBy, Space } from 'Vendor/components';

import './UserLists.less';

interface Props {
  userId: string;
  user: UserState;
  listsIds: number[];
  listsLoading: boolean;
  userMostUsedTags: TagState[];
  userMostUsedTagsLoading: boolean;
  mostFollowedTags: TagState[];
  mostFollowedTagsLoading: boolean;
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

export const UserLists: React.FC<Props> = ({
  userId,
  user,
  listsIds,
  listsLoading,
  userMostUsedTags,
  userMostUsedTagsLoading,
  mostFollowedTags,
  mostFollowedTagsLoading,
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
    <div className="UserLists">
      <div className="UserLists-header UserLists-headerTitle">
        Lists of <Space />
        <A href={`/users/${userId}`} underlined frontend>
          @{user?.name}
        </A>
      </div>
      <div className="UserLists-header">
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
            { label: 'Created at', field: 'createdAt', icon: Clock },
            { label: 'Members', field: 'members', icon: User },
            { label: 'Bookmarks', field: 'bookmarks', icon: Bookmark },
          ]}
          href={url}
          currentSort={sort}
          loading={listsLoading}
        />
      </div>
      <div className="UserLists-lists">
        {listsLoading ? (
          <BookmarkRowSkeletonGroup length={listsIds?.length || DEFAULT_PAGE_SIZE} />
        ) : (
          listsIds?.map((id) => <ListRow id={id} key={id} />)
        )}
        {!listsLoading && !listsIds?.length && <div className="UserLists-noResults">ⵁ We didn find any list.</div>}
      </div>
      <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
      <Hr spacer size="normal" />
    </div>
    <Sidebar>
      <SidebarListTags
        className="UserLists-sidebarListTagsFirst"
        title="My Tags"
        href={`users/${userId}/tags`}
        loading={userMostUsedTagsLoading}
        tags={userMostUsedTags}
      />
      <SidebarListTags
        title="Most Used Tags"
        href={`users/${userId}/tags`}
        loading={mostFollowedTagsLoading}
        tags={mostFollowedTags}
      />
    </Sidebar>
  </>
);
