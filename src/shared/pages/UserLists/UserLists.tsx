import React from 'react';

import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import ListRow from 'Components/ListRow';
import Main from 'Components/Main';
import MainContent from 'Components/MainContent';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListTags from 'Components/SidebarListTags';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import { A, FadeInOut, Flex, Frame, Hr, SortBy, Span } from 'Vendor/components';

import './UserLists.less';

interface Props {
  userId: string;
  user: UserState;
  listsIds: number[];
  listsLoading: boolean;
  userMostUsedTags: TagState[];
  userMostUsedTagsLoading: boolean;
  mostFollowedTags: TagState[];
  mostFollowedTagsLoading: boolean;
  url: string;
  page: {
    size: number;
    offset: number;
  };
  totalItems: number;
  sort: string;
}

export const UserLists: React.FC<Props> = ({
  userId,
  user,
  listsIds,
  listsLoading,
  userMostUsedTags,
  userMostUsedTagsLoading,
  mostFollowedTags,
  mostFollowedTagsLoading,
  url,
  page,
  totalItems,
  sort,
}) => (
  <div className="UserLists">
    <Flex horizontal="between" vertical="top">
      <Main>
        <Hr spacer size="nano" />
        <Hr spacer />
        <Frame grow padding="small">
          <Span size="normal" bold>
            Lists of <A href={`/users/${userId}`}>@{user?.name}</A>
          </Span>
        </Frame>
        <Frame grow padding="none" shadow={false} borderBottom={false} borderTop={false}>
          <Flex horizontal="right">
            <SortBy
              options={[
                { label: 'Created at', field: 'createdAt' },
                { label: 'Members', field: 'members' },
                { label: 'Bookmarks', field: 'bookmarks' },
              ]}
              href={url}
              currentSort={sort}
            />
          </Flex>
        </Frame>
        <Frame grow padding="small">
          <FadeInOut valueToUpdate={listsLoading} speed="fastest" appear>
            <MainContent>
              {listsLoading ? (
                <BookmarkRowSkeletonGroup length={listsIds?.length || DEFAULT_PAGE_SIZE} />
              ) : (
                listsIds?.map((id) => <ListRow id={id} key={id} />)
              )}
              {!listsLoading && !listsIds?.length && <Span bold>ⵁ We didn find any list.</Span>}
            </MainContent>
          </FadeInOut>
        </Frame>
        <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
      </Main>
      <Sidebar>
        <SidebarBlock title="My Tags" href={`users/${userId}/tags`} loading={userMostUsedTagsLoading}>
          <SidebarListTags items={userMostUsedTags} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="Most Used Tags" href={`users/${userId}/tags`} loading={mostFollowedTagsLoading}>
          <SidebarListTags items={mostFollowedTags} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
