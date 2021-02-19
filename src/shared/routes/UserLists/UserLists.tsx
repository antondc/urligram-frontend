import React from 'react';

import A from 'Components/A';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import ListRow from 'Components/ListRow';
import Main from 'Components/Main';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListTags from 'Components/SidebarListTags';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { Border, Flex, H4, Hr } from '@antoniodcorrea/components';

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
}) => (
  <div className="UserLists">
    <Flex horizontal="between" vertical="top">
      <Main>
        <Border grow>
          <H4>
            Lists of <A href={`/users/${userId}`}>@{user?.name}</A>
          </H4>
          <Hr spacer />
          {listsLoading ? (
            <BookmarkRowSkeletonGroup length={listsIds?.length} />
          ) : (
            listsIds?.map((id, index) => (
              <React.Fragment key={id}>
                {!!index && <Hr spacer />}
                <ListRow id={id} />
              </React.Fragment>
            ))
          )}
          <Flex horizontal="center">
            <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
          </Flex>
        </Border>
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
