import React from 'react';

import A from 'Components/A';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import ListRow from 'Components/ListRow';
import Main from 'Components/Main';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListTags from 'Components/SidebarListTags';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { Border, Button, Fade, Flex, H4, Hr } from '@antoniodcorrea/components';

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
            <BookmarkRowSkeletonGroup />
          ) : (
            listsIds?.map((id, index) => (
              <React.Fragment key={id}>
                {!!index && <Hr spacer />}
                <ListRow id={id} />
              </React.Fragment>
            ))
          )}
          <Hr spacer size="big" />
          <Flex horizontal="center">
            <Fade mounted={!!listsIds?.length} speed="fastest">
              <Button text="Load more" />
            </Fade>
          </Flex>
        </Border>
      </Main>
      <Sidebar>
        <SidebarBlock title="My Tags" href={`users/${userId}/tags`} loading={userMostUsedTagsLoading}>
          <SidebarListTags items={userMostUsedTags} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="My Tags" href={`users/${userId}/tags`} loading={mostFollowedTagsLoading}>
          <SidebarListTags items={mostFollowedTags} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
