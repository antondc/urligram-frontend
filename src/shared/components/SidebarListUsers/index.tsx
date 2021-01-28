import React from 'react';

import { Hr, Span, Tooltip } from '@antoniodcorrea/components';
import { UserState } from '../../redux/modules/Users/users.types';
import { SidebarListUsersSkeleton } from './SidebarListUsersSkeleton';

import './SidebarListUsers.less';

interface Props {
  items: UserState[];
  loading?: boolean;
}

const SidebarListUsers: React.FC<Props> = ({ items, loading }) => (
  <>
    {!loading && items?.length ? (
      items.map(({ id, name, followers, following, bookmarks }, index) => (
        <React.Fragment key={id}>
          {!!index && <Hr spacer size="micro" />}
          <dd className="SidebarListUsers-user">
            <div className="SidebarListUsers-userName">
              <Span bold>+ {name}</Span>
            </div>
            <div id={id + '-' + index} className="SidebarListUsers-userDescription">
              <Span size="small"> {followers?.length && followers?.length}</Span> ·
              <Span size="small"> {following?.length && following?.length}</Span> ·
              <Span size="small"> {bookmarks?.length && bookmarks?.length}</Span>
            </div>
            <Tooltip parentElementId={id + '-' + index} content="This is something" />
          </dd>
        </React.Fragment>
      ))
    ) : (
      <SidebarListUsersSkeleton />
    )}
  </>
);
export default SidebarListUsers;
