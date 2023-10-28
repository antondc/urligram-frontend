import React from 'react';
import Helmet from 'react-helmet';

import Clock from 'Assets/svg/spinner6.svg';
import User from 'Assets/svg/user.svg';
import CardItem from 'Components/CardItem';
import NoResults from 'Components/NoResults';
import Pagination from 'Components/Pagination';
import SubHeader from 'Components/SubHeader';
import UserRowNew from 'Components/UserRowNew';
import { UserRowNewSkeletonGroup } from 'Components/UserRowNew/UserRowNewSkeletonGroup';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { TagState } from 'Modules/Tags/tags.types';
import { DEFAULT_PAGE_SIZE, SITE_TITLE } from 'Root/src/shared/constants';
import { SelectValue } from '@antoniodcorrea/components';

import './Users.less';

interface Props {
  glossary: GlossaryState;
  usersCurrentIds: string[];
  usersLoading: boolean;
  currentHref: string;
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
  glossary,
  usersCurrentIds,
  usersLoading,
  page,
  totalItems,
  currentHref,
  sort,
  allTags,
  currentQueryParamFilterTags,
  tagsSearchFormatted,
  onInputChange,
  onChange,
}) => (
  <div className="Users">
    <Helmet title={`${SITE_TITLE} · ${glossary.allUsers}`} />
    <SubHeader
      // title props
      title={glossary.allUsers}
      leftIcon={<User />}
      // select props
      selectPlaceholder={glossary.selectTags}
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
      sortByOptions={[{ label: glossary.created, field: 'createdAt', icon: Clock }]}
      url={currentHref}
      currentSort={sort}
    />
    <div className="Users-users">
      {usersLoading ? (
        <UserRowNewSkeletonGroup length={usersCurrentIds?.length || DEFAULT_PAGE_SIZE} />
      ) : (
        usersCurrentIds?.map((id) => (
          <CardItem key={id}>
            <UserRowNew id={id} />
          </CardItem>
        ))
      )}
      {!usersLoading && !usersCurrentIds?.length && <NoResults content={`ⵁ ${glossary.weDidNotFindAnyUser}.`} />}
    </div>
    <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={currentHref} />
  </div>
);
