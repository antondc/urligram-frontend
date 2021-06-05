import React from 'react';

import A from 'Components/A';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { Frame, Span } from 'Vendor/components';

import './SidebarLeft.less';

interface Props {
  routeName: string;
  isLoggedIn: boolean;
  sessionId: string;
  glossary: GlossaryState;
  switchUiBookmarkModal: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  switchUiListModal: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const SidebarLeft: React.FC<Props> = ({
  routeName,
  isLoggedIn,
  sessionId,
  glossary,
  switchUiBookmarkModal,
  switchUiListModal,
}) => (
  <Frame className="SidebarLeft" data-test-id="SidebarLeft" borderTop={false} borderLeft={false} borderRight={false}>
    {isLoggedIn && (
      <ul>
        <li className="SidebarLeft-item">
          <Span size="medium" bold>
            <A
              className="SidebarLeft-link"
              href={`users/${sessionId}`}
              frontend
              underlined
              active={routeName === 'User'}
            >
              {glossary.myUser}
            </A>
          </Span>
        </li>
        <li className="SidebarLeft-item">
          <Span size="medium" bold>
            <A
              className="SidebarLeft-link"
              href={`users/${sessionId}/bookmarks`}
              frontend
              underlined
              active={routeName === 'UserBookmarks'}
            >
              {glossary.myBookmarks}
            </A>
          </Span>
        </li>
        <li className="SidebarLeft-item">
          <Span size="medium" bold>
            <A
              className="SidebarLeft-link"
              href={`users/${sessionId}/tags`}
              frontend
              underlined
              active={routeName === 'UserTags'}
            >
              My Tags
            </A>
          </Span>
        </li>
        <li className="SidebarLeft-item">
          <Span size="medium" bold>
            <A className="SidebarLeft-link" href="" frontend underlined onClick={switchUiBookmarkModal}>
              Add bookmark
            </A>
          </Span>
        </li>
        <li className="SidebarLeft-item">
          <Span size="medium" bold>
            <A className="SidebarLeft-link" href="" frontend underlined onClick={switchUiListModal}>
              Create list
            </A>
          </Span>
        </li>
        <li className="SidebarLeft-item">
          <Span size="medium" bold>
            <A
              className="SidebarLeft-link"
              href={`users/${sessionId}/lists?sort=-createdAt`}
              frontend
              underlined
              active={routeName === 'UserLists'}
            >
              My Lists
            </A>
          </Span>
        </li>
        <li className="SidebarLeft-item">
          <Span size="medium" bold>
            <A
              className="SidebarLeft-link"
              href={`users/${sessionId}/followers`}
              frontend
              underlined
              active={routeName === 'UserFollowers'}
            >
              Followers
            </A>
          </Span>
        </li>
        <li className="SidebarLeft-item">
          <Span size="medium" bold>
            <A
              className="SidebarLeft-link"
              href={`users/${sessionId}/following`}
              frontend
              underlined
              active={routeName === 'UserFollowing'}
            >
              Following
            </A>
          </Span>
        </li>
      </ul>
    )}
    {!isLoggedIn && (
      <ul>
        <li className="SidebarLeft-item">
          <Span size="medium" bold>
            <A className="SidebarLeft-link" href="/bookmarks" frontend underlined active={routeName === 'Bookmarks'}>
              All bookmarks
            </A>
          </Span>
        </li>
        <li className="SidebarLeft-item">
          <Span size="medium" bold>
            <A className="SidebarLeft-link" href="/lists" frontend underlined active={routeName === 'Lists'}>
              All lists
            </A>
          </Span>
        </li>
        <li className="SidebarLeft-item">
          <Span size="medium" bold>
            <A
              className="SidebarLeft-link"
              href="/bookmarks?sort=-createdAt"
              frontend
              underlined
              active={routeName === 'Bookmarks'}
            >
              Recent bookmarks
            </A>
          </Span>
        </li>
        <li className="SidebarLeft-item">
          <Span size="medium" bold>
            <A className="SidebarLeft-link" href="/tags" frontend underlined active={routeName === 'Tags'}>
              Tags
            </A>
          </Span>
        </li>
      </ul>
    )}
  </Frame>
);
