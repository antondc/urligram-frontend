import React from 'react';

import A from 'Components/A';
import { RenderInPortal } from 'Components/Portal';
import { UserState } from 'Modules/Users/users.types';
import { stringToDashCase } from 'Tools/utils/string/stringToDashCase';
import { Bookmark, FadeInOut, Frame, H4, Hr, Span, Tooltip } from 'Vendor/components';
import { SidebarListUsersSkeleton } from './SidebarListUsersSkeleton';

import './SidebarListUsers.less';

interface Props {
  users: UserState[];
  loading: boolean;
  title: string;
  href?: string;
}

const SidebarListUsers: React.FC<Props> = ({ users, loading, title, href }) => (
  <Frame className="SidebarListUsers" grow borders={false}>
    <A href={href} frontend styled={!!href} disabled={!href}>
      <H4>{title}</H4>
    </A>
    <Hr size="small" spacer />
    <FadeInOut className="SidebarListUsers-grid" valueToUpdate={loading} appear>
      {!users?.length && <Span weight="semiBold">ⵁ Nothing here yet.</Span>}
      {!!users?.length && loading && <SidebarListUsersSkeleton />}
      {!!users?.length &&
        !loading &&
        users?.map(({ id, name, followers, following, bookmarksIds }, index) => (
          <React.Fragment key={`${id}-${index}`}>
            <A href={`users/${id}`} frontend>
              <Span weight="extraBold">@{name}</Span>
            </A>
            <RenderInPortal>
              <Tooltip
                parentElementId={`${stringToDashCase(title)}-followers-${id}`}
                content="Followers of this user"
                delay={0.5}
              />
            </RenderInPortal>
            <Span
              id={`${stringToDashCase(title)}-followers-${id}`}
              className="SidebarListUsers-descriptionItem"
              size="micro"
              weight="semiBold"
            >
              {!!followers?.length && (
                <A href={`users/${id}/followers`} frontend styled={false}>
                  <span> {followers?.length}</span>@
                </A>
              )}
            </Span>
            <RenderInPortal>
              <Tooltip
                parentElementId={`${stringToDashCase(title)}-following-${id}`}
                content="People following to this user"
                delay={0.5}
              />
            </RenderInPortal>
            <Span
              id={`${stringToDashCase(title)}-following-${id}`}
              className="SidebarListUsers-descriptionItem"
              size="micro"
              weight="semiBold"
            >
              {!!following?.length && (
                <A href={`users/${id}/following`} frontend styled={false}>
                  <span>{following?.length}</span>@
                </A>
              )}
            </Span>
            <RenderInPortal>
              <Tooltip
                parentElementId={`${stringToDashCase(title)}-bookmarks-${id}`}
                content="Bookmarks of this user"
                delay={0.5}
              />
            </RenderInPortal>
            <Span
              id={`${stringToDashCase(title)}-bookmarks-${id}`}
              className="SidebarListUsers-descriptionItem"
              size="micro"
              weight="semiBold"
            >
              {!!bookmarksIds?.length && (
                <A href={`users/${id}/bookmarks`} frontend styled={false}>
                  <span>{bookmarksIds?.length} </span>
                  <Bookmark size="micro" />
                </A>
              )}
            </Span>
          </React.Fragment>
        ))}
    </FadeInOut>
  </Frame>
);
export default SidebarListUsers;
