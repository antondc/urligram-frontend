import React from 'react';
import Helmet from 'react-helmet';

import Clock from 'Assets/svg/spinner6.svg';
import User from 'Assets/svg/user.svg';
import CardItem from 'Components/CardItem';
import Main from 'Components/Main';
import NoResults from 'Components/NoResults';
import Pagination from 'Components/Pagination';
import UserRow from 'Components/UserRow';
import { UserRowSkeletonGroup } from 'Components/UserRow/UserRowSkeletonGroup';
import { TagState } from 'Modules/Tags/tags.types';
import { DEFAULT_PAGE_SIZE, SITE_TITLE } from 'Root/src/shared/constants';
import { Select, SelectValue, SortBy } from 'Vendor/components';

import './Users.less';

export interface Props {
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

export const Users: React.FC<Props> = ({
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
  <Main className="Users">
    <Helmet title={`${SITE_TITLE} · All Users`} />
    <CardItem className="Users-header">
      <div className="Users-headerTitle">
        <User />
        All Users
      </div>
      <div className="Users-separator" />
      <Select
        className="Users-select"
        placeholder="Select tags"
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
      <div className="Users-separator" />
      <SortBy
        options={[{ label: 'Created at', field: 'createdAt', icon: Clock }]}
        href={url}
        currentSort={sort}
        loading={usersLoading}
      />
    </CardItem>
    <div className="Users-users">
      {usersLoading ? (
        <UserRowSkeletonGroup length={usersCurrentIds?.length || DEFAULT_PAGE_SIZE} />
      ) : (
        usersCurrentIds?.map((id) => (
          <CardItem key={id}>
            <UserRow id={id} />
          </CardItem>
        ))
      )}
      {!usersLoading && !usersCurrentIds?.length && <NoResults content="ⵁ We didn find any user." />}
    </div>
    <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
  </Main>
);
