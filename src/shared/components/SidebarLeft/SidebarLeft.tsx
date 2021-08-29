import React from 'react';

import ArrowRight from 'Assets/svg/arrowRight.svg';
import BookmarkFilled from 'Assets/svg/bookmarkFilled.svg';
import FlagLeft from 'Assets/svg/flagLeft.svg';
import FlagRight from 'Assets/svg/flagRight.svg';
import List from 'Assets/svg/list.svg';
import PlusCircle from 'Assets/svg/plusCircle.svg';
import Tag from 'Assets/svg/tag.svg';
import Triangle from 'Assets/svg/triangle.svg';
import UserFill from 'Assets/svg/userFill.svg';
import A from 'Components/A';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { ListState } from 'Modules/Lists/lists.types';
import { Space } from 'Vendor/components';
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
  switchUiBookmarkModal: (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<SVGElement>) => void;
  switchUiListModal: (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<SVGElement>) => void;
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
  <div className="SidebarLeft" data-test-id="SidebarLeft">
    <div className="SidebarLeft-grid">
      <div
        className={'SidebarLeft-openCloseIcon' + (sidebarLeftClosed ? ' SidebarLeft-openCloseIcon--closed' : '')}
        onClick={onSidebarCloseClick}
      >
        <ArrowRight />
      </div>
      {isLoggedIn && (
        <>
          <A href={`users/${sessionId}/bookmarks`} frontend styled={false}>
            <BookmarkFilled
              className={
                'SidebarLeft-icon SidebarLeft-iconBookmarkFilled' +
                (routeName === 'UserBookmarks' ? ' SidebarLeft-icon--active' : '')
              }
            />
          </A>
          <A
            className={'SidebarLeft-link' + (sidebarLeftClosed ? ' SidebarLeft-link--hidden' : '')}
            href={`users/${sessionId}/bookmarks`}
            frontend
            underlined
            active={routeName === 'UserBookmarks'}
          >
            {glossary.myBookmarks}
          </A>

          <A href={`users/${sessionId}/tags`} frontend styled={false}>
            <Tag
              className={
                'SidebarLeft-icon SidebarLeft-iconUserTags' +
                (routeName === 'UserTags' ? ' SidebarLeft-icon--active' : '')
              }
            />
          </A>
          <A
            className={'SidebarLeft-link' + (sidebarLeftClosed ? ' SidebarLeft-link--hidden' : '')}
            href={`users/${sessionId}/tags`}
            frontend
            underlined
            active={routeName === 'UserTags'}
          >
            My Tags
          </A>
          <PlusCircle className="SidebarLeft-icon SidebarLeft-iconPlusCircle" onClick={switchUiBookmarkModal} />
          <A
            className={'SidebarLeft-link' + (sidebarLeftClosed ? ' SidebarLeft-link--hidden' : '')}
            href=""
            frontend
            underlined
            onClick={switchUiBookmarkModal}
          >
            Add bookmark
          </A>

          <A href={`users/${sessionId}/followers`} frontend styled={false}>
            <FlagRight
              className={
                'SidebarLeft-icon SidebarLeft-iconFlagRight' +
                (routeName === 'Followers' ? ' SidebarLeft-icon--active' : '')
              }
            />
          </A>
          <A
            className={'SidebarLeft-link' + (sidebarLeftClosed ? ' SidebarLeft-link--hidden' : '')}
            href={`users/${sessionId}/followers`}
            frontend
            underlined
            active={routeName === 'Followers'}
          >
            Followers
          </A>
          <A href={`users/${sessionId}/following`} frontend styled={false}>
            <FlagLeft
              className={
                'SidebarLeft-icon SidebarLeft-iconFlagLeft' +
                (routeName === 'Following' ? ' SidebarLeft-icon--active' : '')
              }
            />
          </A>
          <A
            className={'SidebarLeft-link' + (sidebarLeftClosed ? ' SidebarLeft-link--hidden' : '')}
            href={`users/${sessionId}/following`}
            frontend
            underlined
            active={routeName === 'Following'}
          >
            Following
          </A>
          <PlusCircle className="SidebarLeft-icon SidebarLeft-iconPlusCircle" onClick={switchUiListModal} />
          <A
            className={'SidebarLeft-link' + (sidebarLeftClosed ? ' SidebarLeft-link--hidden' : '')}
            href=""
            frontend
            underlined
            onClick={switchUiListModal}
          >
            Create list
          </A>
          <A href={`users/${sessionId}/lists?sort=-createdAt`} frontend styled={false}>
            <List
              className={
                'SidebarLeft-icon SidebarLeft-iconLists' +
                (routeName === 'UserLists' ? ' SidebarLeft-icon--active' : '')
              }
              onClick={onListTitleClick}
            />
          </A>
          <span>
            <span className={'SidebarLeft-link' + (sidebarLeftClosed ? ' SidebarLeft-link--hidden' : '')}>
              <A
                href={`users/${sessionId}/lists?sort=-createdAt`}
                frontend
                underlined
                active={routeName === 'UserLists'}
                onClick={onListTitleClick}
              >
                My Lists
              </A>
              <Space />
              <Triangle
                className={'SidebarLeft-listsTriangle' + (listsShown ? ' SidebarLeft-listsTriangle--show' : '')}
              />
            </span>
            <div onClick={onSidebarCloseClick}>
              <SidebarLeftLists lists={lists} loading={false} listsShown={listsShown} />
            </div>
          </span>
        </>
      )}
      {!isLoggedIn && (
        <>
          <span />
          <A
            className={'SidebarLeft-link' + (sidebarLeftClosed ? ' SidebarLeft-link--hidden' : '')}
            href=""
            frontend
            underlined
          >
            Dont
          </A>
          <span />
          <A
            className={'SidebarLeft-link' + (sidebarLeftClosed ? ' SidebarLeft-link--hidden' : '')}
            href=""
            frontend
            underlined
          >
            Know
          </A>
          <span />
          <A
            className={'SidebarLeft-link' + (sidebarLeftClosed ? ' SidebarLeft-link--hidden' : '')}
            href=""
            frontend
            underlined
          >
            What
          </A>
          <span />
          <A
            className={'SidebarLeft-link' + (sidebarLeftClosed ? ' SidebarLeft-link--hidden' : '')}
            href=""
            frontend
            underlined
          >
            Goes
          </A>
          <span />
          <A
            className={'SidebarLeft-link' + (sidebarLeftClosed ? ' SidebarLeft-link--hidden' : '')}
            href=""
            frontend
            underlined
          >
            Here
          </A>
        </>
      )}
      {!!isLoggedIn && (
        <>
          <A href={`users/${sessionId}`} frontend styled={false}>
            <UserFill
              className={
                'SidebarLeft-icon SidebarLeft-iconUser' + (routeName === 'User' ? ' SidebarLeft-icon--active' : '')
              }
            />
          </A>
          <A
            className={'SidebarLeft-link' + (sidebarLeftClosed ? ' SidebarLeft-link--hidden' : '')}
            href={`users/${sessionId}`}
            frontend
            underlined
            active={routeName === 'User'}
          >
            {glossary.myUser}
          </A>
        </>
      )}
    </div>
  </div>
);
