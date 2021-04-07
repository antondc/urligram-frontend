import React from 'react';

import A from 'Components/A';
import { RenderInPortal } from 'Components/Portal';
import { UserState } from 'Modules/Users/users.types';
import { stringToDashCase } from 'Tools/utils/string/stringToDashCase';
import { Hr, Span, Tooltip } from '@antoniodcorrea/components';
import { SidebarListUsersSkeleton } from './SidebarListUsersSkeleton';

import './SidebarListUsers.less';

interface Props {
  items: UserState[];
  loading?: boolean;
  title?: string;
}

const SidebarListUsers: React.FC<Props> = ({ items, loading, title: blockTitle }) => {
  if (loading) return <SidebarListUsersSkeleton />;
  if (!items?.length) return <Span bold>ⵁ Nothing here yet.</Span>;

  return (
    <>
      {items?.map(({ id, name, followers, following, bookmarksIds }, index) => (
        <React.Fragment key={`${id}-${index}`}>
          {!!index && <Hr spacer size="micro" />}
          <dd className="SidebarListUsers-user">
            <div className="SidebarListUsers-userName">
              <A href={`users/${id}`} frontend styled>
                <Span bold>@{name}</Span>
              </A>
            </div>
            <div className="SidebarListUsers-userDescription">
              {!!followers?.length && (
                <>
                  <RenderInPortal>
                    <Tooltip
                      parentElementId={`${stringToDashCase(blockTitle)}-followers-${index}`}
                      content="Followers of this user"
                      delay={0.5}
                    />
                  </RenderInPortal>
                  <A href={`users/${id}/followers`} frontend>
                    <Span
                      id={`${stringToDashCase(blockTitle)}-followers-${index}`}
                      className="SidebarListUsers-userData"
                      size="small"
                    >
                      {followers?.length}
                      {(!!following?.length || !!bookmarksIds?.length) && <> · </>}
                    </Span>
                  </A>
                </>
              )}
              {!!following?.length && (
                <>
                  <RenderInPortal>
                    <Tooltip
                      parentElementId={`${stringToDashCase(blockTitle)}-following-${index}`}
                      content="People following to this user"
                      delay={0.5}
                    />
                  </RenderInPortal>
                  <A href={`users/${id}/following`} frontend>
                    <Span
                      id={`${stringToDashCase(blockTitle)}-following-${index}`}
                      className="SidebarListUsers-userData"
                      size="small"
                    >
                      {following?.length}
                      {!!bookmarksIds?.length && <> · </>}
                    </Span>
                  </A>
                </>
              )}
              {!!bookmarksIds?.length && (
                <>
                  <RenderInPortal>
                    <Tooltip
                      parentElementId={`${stringToDashCase(blockTitle)}-bookmarks-${index}`}
                      content="Bookmarks of this user"
                      delay={0.5}
                    />
                  </RenderInPortal>
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
      ))}
    </>
  );
};
export default SidebarListUsers;
