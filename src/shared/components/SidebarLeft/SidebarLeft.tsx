import React from 'react';

import A from 'Components/A';
import SidebarListLists from 'Components/SidebarListLists';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { ListState } from 'Modules/Lists/lists.types';
import { Hr } from 'Vendor/components';
import RecentBookmarksReceived from '../RecentBookmarksReceived';
import RecentBookmarksSent from '../RecentBookmarksSent';

import './SidebarLeft.less';

interface Props {
  routeName: string;
  isLoggedIn: boolean;
  sessionId: string;
  glossary: GlossaryState;
  lists: ListState[];
  listsLoading: boolean;
  listsShown: boolean;
  myRecentBookmarksSent: BookmarkState[];
  myRecentBookmarksReceived: BookmarkState[];
  sharedBookmarksLoading: boolean;
  onListTitleClick: () => void;
  switchUiBookmarkModal: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  switchUiListModal: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const SidebarLeft: React.FC<Props> = ({
  routeName,
  isLoggedIn,
  sessionId,
  glossary,
  lists,
  listsShown,
  onListTitleClick,
  switchUiBookmarkModal,
  switchUiListModal,
  myRecentBookmarksSent,
  myRecentBookmarksReceived,
  sharedBookmarksLoading,
}) => (
  <div className="SidebarLeft" data-test-id="SidebarLeft">
    {isLoggedIn && (
      <ul>
        <li className="SidebarLeft-item">
          <A className="SidebarLeft-link" href={`users/${sessionId}`} frontend underlined active={routeName === 'User'}>
            {glossary.myUser}
          </A>
        </li>

        <li className="SidebarLeft-item">
          <A
            className="SidebarLeft-link"
            href={`users/${sessionId}/tags`}
            frontend
            underlined
            active={routeName === 'UserTags'}
          >
            My Tags
          </A>
        </li>
        <li className="SidebarLeft-item">
          <A className="SidebarLeft-link" href="" frontend underlined onClick={switchUiBookmarkModal}>
            Add bookmark
          </A>
        </li>
        <li className="SidebarLeft-item">
          <A
            className="SidebarLeft-link"
            href={`users/${sessionId}/bookmarks`}
            frontend
            underlined
            active={routeName === 'UserBookmarks'}
          >
            {glossary.myBookmarks}
          </A>
        </li>
        <li className="SidebarLeft-item">
          <A
            className="SidebarLeft-link"
            href={`users/${sessionId}/followers`}
            frontend
            underlined
            active={routeName === 'UserFollowers'}
          >
            Followers
          </A>
        </li>
        <li className="SidebarLeft-item">
          <A
            className="SidebarLeft-link"
            href={`users/${sessionId}/following`}
            frontend
            underlined
            active={routeName === 'UserFollowing'}
          >
            Following
          </A>
        </li>
        <li className="SidebarLeft-item">
          <A className="SidebarLeft-link" href="" frontend underlined onClick={switchUiListModal}>
            Create list
          </A>
        </li>
      </ul>
    )}
    {!isLoggedIn && (
      <ul className="SidebarLeft-list">
        <li className="SidebarLeft-item">
          <A className="SidebarLeft-link" href="" frontend underlined>
            Dont
          </A>
        </li>
        <li className="SidebarLeft-item">
          <A className="SidebarLeft-link" href="" frontend underlined>
            Know
          </A>
        </li>
        <li className="SidebarLeft-item">
          <A className="SidebarLeft-link" href="" frontend underlined>
            What
          </A>
        </li>
        <li className="SidebarLeft-item">
          <A className="SidebarLeft-link" href="" frontend underlined>
            Goes
          </A>
        </li>
        <li className="SidebarLeft-item">
          <A className="SidebarLeft-link" href="" frontend underlined>
            Here
          </A>
        </li>
      </ul>
    )}
    {!!isLoggedIn && (
      <>
        <Hr spacer size="nano" />
        <Hr spacer size="nano" />
        <SidebarListLists
          className="SidebarLeft-sidebarListLists"
          lists={lists}
          loading={false}
          title="My Lists"
          href={`users/${sessionId}/lists?sort=-createdAt`}
          listsShown={listsShown}
          onListTitleClick={onListTitleClick}
        />
        <RecentBookmarksSent
          className="SidebarLeft-sidebarListBookmarksReceived"
          title="Recently sent"
          loading={sharedBookmarksLoading}
          bookmarks={myRecentBookmarksSent}
        />
        <RecentBookmarksReceived
          className="SidebarLeft-sidebarListBookmarksReceived"
          title="Received"
          loading={sharedBookmarksLoading}
          bookmarks={myRecentBookmarksReceived}
        />
      </>
    )}
  </div>
);
