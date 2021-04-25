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
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import { Border, FadeInOut, Flex, H4, Hr, Private, SortBy, Span } from 'Vendor/components';
import ListFollowButton from '../../components/ListFollowButton';

import './List.less';

interface Props {
  list: ListState;
  bookmarksIds: number[];
  bookmarksLoading: boolean;
  usersInThisList: UserState[];
  usersInThisListLoading: boolean;
  tagsInThisList: TagState[];
  tagsInThisListLoading: boolean;
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
  page,
  totalItems,
  url,
  sort,
}) => (
  <div className="List">
    <Flex horizontal="between" vertical="top">
      <Main>
        <Flex horizontal="between">
          <SortBy
            options={[
              { label: 'Rating', field: 'vote' },
              { label: 'Bookmarks', field: 'timesbookmarked' },
              { label: 'Date', field: 'createdAt' },
            ]}
            href={url}
            currentSort={sort}
          />
        </Flex>
        <Hr spacer size="small" />
        <Border grow>
          <Flex horizontal="between" noWrap>
            <H4>Bookmarks in {list?.name}</H4>
            <Flex growHorizontal={false} vertical="top">
              {list?.isPrivate && <Private className="List-icon List-iconIsPrivate" />}
              <ListFollowButton className="List-joinList" listId={list?.id} />
            </Flex>
          </Flex>
          <Span>{list?.description}</Span>
          <Hr spacer />
          <FadeInOut valueToUpdate={bookmarksLoading} speed="fastest" appear>
            {bookmarksLoading ? (
              <BookmarkRowSkeletonGroup length={bookmarksIds?.length || DEFAULT_PAGE_SIZE} />
            ) : (
              bookmarksIds?.map((id, index) => (
                <React.Fragment key={id}>
                  {!!index && <Hr spacer size="small" />}
                  <BookmarkRow id={id} />
                </React.Fragment>
              ))
            )}
            {!bookmarksLoading && !bookmarksIds?.length && <Span bold>ⵁ We didn find any bookmark.</Span>}
          </FadeInOut>
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
