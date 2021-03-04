import React from 'react';

import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import Main from 'Components/Main';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { ListState } from 'Modules/Lists/lists.types';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { Border, Flex, H4, Hr, PlusCircle, SortBy, Tooltip } from '@antoniodcorrea/components';
import { SvgClickEvent } from '@antoniodcorrea/components/Svg/Svg.types';

import './List.less';

interface Props {
  list: ListState;
  bookmarksIds: number[];
  bookmarksLoading: boolean;
  usersInThisList: UserState[];
  usersInThisListLoading: boolean;
  tagsInThisList: TagState[];
  tagsInThisListLoading: boolean;
  onListJoin: (e: SvgClickEvent) => void;
  url: string;
  page: {
    size: number;
    offset: number;
  };
  totalItems: number;
  sort: string;
}

export const List: React.FC<Props> = ({
  list,
  bookmarksIds,
  bookmarksLoading,
  usersInThisList,
  usersInThisListLoading,
  tagsInThisList,
  tagsInThisListLoading,
  onListJoin,
  page,
  totalItems,
  url,
  sort,
}) => (
  <div className="List">
    <Flex horizontal="between" vertical="top">
      <Main>
        <Flex horizontal="right">
          <SortBy
            options={[
              { label: 'Rating', field: 'vote' },
              { label: 'Bookmarks', field: 'timesbookmarked' },
              { label: 'Date', field: 'createdat' },
            ]}
            href={url}
            currentSort={sort}
          />
        </Flex>
        <Hr spacer size="small" />
        <Border grow>
          <Flex horizontal="between">
            <H4>Bookmarks in {list?.name}</H4>
            <div id="List-joinList">
              <PlusCircle className="List-joinList" onClick={onListJoin} />
            </div>
            <Tooltip parentElementId={'List-joinList'} content="Join this list" />
          </Flex>
          <Hr spacer />
          {bookmarksLoading ? (
            <BookmarkRowSkeletonGroup length={bookmarksIds?.length} />
          ) : (
            bookmarksIds?.map((id, index) => (
              <React.Fragment key={id}>
                {!!index && <Hr spacer />}
                <BookmarkRow id={id} />
              </React.Fragment>
            ))
          )}
          <Flex horizontal="center">
            <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
          </Flex>
        </Border>
      </Main>
      <Sidebar>
        <SidebarBlock title="People in this list" loading={usersInThisListLoading}>
          <SidebarListUsers items={usersInThisList} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="Tags In This List" loading={tagsInThisListLoading}>
          <SidebarListTags items={tagsInThisList} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
