import React from 'react';
import Helmet from 'react-helmet';

import Bookmark from 'Assets/svg/bookmarkFilled.svg';
import Flag from 'Assets/svg/flag.svg';
import Title from 'Assets/svg/sortTitle.svg';
import CardItem from 'Components/CardItem';
import NoResults from 'Components/NoResults';
import Pagination from 'Components/Pagination';
import SubHeader from 'Components/SubHeader';
import UserRow from 'Components/UserRow';
import { UserRowSkeletonGroup } from 'Components/UserRow/UserRowSkeletonGroup';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE, SITE_TITLE } from 'Root/src/shared/constants';
import { SelectValue } from '@antoniodcorrea/components';

import './Followers.less';

interface Props {
  glossary: GlossaryState;
  user: UserState;
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

export const Followers: React.FC<Props> = ({
  glossary,
  user,
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
  <div className="Followers">
    <Helmet title={`${SITE_TITLE} · ${glossary.followers}`} />
    <SubHeader
      // title props
      title={`@${user?.name}`}
      titleHref={`/users/${user?.id}`}
      leftIcon={<Flag className="Followers-icon" />}
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
      sortByOptions={[
        { label: glossary.bookmarks, field: 'bookmarks', icon: Bookmark },
        { label: glossary.name, field: 'name', icon: Title },
      ]}
      url={currentHref}
      currentSort={sort}
    />
    <div className="Followers-followers">
      {usersLoading ? (
        <UserRowSkeletonGroup length={usersCurrentIds?.length || DEFAULT_PAGE_SIZE} />
      ) : (
        usersCurrentIds?.map((id) => (
          <CardItem key={id}>
            <UserRow id={id} />
          </CardItem>
        ))
      )}
      {!usersLoading && !usersCurrentIds?.length && <NoResults content={`ⵁ ${glossary.weDidNotFindAnyUser}.`} />}
    </div>
    <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={currentHref} />
  </div>
);
