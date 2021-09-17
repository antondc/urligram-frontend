import React from 'react';

import A from 'Components/A';
import CardItem from 'Components/CardItem';
import { Select, SelectValue, SortBy } from '@antoniodcorrea/components';
import { SortByOption } from '@antoniodcorrea/components/SortBy';

import './SubHeader.less';

interface Props {
  selectPlaceholder: string;
  sortLoading: boolean;
  url: string;
  currentSort: string;
  currentQueryParamFilterTags: SelectValue[];
  selectDefaultOptions: SelectValue[];
  selectOptions: SelectValue[];
  sortByOptions: SortByOption[];
  title: string;
  appendTitle?: string;
  titleHref?: string;
  leftIcon?: React.ReactElement;
  children?: React.ReactElement | React.ReactElement[];
  onSelectInputChange: (string: string) => void;
  onSelectChange: (string: SelectValue[]) => void;
}

const SubHeader: React.FC<Props> = ({
  selectPlaceholder,
  sortLoading,
  url,
  currentSort,
  currentQueryParamFilterTags,
  onSelectInputChange,
  onSelectChange,
  selectDefaultOptions,
  title,
  appendTitle,
  titleHref,
  leftIcon,
  selectOptions,
  sortByOptions,
  children,
}) => (
  <CardItem className="SubHeader">
    <div className="SubHeader-headerTitle">
      {leftIcon}
      {titleHref ? (
        <A className="SubHeader-headerLink" href={titleHref} frontend styled={false}>
          {title}
        </A>
      ) : (
        title
      )}
      {appendTitle}
    </div>
    <div className="SubHeader-separator" />
    <Select
      className="SubHeader-select"
      placeholder={selectPlaceholder}
      value={currentQueryParamFilterTags}
      defaultOptions={selectDefaultOptions}
      options={selectOptions}
      onInputChange={onSelectInputChange}
      onChange={onSelectChange}
      maxItems={4}
      grow
      hideLabelOnFill
      height="small"
    />
    {children}
    <div className="SubHeader-separator" />
    <SortBy
      className="SubHeader-sort"
      options={sortByOptions}
      href={url}
      currentSort={currentSort}
      loading={sortLoading}
    />
  </CardItem>
);

export default SubHeader;
