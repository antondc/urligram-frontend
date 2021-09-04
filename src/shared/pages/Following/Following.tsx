import React from 'react';
import Helmet from 'react-helmet';

import Bookmark from 'Assets/svg/bookmarkFilled.svg';
import Title from 'Assets/svg/sortTitle.svg';
import Clock from 'Assets/svg/spinner6.svg';
import A from 'Components/A';
import CardItem from 'Components/CardItem';
import Main from 'Components/Main';
import NoResults from 'Components/NoResults';
import Pagination from 'Components/Pagination';
import UserRow from 'Components/UserRow';
import { UserRowSkeletonGroup } from 'Components/UserRow/UserRowSkeletonGroup';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE, SITE_TITLE } from 'Root/src/shared/constants';
import { Select, SelectValue, SortBy, Space } from 'Vendor/components';

import './Following.less';

export interface Props {
  user: UserState;
  userId: string;
  usersCurrentIds: string[];
  usersLoading: boolean;
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

export const Following: React.FC<Props> = ({
  user,
  userId,
  usersCurrentIds,
  usersLoading,
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
  <Main className="Following">
    <Helmet title={`${SITE_TITLE} · Following`} />
    <div className="Following-header Following-headerTitle">
      Users following
      <Space />
      <A href={`/users/${userId}/following`} underlined frontend>
        @{user?.name}
      </A>
    </div>
    <div className="Following-header">
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
          { label: 'Name', field: 'name', icon: Title },
          { label: 'Login', field: 'login', icon: Clock },
          { label: 'Bookmarks', field: 'bookmarks', icon: Bookmark },
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
        usersCurrentIds?.map((id) => (
          <CardItem key={id}>
            <UserRow id={id} />
          </CardItem>
        ))
      )}
      {!usersLoading && !usersCurrentIds?.length && <NoResults content="ⵁ We didnt find any user." />}
    </div>
    <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
  </Main>
);
