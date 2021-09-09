import React from 'react';
import Helmet from 'react-helmet';

import ListIcon from 'Assets/svg/list.svg';
import Clock from 'Assets/svg/spinner6.svg';
import Updated from 'Assets/svg/updated.svg';
import User from 'Assets/svg/userFill.svg';
import CardItem from 'Components/CardItem';
import ListRow from 'Components/ListRow';
import { ListRowSkeletonGroup } from 'Components/ListRow/ListSkeletonGroup';
import NoResults from 'Components/NoResults';
import Pagination from 'Components/Pagination';
import { TagState } from 'Modules/Tags/tags.types';
import { DEFAULT_PAGE_SIZE, SITE_TITLE } from 'Root/src/shared/constants';
import { Select, SelectValue, SortBy } from 'Vendor/components';

import './Lists.less';

interface Props {
  listsIds: number[];
  listsIdsLoading: boolean;
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
  <div className="Lists">
    <Helmet title={`${SITE_TITLE} · All Lists`} />
    <CardItem className="Lists-header">
      <div className="Lists-headerTitle">
        <ListIcon />
        All Lists
      </div>
      <div className="Lists-separator" />
      <Select
        className="Lists-select"
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
        height="small"
      />
      <div className="Lists-separator" />
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
    </CardItem>
    <div className="Lists-lists">
      {listsIdsLoading ? (
        <ListRowSkeletonGroup length={listsIds?.length || DEFAULT_PAGE_SIZE} />
      ) : (
        listsIds?.map((id) => (
          <CardItem key={id}>
            <ListRow id={id} />
          </CardItem>
        ))
      )}
      {!listsIdsLoading && !listsIds?.length && <NoResults content="ⵁ We didnt find any list." />}
    </div>
    <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
  </div>
);
