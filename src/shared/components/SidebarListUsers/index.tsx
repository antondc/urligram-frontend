import React from 'react';

import A from 'Components/A';
import { UserState } from 'Modules/Users/users.types';
import { Hr, Span, Tooltip } from '@antoniodcorrea/components';
import { stringToDashCase } from '../../tools/utils/string/stringToDashCase';
import { SidebarListUsersSkeleton } from './SidebarListUsersSkeleton';

import './SidebarListUsers.less';

interface Props {
  items: UserState[];
  loading?: boolean;
  title?: string;
}

const SidebarListUsers: React.FC<Props> = ({ items, loading, title: blockTitle }) => (
  <>
    {!loading ? (
      items.map(({ id, name, followers, following, bookmarksIds }, index) => (
        <React.Fragment key={id}>
          {!!index && <Hr spacer size="micro" />}
          <dd className="SidebarListUsers-user">
            <div className="SidebarListUsers-userName">
              <A href={`users/${id}`} frontend styled>
                <Span bold>@{name}</Span>
              </A>
            </div>
            <div className="SidebarListUsers-userDescription">
              {followers?.length && (
                <>
                  <Tooltip
                    parentElementId={`${stringToDashCase(blockTitle)}-followers-${index}`}
                    content="Followers of this user"
                    delay={0.5}
                  />
                  <A href={`users/${id}/followers`} frontend>
                    <Span
                      id={`${stringToDashCase(blockTitle)}-followers-${index}`}
                      className="SidebarListUsers-userData"
                      size="small"
                    >
                      {followers?.length}
                      {(following?.length || bookmarksIds?.length) && <> · </>}
                    </Span>
                  </A>
                </>
              )}
              {following?.length && (
                <>
                  <Tooltip
                    parentElementId={`${stringToDashCase(blockTitle)}-following-${index}`}
                    content="People following to this user"
                    delay={0.5}
                  />
                  <A href={`users/${id}/following`} frontend>
                    <Span
                      id={`${stringToDashCase(blockTitle)}-following-${index}`}
                      className="SidebarListUsers-userData"
                      size="small"
                    >
                      {following?.length}
                      {bookmarksIds?.length && <> · </>}
                    </Span>
                  </A>
                </>
              )}
              {bookmarksIds?.length && (
                <>
                  <Tooltip
                    parentElementId={`${stringToDashCase(blockTitle)}-bookmarks-${index}`}
                    content="Bookmarks of this user"
                    delay={0.5}
                  />
                  <A href={`users/${id}/bookmarks`} frontend>
                    <Span
                      id={`${stringToDashCase(blockTitle)}-bookmarks-${index}`}
                      className="SidebarListUsers-userData"
                      size="small"
                    >
                      {bookmarksIds?.length}
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
