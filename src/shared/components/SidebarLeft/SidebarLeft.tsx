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
import SidebarLeftLists from './SidebarLeftLists';

import './SidebarLeft.less';

interface Props {
  routeName: string;
  isLoggedIn: boolean;
  sessionId: string;
  glossary: GlossaryState;
  lists: ListState[];
  listsLoading: boolean;
  listsShown: boolean;
  sidebarLeftClosed: boolean;
  onListTitleClick: () => void;
  onSidebarCloseClick: () => void;
}

export const SidebarLeft: React.FC<Props> = ({
  routeName,
  isLoggedIn,
  sessionId,
  glossary,
  lists,
  listsShown,
  sidebarLeftClosed,
  onListTitleClick,
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
          className={'SidebarLeft-item' + (routeName === 'Tags' ? ' SidebarLeft-item--active' : '')}
          href="/tags"
          styled={false}
          frontend
        >
          <Tag className="SidebarLeft-itemIcon" />
          <span className="SidebarLeft-itemDescription">All Tags</span>
        </A>
        <A
          className={'SidebarLeft-item' + (routeName === 'Lists' ? ' SidebarLeft-item--active' : '')}
          href="/lists"
          styled={false}
          frontend
        >
          <List className="SidebarLeft-itemIcon SidebarLeft-itemIconList" />
          <span className="SidebarLeft-itemDescription">All Lists</span>
        </A>
        <A
          className={'SidebarLeft-item' + (routeName === 'Bookmarks' ? ' SidebarLeft-item--active' : '')}
          href="/bookmarks"
          styled={false}
          frontend
        >
          <BookmarkFilled className="SidebarLeft-itemIcon" />
          <span className="SidebarLeft-itemDescription">{glossary.allBookmarks}</span>
        </A>
      </>
      {!!isLoggedIn && (
        <>
          <div className="SidebarLeft-divider" />
          <A
            className={'SidebarLeft-item' + (routeName === 'UserTags' ? ' SidebarLeft-item--active' : '')}
            href={`users/${sessionId}/tags`}
            styled={false}
            frontend
          >
            <Tag className="SidebarLeft-itemIcon" />
            <span className="SidebarLeft-itemDescription">My Tags</span>
          </A>
          <A
            className={'SidebarLeft-item' + (routeName === 'Followers' ? ' SidebarLeft-item--active' : '')}
            href={`users/${sessionId}/followers`}
            styled={false}
            frontend
          >
            <FlagRight className="SidebarLeft-itemIcon" />
            <span className="SidebarLeft-itemDescription">Followers</span>
          </A>
          <A
            className={'SidebarLeft-item' + (routeName === 'Following' ? ' SidebarLeft-item--active' : '')}
            href={`users/${sessionId}/following`}
            styled={false}
            frontend
          >
            <FlagLeft className="SidebarLeft-itemIcon" />
            <span className="SidebarLeft-itemDescription">Following</span>
          </A>
          <A
            className={'SidebarLeft-item' + (routeName === 'UserLists' ? ' SidebarLeft-item--active' : '')}
            href={`users/${sessionId}/lists?sort=-createdAt`}
            styled={false}
            frontend
          >
            <List className="SidebarLeft-itemIcon SidebarLeft-itemIconList" />
            <span className="SidebarLeft-itemDescription">
              <span>My Lists </span>
              <span
                className={'SidebarLeft-triangle' + (listsShown ? ' SidebarLeft-triangle--open' : '')}
                onClick={onListTitleClick}
              >
                <TriangleRounded className="SidebarLeft-triangleIcon" />
              </span>
            </span>
          </A>
          <div className="SidebarLeft-itemLists">
            <SidebarLeftLists lists={lists} loading={false} listsShown={listsShown} />
          </div>
          <A
            className={'SidebarLeft-item' + (routeName === 'UserBookmarks' ? ' SidebarLeft-item--active' : '')}
            href={`users/${sessionId}/bookmarks`}
            styled={false}
            frontend
          >
            <BookmarkFilled className="SidebarLeft-itemIcon" />
            <span className="SidebarLeft-itemDescription">{glossary.myBookmarks}</span>
          </A>
          <A
            className={'SidebarLeft-item' + (routeName === 'User' ? ' SidebarLeft-item--active' : '')}
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
