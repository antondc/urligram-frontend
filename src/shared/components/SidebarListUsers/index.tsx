import React from 'react';

import { UserState } from 'Modules/Users/users.types';
import { A, Hr, Span, Tooltip } from '@antoniodcorrea/components';
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
              <A href={`users/${id}`} frontend styled>
                <Span bold>+ {name}</Span>
              </A>
            </div>
            <div className="SidebarListUsers-userDescription">
              {followers?.length && (
                <>
                  <Tooltip
                    parentElementId={`SidebarListUsers-followers-${id}`}
                    content="Followers of this user"
                    delay={0.5}
                  />
                  <A href={`users/${id}/followers`} frontend>
                    <Span id={`SidebarListUsers-followers-${id}`} className="SidebarListUsers-userData" size="small">
                      {' '}
                      {followers?.length} ·{' '}
                    </Span>
                  </A>
                </>
              )}
              {following?.length && (
                <>
                  <Tooltip
                    parentElementId={`SidebarListUsers-following-${id}`}
                    content="People following to this user"
                    delay={0.5}
                  />
                  <A href={`users/${id}/following`} frontend>
                    <Span id={`SidebarListUsers-following-${id}`} className="SidebarListUsers-userData" size="small">
                      {following?.length} ·{' '}
                    </Span>
                  </A>
                </>
              )}
              {bookmarks?.length && (
                <>
                  <Tooltip
                    parentElementId={`SidebarListUsers-bookmarks-${id}`}
                    content="Bookmarks of this user"
                    delay={0.5}
                  />
                  <A href={`users/${id}/bookmarks`} frontend>
                    <Span id={`SidebarListUsers-bookmarks-${id}`} className="SidebarListUsers-userData" size="small">
                      {' '}
                      {bookmarks?.length}
                    </Span>
                  </A>
                </>
              )}
            </div>
          </dd>
        </React.Fragment>
      ))
    ) : (
      <SidebarListUsersSkeleton />
    )}
  </>
);
export default SidebarListUsers;
