import React from 'react';

import A from 'Components/A';
import { RenderInPortal } from 'Components/Portal';
import { UserState } from 'Modules/Users/users.types';
import { stringToDashCase } from 'Tools/utils/string/stringToDashCase';
import { Bookmark, Tooltip } from 'Vendor/components';
import { SidebarListUsersSkeleton } from './SidebarListUsersSkeleton';

import './SidebarListUsers.less';

interface Props {
  className?: string;
  title: string;
  users: UserState[];
  loading: boolean;
  href?: string;
  padding?: boolean;
  borderBottom?: boolean;
}

const SidebarListUsers: React.FC<Props> = ({ users, loading, title, href, className }) => {
  if (!users?.length && !loading) return null;

  return (
    <div className={'SidebarListUsers' + (className ? ' ' + className : '')}>
      <A className="SidebarListUsers-header" href={href} frontend styled={!!href} disabled={!href} underlined>
        {title}
      </A>
      <div className="SidebarListUsers-grid">
        {!!loading && <SidebarListUsersSkeleton />}
        {!loading &&
          users?.map(({ id, name, followers, following, bookmarksIds }, index) => (
            <React.Fragment key={`${id}-${index}`}>
              <A className="SidebarListUsers-name" href={`users/${id}`} frontend underlined>
                @{name}
              </A>
              <RenderInPortal>
                <Tooltip
                  parentElementId={`${stringToDashCase(title)}-followers-${id}`}
                  content="Followers of this user"
                  delay={0.5}
                />
              </RenderInPortal>
              <span id={`${stringToDashCase(title)}-followers-${id}`} className="SidebarListUsers-descriptionItem">
                {!!followers?.length && (
                  <A href={`users/${id}/followers`} frontend styled={false}>
                    {followers?.length}@
                  </A>
                )}
              </span>
              <RenderInPortal>
                <Tooltip
                  parentElementId={`${stringToDashCase(title)}-following-${id}`}
                  content="People following to this user"
                  delay={0.5}
                />
              </RenderInPortal>
              <span id={`${stringToDashCase(title)}-following-${id}`} className="SidebarListUsers-descriptionItem">
                {!!following?.length && (
                  <A href={`users/${id}/following`} frontend styled={false}>
                    {following?.length}@
                  </A>
                )}
              </span>
              <RenderInPortal>
                <Tooltip
                  parentElementId={`${stringToDashCase(title)}-bookmarks-${id}`}
                  content="Bookmarks of this user"
                  delay={0.5}
                />
              </RenderInPortal>
              <span id={`${stringToDashCase(title)}-bookmarks-${id}`} className="SidebarListUsers-descriptionItem">
                {!!bookmarksIds?.length && (
                  <A href={`users/${id}/bookmarks`} frontend styled={false}>
                    {bookmarksIds?.length}
                    <Bookmark className="SidebarListUsers-bookmarkIcon" />
                  </A>
                )}
              </span>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};
export default SidebarListUsers;
