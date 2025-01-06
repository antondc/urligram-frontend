import React from 'react';

import ArrowRight from 'Assets/svg/arrowRight.svg';
import BookmarkFilled from 'Assets/svg/bookmarkFilled.svg';
import Flag from 'Assets/svg/flag.svg';
import FolderSolid from 'Assets/svg/folderSolid.svg';
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
  itemClick: () => void;
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
  itemClick,
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
          onClick={itemClick}
          scrollBeforeNavigate
        >
          <Circle className="SidebarLeft-itemIcon" />
          <span className="SidebarLeft-itemDescription">{glossary.home}</span>
        </A>

        <A
          className={'SidebarLeft-item' + (routeName === 'Lists' ? ' SidebarLeft-item--active' : '')}
          href="/lists"
          styled={false}
          frontend
          scrollBeforeNavigate
        >
          <FolderSolid className="SidebarLeft-itemIcon SidebarLeft-itemIconList" />
          <span className="SidebarLeft-itemDescription">{glossary.lists}</span>
        </A>
        <A
          className={'SidebarLeft-item' + (routeName === 'Users' ? ' SidebarLeft-item--active' : '')}
          href={`users`}
          styled={false}
          frontend
          scrollBeforeNavigate
        >
          <UserFill className="SidebarLeft-itemIcon" />
          <span className="SidebarLeft-itemDescription">{glossary.users}</span>
        </A>
        <A
          className={'SidebarLeft-item' + (routeName === 'Tags' ? ' SidebarLeft-item--active' : '')}
          href="/tags"
          styled={false}
          frontend
          scrollBeforeNavigate
        >
          <Tag className="SidebarLeft-itemIcon" />
          <span className="SidebarLeft-itemDescription">{glossary.tags}</span>
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
            scrollBeforeNavigate
          >
            <BookmarkFilled className="SidebarLeft-itemIcon" />
            <span className="SidebarLeft-itemDescription">{glossary.myBookmarks}</span>
          </A>
          <div
            className={
              'SidebarLeft-item' + (routeName === 'UserLists' && isUserPage ? ' SidebarLeft-item--active' : '')
            }
          >
            <A
              className="SidebarLeft-itemLists"
              href={`users/${sessionId}/lists?sort=-createdAt`}
              styled={false}
              frontend
              scrollBeforeNavigate
            >
              <FolderSolid className="SidebarLeft-itemIcon SidebarLeft-itemIconList" />
              <span className="SidebarLeft-itemDescription">
                <span>{glossary.myLists}</span>
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
            className={
              'SidebarLeft-item' + (routeName === 'Followers' && isUserPage ? ' SidebarLeft-item--active' : '')
            }
            href={`users/${sessionId}/followers`}
            styled={false}
            frontend
            scrollBeforeNavigate
          >
            <Flag className="SidebarLeft-itemIcon" />
            <span className="SidebarLeft-itemDescription">{glossary.followers}</span>
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
            <A href={`users/${sessionId}/following`} styled={false} frontend scrollBeforeNavigate>
              <Flag className="SidebarLeft-itemIcon SidebarLeft-itemIconLeft" />
              <span className="SidebarLeft-itemDescription">{glossary.following}</span>
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
          <A
            className={'SidebarLeft-item' + (routeName === 'UserTags' && isUserPage ? ' SidebarLeft-item--active' : '')}
            href={`users/${sessionId}/tags`}
            styled={false}
            frontend
            scrollBeforeNavigate
          >
            <Tag className="SidebarLeft-itemIcon" />
            <span className="SidebarLeft-itemDescription">{glossary.myTags}</span>
          </A>
        </>
      )}
    </div>
  </div>
);
