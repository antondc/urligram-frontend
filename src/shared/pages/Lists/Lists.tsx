import React from 'react';
import Helmet from 'react-helmet';

import Cross from 'Assets/svg/cross.svg';
import FolderSolid from 'Assets/svg/folderSolid.svg';
import Clock from 'Assets/svg/spinner6.svg';
import Updated from 'Assets/svg/updated.svg';
import User from 'Assets/svg/userFill.svg';
import CardItem from 'Components/CardItem';
import ListRow from 'Components/ListRow';
import { ListRowSkeletonGroup } from 'Components/ListRow/ListRowSkeletonGroup';
import NoResults from 'Components/NoResults';
import Pagination from 'Components/Pagination';
import SubHeader, { SubHeaderSeparator } from 'Components/SubHeader';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { TagState } from 'Modules/Tags/tags.types';
import { DEFAULT_PAGE_SIZE, SITE_TITLE } from 'Root/src/shared/constants';
import { SelectValue } from '@antoniodcorrea/components';

import './Lists.less';

interface Props {
  glossary: GlossaryState;
  listsIds: number[];
  listsIdsLoading: boolean;
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

export const Lists: React.FC<Props> = ({
  glossary,
  listsIds,
  listsIdsLoading,
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
  <div className="Lists">
    <Helmet>
      <title>{`${SITE_TITLE} · ${glossary.lists}`}</title>
      <meta property="og:title" content={`${SITE_TITLE} · ${glossary.lists}`} />
      <meta property="og:url" content={currentHref} />
      <meta property="twitter:title" content={`${SITE_TITLE} · ${glossary.lists}`} />
      <meta property="twitter:url" content={currentHref} />
    </Helmet>
    <SubHeader
      // title props
      title={glossary.allLists}
      leftIcon={<FolderSolid className="Lists-folderIcon" />}
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
      sortLoading={listsIdsLoading}
      sortByOptions={[
        { label: glossary.created, field: 'createdAt', icon: Clock },
        { label: glossary.updated, field: 'updatedAt', icon: Updated },
        { label: glossary.members, field: 'members', icon: User },
      ]}
      url={currentHref}
      currentSort={sort}
    >
      <SubHeaderSeparator />
      <div className="Lists-addList" onClick={onAddListClick}>
        <Cross className="Lists-addListIcon" />
        <span className="Lists-addListText">{glossary.addList}</span>
      </div>
    </SubHeader>
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
      {!listsIdsLoading && !listsIds?.length && <NoResults content={`ⵁ ${glossary.weDidNotFindAnyList}.`} />}
    </div>
    <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={currentHref} />
  </div>
);
