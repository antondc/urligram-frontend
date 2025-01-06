import React from 'react';
import Helmet from 'react-helmet';

import Bookmark from 'Assets/svg/bookmarkRounded.svg';
import Cross from 'Assets/svg/cross.svg';
import ListIcon from 'Assets/svg/list.svg';
import Clock from 'Assets/svg/spinner6.svg';
import User from 'Assets/svg/userFill.svg';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import CardItem from 'Components/CardItem';
import ListRow from 'Components/ListRow';
import NoResults from 'Components/NoResults';
import Pagination from 'Components/Pagination';
import SubHeader, { SubHeaderSeparator } from 'Components/SubHeader';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE, SITE_TITLE } from 'Root/src/shared/constants';
import { SelectValue } from '@antoniodcorrea/components';

import './UserLists.less';

interface Props {
  glossary: GlossaryState;
  user: UserState;
  listsIds: number[];
  listsLoading: boolean;
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
  onAddListClick: () => void;
}

export const UserLists: React.FC<Props> = ({
  glossary,
  user,
  listsIds,
  listsLoading,
  currentHref,
  page,
  totalItems,
  sort,
  allTags,
  currentQueryParamFilterTags,
  tagsSearchFormatted,
  onInputChange,
  onChange,
  onAddListClick,
}) => (
  <div className="UserLists">
    <Helmet title={`${SITE_TITLE} · ${glossary.userLists}`} />
    <SubHeader
      // title props
      title={`@${user?.name}`}
      titleHref={`/users/${user?.id}`}
      leftIcon={<ListIcon />}
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
      sortLoading={listsLoading}
      sortByOptions={[
        { label: glossary.created, field: 'createdAt', icon: Clock },
        { label: glossary.members, field: 'members', icon: User },
        { label: glossary.bookmarks, field: 'bookmarks', icon: Bookmark },
      ]}
      url={currentHref}
      currentSort={sort}
    >
      <SubHeaderSeparator />
      <div className="UserLists-addList" onClick={onAddListClick}>
        <Cross className="UserLists-addListIcon" />
        <span className="UserLists-addListText">{glossary.addList}</span>
      </div>
    </SubHeader>
    <div className="UserLists-lists">
      {listsLoading ? (
        <BookmarkRowSkeletonGroup length={listsIds?.length || DEFAULT_PAGE_SIZE} />
      ) : (
        listsIds?.map((id) => (
          <CardItem key={id}>
            <ListRow id={id} />
          </CardItem>
        ))
      )}
      {!listsLoading && !listsIds?.length && <NoResults content={`ⵁ ${glossary.weDidNotFindAnyList}.`} />}
    </div>
    <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={currentHref} />
  </div>
);
