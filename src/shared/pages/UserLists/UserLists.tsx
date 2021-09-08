import React from 'react';
import Helmet from 'react-helmet';

import Bookmark from 'Assets/svg/bookmarkRounded.svg';
import Cross from 'Assets/svg/cross.svg';
import ListIcon from 'Assets/svg/list.svg';
import Clock from 'Assets/svg/spinner6.svg';
import User from 'Assets/svg/userFill.svg';
import A from 'Components/A';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import CardItem from 'Components/CardItem';
import ListRow from 'Components/ListRow';
import NoResults from 'Components/NoResults';
import Pagination from 'Components/Pagination';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE, SITE_TITLE } from 'Root/src/shared/constants';
import { Select, SelectValue, SortBy, Space } from 'Vendor/components';

import './UserLists.less';

interface Props {
  user: UserState;
  listsIds: number[];
  listsLoading: boolean;
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
  onAddListClick: () => void;
}

export const UserLists: React.FC<Props> = ({
  user,
  listsIds,
  listsLoading,
  url,
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
    <Helmet title={`${SITE_TITLE} · User Lists`} />
    <CardItem className="UserLists-header">
      <div className="UserLists-headerTitle">
        <ListIcon />
        {user?.name && (
          <>
            <A className="UserLists-headerLink" href={`/users/${user?.id}`} frontend>
              {`${user?.name}`}
            </A>
            ’s
            <Space />
            lists
          </>
        )}
      </div>
      <div className="UserLists-separator" />
      <Select
        className="UserLists-select"
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
      <div className="UserLists-separator" />
      <div className="UserLists-addList" onClick={onAddListClick}>
        <Cross className="UserLists-addListIcon" />
        <span className="UserLists-addListText">New List</span>
      </div>
      <div className="UserLists-separator" />
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
    </CardItem>
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
      {!listsLoading && !listsIds?.length && <NoResults content="ⵁ We didn find any list." />}
    </div>
    <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
  </div>
);
