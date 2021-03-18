import React from 'react';

import LinkRow from 'Components/LinkRow';
import { LinkRowSkeletonGroup } from 'Components/LinkRow/LinkRowSkeletonGroup';
import Main from 'Components/Main';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import { Border, FadeInOut, Flex, H4, Hr, Select, SelectValue, SortBy } from '@antoniodcorrea/components';

import './Links.less';

interface Props {
  linksIds: number[];
  loading: boolean;
  newUsers: UserState[];
  newUsersLoading: boolean;
  mostUsedTags: TagState[];
  mostUsedTagsLoading: boolean;
  url: string;
  page: {
    size: number;
    offset: number;
  };
  totalItems: number;
  sort: string;
  tagsSearchFormatted: {
    label: string;
    value: string;
  }[];
  onInputChange: (string: string) => void;
  onChange: (string: SelectValue[]) => void;
  allTags: TagState[];
  currentQueryParamFilterTags: SelectValue[];
}

export const Links: React.FC<Props> = ({
  linksIds,
  loading,
  newUsers,
  newUsersLoading,
  mostUsedTags,
  mostUsedTagsLoading,
  url,
  page,
  totalItems,
  sort,
  tagsSearchFormatted,
  onInputChange,
  allTags,
  currentQueryParamFilterTags,
  onChange,
}) => (
  <div className="Links">
    <Flex horizontal="between" vertical="top">
      <Main>
        <Flex horizontal="between" noWrap>
          <Select
            className="Links-select"
            label="Select tags"
            value={currentQueryParamFilterTags}
            defaultOptions={allTags.map((item) => ({ label: item.name, value: item.name }))}
            options={[
              ...tagsSearchFormatted,
              ...allTags.map((item) => ({ label: item.name, value: item.name })),
            ].filter((v, i, a) => a.findIndex((t) => t.value === v.value) === i)}
            onInputChange={onInputChange}
            onChange={onChange}
            maxItems={4}
          />
          <SortBy
            options={[
              { label: 'Last updated', field: 'last-bookmarked' },
              { label: 'Rating', field: 'vote' },
              { label: 'Bookmarks', field: 'most-bookmarked' },
            ]}
            href={url}
            currentSort={sort}
          />
        </Flex>
        <Hr spacer size="nano" />

        <Hr spacer size="small" />
        <Border grow>
          <H4>Links</H4>
          <Hr spacer />
          <FadeInOut valueToUpdate={loading} speed="fastest" appear>
            {loading ? (
              <LinkRowSkeletonGroup length={linksIds?.length || DEFAULT_PAGE_SIZE} />
            ) : (
              linksIds?.map((id, index) => (
                <React.Fragment key={id}>
                  {!!index && <Hr spacer size="small" />}
                  <LinkRow id={id} />
                </React.Fragment>
              ))
            )}
          </FadeInOut>
          <Flex horizontal="center">
            <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
          </Flex>
        </Border>
      </Main>
      <Sidebar>
        <SidebarBlock title="Popular Tags" href="tags?sort[most-used]=desc" loading={mostUsedTagsLoading}>
          <SidebarListTags items={mostUsedTags} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="New Users" href="users?sort=createdat&page[size]=10" loading={newUsersLoading}>
          <SidebarListUsers items={newUsers} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
