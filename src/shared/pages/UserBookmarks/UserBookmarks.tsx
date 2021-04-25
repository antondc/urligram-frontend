import React from 'react';

import A from 'Components/A';
import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import Empty from 'Components/Empty';
import Main from 'Components/Main';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarBlock from 'Components/SidebarBlock';
import SidebarListUsers from 'Components/SidebarListUsers';
import { BookmarksByKey } from 'Modules/Bookmarks/bookmarks.types';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import { Border, FadeInOut, Flex, H4, Hr, Select, SelectValue, SortBy } from 'Vendor/components';

import './UserBookmarks.less';

interface Props {
  userId: string;
  user: UserState;
  bookmarksByKey: BookmarksByKey;
  bookmarksIds: number[];
  bookmarksLoading: boolean;
  followingUsers: UserState[];
  followingUsersLoading: boolean;
  followersUsers: UserState[];
  followersUsersLoading: boolean;
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

export const UserBookmarks: React.FC<Props> = ({
  userId,
  user,
  bookmarksByKey,
  bookmarksIds,
  bookmarksLoading,
  followingUsers,
  followingUsersLoading,
  followersUsers,
  followersUsersLoading,
  page,
  totalItems,
  url,
  sort,
  tagsSearchFormatted,
  onInputChange,
  onChange,
  allTags,
  currentQueryParamFilterTags,
}) => (
  <div className="UserBookmarks">
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
              { label: 'Rating', field: 'vote' },
              { label: 'Bookmarked', field: 'timesbookmarked' },
              { label: 'Created', field: 'createdAt' },
            ]}
            href={url}
            currentSort={sort}
          />
        </Flex>
        <Hr spacer size="small" />
        <Border grow>
          <H4>
            Bookmarks of{' '}
            <A frontend href={`/users/${userId}`}>
              @{user?.name}
            </A>
          </H4>
          <Hr spacer />
          {bookmarksLoading ? (
            <BookmarkRowSkeletonGroup length={bookmarksIds?.length || DEFAULT_PAGE_SIZE} />
          ) : (
            bookmarksIds?.map((id, index) => (
              <FadeInOut valueToUpdate={bookmarksByKey[id]?.deleting} appear key={id}>
                {!bookmarksByKey[id]?.deleting && (
                  <>
                    {!!index && <Hr spacer size="small" />}
                    <BookmarkRow id={id} />
                  </>
                )}
              </FadeInOut>
            ))
          )}
          {!bookmarksLoading && !bookmarksIds?.length && <Empty message="ⵁ This user has no bookmarks yet" />}
          <Flex horizontal="center">
            <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
          </Flex>
        </Border>
      </Main>
      <Sidebar>
        <SidebarBlock title="Following Users" href={`users/${userId}/following`} loading={followingUsersLoading}>
          <SidebarListUsers items={followingUsers} />
        </SidebarBlock>
        <Hr spacer />
        <SidebarBlock title="Followers" href={`users/${userId}/followers`} loading={followersUsersLoading}>
          <SidebarListUsers items={followersUsers} />
        </SidebarBlock>
      </Sidebar>
    </Flex>
  </div>
);
