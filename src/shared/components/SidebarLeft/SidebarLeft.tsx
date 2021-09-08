import React from 'react';

import ArrowRight from 'Assets/svg/arrowRight.svg';
import BookmarkFilled from 'Assets/svg/bookmarkFilled.svg';
import FlagLeft from 'Assets/svg/flagLeft.svg';
import FlagRight from 'Assets/svg/flagRight.svg';
import List from 'Assets/svg/list.svg';
import Circle from 'Assets/svg/logoCircleEmpty.svg';
import Tag from 'Assets/svg/tag.svg';
import TriangleRounded from 'Assets/svg/triangleRounded.svg';
import UserFill from 'Assets/svg/userFill.svg';
import A from 'Components/A';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { ListState } from 'Modules/Lists/lists.types';
import { UserState } from 'Modules/Users/users.types';
import SidebarLeftLists from './SidebarLeftLists';
import SidebarLeftUsers from './SidebarLeftUsers';

import './SidebarLeft.less';

interface Props {
  routeName: string;
  isLoggedIn: boolean;
  sessionId: string;
  glossary: GlossaryState;
  lists: ListState[];
  listsLoading: boolean;
  listsShown: boolean;
  followersShown: boolean;
  followers: UserState[];
  onFollowersTriangleClick: () => void;
  followingShown: boolean;
  following: UserState[];
  onFollowingTriangleClick: () => void;
  sidebarLeftClosed: boolean;
  isUserPage: boolean;
  onListsTriangleClick: () => void;
  onSidebarCloseClick: () => void;
}

export const SidebarLeft: React.FC<Props> = ({
  routeName,
  isLoggedIn,
  sessionId,
  glossary,
  lists,
  listsShown,
  followersShown,
  followers,
  onFollowersTriangleClick,
  followingShown,
  following,
  onFollowingTriangleClick,
  sidebarLeftClosed,
  isUserPage,
  onListsTriangleClick,
  onSidebarCloseClick,
}) => (
  <div className={'SidebarLeft' + (sidebarLeftClosed ? ' SidebarLeft--closed' : '')} data-test-id="SidebarLeft">
    <div
      className={'SidebarLeft-openCloseIcon' + (sidebarLeftClosed ? ' SidebarLeft-openCloseIcon--closed' : '')}
      onMouseDown={onSidebarCloseClick}
    >
      <ArrowRight />
    </div>
    <div className="SidebarLeft-items">
      <>
        <A
          className={'SidebarLeft-item' + (routeName === 'Home' ? ' SidebarLeft-item--active' : '')}
          href="/"
          styled={false}
          frontend
        >
          <Circle className="SidebarLeft-itemIcon" />
          <span className="SidebarLeft-itemDescription">{glossary.home}</span>
        </A>

        <A
          className={'SidebarLeft-item' + (routeName === 'Lists' ? ' SidebarLeft-item--active' : '')}
          href="/lists"
          styled={false}
          frontend
        >
          <List className="SidebarLeft-itemIcon SidebarLeft-itemIconList" />
          <span className="SidebarLeft-itemDescription">Lists</span>
        </A>
        <A
          className={'SidebarLeft-item' + (routeName === 'Users' ? ' SidebarLeft-item--active' : '')}
          href={`users`}
          styled={false}
          frontend
        >
          <UserFill className="SidebarLeft-itemIcon" />
          <span className="SidebarLeft-itemDescription">Users</span>
        </A>
        <A
          className={'SidebarLeft-item' + (routeName === 'Tags' ? ' SidebarLeft-item--active' : '')}
          href="/tags"
          styled={false}
          frontend
        >
          <Tag className="SidebarLeft-itemIcon" />
          <span className="SidebarLeft-itemDescription">Tags</span>
        </A>
      </>
      {!!isLoggedIn && (
        <>
          <div className="SidebarLeft-divider" />
          <A
            className={
              'SidebarLeft-item' + (routeName === 'UserBookmarks' && isUserPage ? ' SidebarLeft-item--active' : '')
            }
            href={`users/${sessionId}/bookmarks`}
            styled={false}
            frontend
          >
            <BookmarkFilled className="SidebarLeft-itemIcon" />
            <span className="SidebarLeft-itemDescription">{glossary.myBookmarks}</span>
          </A>
          <A
            className={'SidebarLeft-item' + (routeName === 'UserTags' && isUserPage ? ' SidebarLeft-item--active' : '')}
            href={`users/${sessionId}/tags`}
            styled={false}
            frontend
          >
            <Tag className="SidebarLeft-itemIcon" />
            <span className="SidebarLeft-itemDescription">My Tags</span>
          </A>
          <A
            className={
              'SidebarLeft-item' + (routeName === 'Followers' && isUserPage ? ' SidebarLeft-item--active' : '')
            }
            href={`users/${sessionId}/followers`}
            styled={false}
            frontend
          >
            <FlagRight className="SidebarLeft-itemIcon" />
            <span className="SidebarLeft-itemDescription">Followers</span>
            <span
              className={'SidebarLeft-triangle' + (followersShown ? ' SidebarLeft-triangle--open' : '')}
              onClick={onFollowersTriangleClick}
            >
              <TriangleRounded className="SidebarLeft-triangleIcon" />
            </span>
          </A>
          <div className="SidebarLeft-users">
            <SidebarLeftUsers users={followers} usersShown={followersShown} />
          </div>
          <div
            className={
              'SidebarLeft-item' + (routeName === 'Following' && isUserPage ? ' SidebarLeft-item--active' : '')
            }
          >
            <A href={`users/${sessionId}/following`} styled={false} frontend>
              <FlagLeft className="SidebarLeft-itemIcon" />
              <span className="SidebarLeft-itemDescription">Following</span>
            </A>
            <span
              className={'SidebarLeft-triangle' + (followingShown ? ' SidebarLeft-triangle--open' : '')}
              onClick={onFollowingTriangleClick}
            >
              <TriangleRounded className="SidebarLeft-triangleIcon" />
            </span>
          </div>
          <div className="SidebarLeft-users">
            <SidebarLeftUsers users={following} usersShown={followingShown} />
          </div>
          <div
            className={
              'SidebarLeft-item' + (routeName === 'UserLists' && isUserPage ? ' SidebarLeft-item--active' : '')
            }
          >
            <A href={`users/${sessionId}/lists?sort=-createdAt`} styled={false} frontend>
              <List className="SidebarLeft-itemIcon SidebarLeft-itemIconList" />
              <span className="SidebarLeft-itemDescription">
                <span>My Lists </span>
              </span>
            </A>
            <span
              className={'SidebarLeft-triangle' + (listsShown ? ' SidebarLeft-triangle--open' : '')}
              onClick={onListsTriangleClick}
            >
              <TriangleRounded className="SidebarLeft-triangleIcon" />
            </span>
          </div>
          <div className="SidebarLeft-lists">
            <SidebarLeftLists lists={lists} loading={false} listsShown={listsShown} />
          </div>
          <A
            className={'SidebarLeft-item' + (routeName === 'User' && isUserPage ? ' SidebarLeft-item--active' : '')}
            href={`users/${sessionId}`}
            styled={false}
            frontend
          >
            <UserFill className="SidebarLeft-itemIcon" />
            <span className="SidebarLeft-itemDescription">{glossary.myUser}</span>
          </A>
        </>
      )}
    </div>
  </div>
);
