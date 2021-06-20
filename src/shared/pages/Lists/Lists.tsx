import React from 'react';

import ListRow from 'Components/ListRow';
import { ListRowSkeletonGroup } from 'Components/ListRow/ListSkeletonGroup';
import Pagination from 'Components/Pagination';
import Sidebar from 'Components/Sidebar';
import SidebarListTags from 'Components/SidebarListTags';
import SidebarListUsers from 'Components/SidebarListUsers';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE } from 'Root/src/shared/constants';
import { Hr, SortBy, Span } from 'Vendor/components';

import './Lists.less';

interface Props {
  listsIds: number[];
  listsIdsLoading: boolean;
  mostUsedTags: TagState[];
  mostUsedTagsLoading: boolean;
  newUsers: UserState[];
  newUsersLoading: boolean;
  url: string;
  page: {
    size: number;
    offset: number;
  };
  totalItems: number;
  sort: string;
}

export const Lists: React.FC<Props> = ({
  listsIds,
  listsIdsLoading,
  mostUsedTags,
  mostUsedTagsLoading,
  newUsers,
  newUsersLoading,
  url,
  page,
  totalItems,
  sort,
}) => (
  <>
    <div className="Lists">
      <div className="Lists-header">
        <SortBy
          options={[
            { label: 'Date', field: 'createdAt' },
            { label: 'Updated', field: 'updatedAt' },
            { label: 'Members', field: 'members' },
          ]}
          href={url}
          currentSort={sort}
          loading={listsIdsLoading}
        />
      </div>
      <div className="Lists-lists">
        {listsIdsLoading ? (
          <ListRowSkeletonGroup length={listsIds?.length || DEFAULT_PAGE_SIZE} />
        ) : (
          listsIds?.map((id) => <ListRow id={id} key={id} />)
        )}
        {!listsIdsLoading && !listsIds?.length && (
          <div className="UserBookmarks-noResults">ⵁ We didnt find any list.</div>
        )}
      </div>
      <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={url} />
      <Hr spacer size="normal" />
    </div>
    <Sidebar>
      <SidebarListTags
        className="Lists-sidebarListUsersFirst"
        title="Most Used Tags"
        loading={mostUsedTagsLoading}
        tags={mostUsedTags}
      />
      <SidebarListUsers
        title="New Users"
        users={newUsers}
        loading={newUsersLoading}
        href="users?sort=createdAt&page[size]=10"
      />
    </Sidebar>
  </>
);
