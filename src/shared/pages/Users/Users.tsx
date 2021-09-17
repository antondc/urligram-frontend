import React from 'react';
import Helmet from 'react-helmet';

import Clock from 'Assets/svg/spinner6.svg';
import User from 'Assets/svg/user.svg';
import CardItem from 'Components/CardItem';
import NoResults from 'Components/NoResults';
import Pagination from 'Components/Pagination';
import SubHeader from 'Components/SubHeader';
import UserRow from 'Components/UserRow';
import { UserRowSkeletonGroup } from 'Components/UserRow/UserRowSkeletonGroup';
import { TagState } from 'Modules/Tags/tags.types';
import { DEFAULT_PAGE_SIZE, SITE_TITLE } from 'Root/src/shared/constants';
import { SelectValue } from '@antoniodcorrea/components';

import './Users.less';

interface Props {
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
  <div className="Users">
    <Helmet title={`${SITE_TITLE} · All Users`} />
    <SubHeader
      // title props
      title="All Users"
      leftIcon={<User />}
      // select props
      selectPlaceholder="Select tags"
      currentQueryParamFilterTags={currentQueryParamFilterTags}
      selectDefaultOptions={allTags.map((item) => ({ label: item.name, value: item.name }))}
      selectOptions={[
        ...tagsSearchFormatted,
        ...allTags.map((item) => ({ label: item.name, value: item.name })),
      ].filter((v, i, a) => a.findIndex((t) => t.value === v.value) === i)}
      onSelectInputChange={onInputChange}
      onSelectChange={onChange}
      // sort props
      sortLoading={usersLoading}
      sortByOptions={[{ label: 'Created at', field: 'createdAt', icon: Clock }]}
      url={url}
      currentSort={sort}
    />
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
  </div>
);
