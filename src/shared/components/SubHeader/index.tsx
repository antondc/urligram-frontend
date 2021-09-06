import React from 'react';

import ListIcon from 'Assets/svg/list.svg';
import A from 'Components/A';
import { UserState } from 'Modules/Users/users.types';
import { Select, SelectValue, SortBy, Space } from 'Vendor/components';
import { SortByOption } from '../../vendor/components/SortBy';

import './SubHeader.less';

interface Props {
  selectPlaceholder: string;
  user: UserState;
  loading: boolean;
  url: string;
  currentSort: string;
  currentQueryParamFilterTags: SelectValue[];
  selectDefaultOptions: SelectValue[];
  selectOptions: SelectValue[];
  sortByOptions: SortByOption[];
  onSelectInputChange: (string: string) => void;
  onSelectChange: (string: SelectValue[]) => void;
}

export const SubHeader: React.FC<Props> = ({
  selectPlaceholder,
  user,
  loading,
  url,
  currentSort,
  currentQueryParamFilterTags,
  onSelectInputChange,
  onSelectChange,
  selectDefaultOptions,
  selectOptions,
  sortByOptions,
}) => (
  <div className="SubHeader">
    <div className="SubHeader-headerTitle">
      <ListIcon />
      {user?.name && (
        <>
          <A className="SubHeader-headerLink" href={`/users/${user?.id}`} frontend>
            {`${user?.name}`}
          </A>
          ’s
          <Space />
          lists
        </>
      )}
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
    />
    <div className="SubHeader-separator" />
    <SortBy options={sortByOptions} href={url} currentSort={currentSort} loading={loading} />
  </div>
);
