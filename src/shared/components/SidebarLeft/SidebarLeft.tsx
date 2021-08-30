import React from 'react';

import ArrowRight from 'Assets/svg/arrowRight.svg';
import BookmarkFilled from 'Assets/svg/bookmarkFilled.svg';
import FlagLeft from 'Assets/svg/flagLeft.svg';
import FlagRight from 'Assets/svg/flagRight.svg';
import List from 'Assets/svg/list.svg';
import PlusCircle from 'Assets/svg/plusCircle.svg';
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
  switchUiBookmarkModal: (e: React.MouseEvent<HTMLDivElement>) => void;
  switchUiListModal: (e: React.MouseEvent<HTMLDivElement>) => void;
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
  switchUiBookmarkModal,
  switchUiListModal,
}) => (
  <div className={'SidebarLeft' + (sidebarLeftClosed ? ' SidebarLeft--closed' : '')} data-test-id="SidebarLeft">
    <div
      className={'SidebarLeft-openCloseIcon' + (sidebarLeftClosed ? ' SidebarLeft-openCloseIcon--closed' : '')}
      onMouseDown={onSidebarCloseClick}
    >
      <ArrowRight />
    </div>
    <div className="SidebarLeft-items">
      {isLoggedIn && (
        <>
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
            className={'SidebarLeft-item' + (routeName === 'UserTags' ? ' SidebarLeft-item--active' : '')}
            href={`users/${sessionId}/tags`}
            styled={false}
            frontend
          >
            <Tag className="SidebarLeft-itemIcon" />
            <span className="SidebarLeft-itemDescription">My Tags</span>
          </A>
          <div className="SidebarLeft-item" onClick={switchUiBookmarkModal}>
            <PlusCircle className="SidebarLeft-itemIcon" />
            <span className="SidebarLeft-itemDescription">Add bookmark</span>
          </div>
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
          <div className="SidebarLeft-item" onClick={switchUiListModal}>
            <PlusCircle className="SidebarLeft-itemIcon" />
            <span className="SidebarLeft-itemDescription">Create list</span>
          </div>
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
        </>
      )}
      {!isLoggedIn && (
        <>
          <A
            className={'SidebarLeft-item' + (routeName === 'SOME_ROUTE' ? ' SidebarLeft-item--active' : '')}
            href={`not-found`}
            styled={false}
            frontend
          >
            <FlagLeft className="SidebarLeft-itemIcon" />
            <span className="SidebarLeft-itemDescription">Placeholder</span>
          </A>
          <A
            className={'SidebarLeft-item' + (routeName === 'SOME_ROUTE' ? ' SidebarLeft-item--active' : '')}
            href={`not-found`}
            styled={false}
            frontend
          >
            <FlagLeft className="SidebarLeft-itemIcon" />
            <span className="SidebarLeft-itemDescription">Placeholder</span>
          </A>
          <A
            className={'SidebarLeft-item' + (routeName === 'SOME_ROUTE' ? ' SidebarLeft-item--active' : '')}
            href={`not-found`}
            styled={false}
            frontend
          >
            <FlagLeft className="SidebarLeft-itemIcon" />
            <span className="SidebarLeft-itemDescription">Placeholder</span>
          </A>
          <A
            className={'SidebarLeft-item' + (routeName === 'SOME_ROUTE' ? ' SidebarLeft-item--active' : '')}
            href={`not-found`}
            styled={false}
            frontend
          >
            <FlagLeft className="SidebarLeft-itemIcon" />
            <span className="SidebarLeft-itemDescription">Placeholder</span>
          </A>
        </>
      )}
      {!!isLoggedIn && (
        <A
          className={'SidebarLeft-item' + (routeName === 'User' ? ' SidebarLeft-item--active' : '')}
          href={`users/${sessionId}`}
          styled={false}
          frontend
        >
          <UserFill className="SidebarLeft-itemIcon" />
          <span className="SidebarLeft-itemDescription">{glossary.myUser}</span>
        </A>
      )}
    </div>
  </div>
);
