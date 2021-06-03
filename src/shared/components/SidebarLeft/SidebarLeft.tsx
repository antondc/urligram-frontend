import React from 'react';

import A from 'Components/A';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { Frame, Span } from 'Vendor/components';

import './SidebarLeft.less';

interface Props {
  isLoggedIn: boolean;
  sessionId: string;
  glossary: GlossaryState;
  switchUiBookmarkModal: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  switchUiListModal: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const SidebarLeft: React.FC<Props> = ({
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
            <A href={`users/${sessionId}`} frontend>
              {glossary.myUser}
            </A>
          </Span>
        </li>
        <li className="SidebarLeft-item">
          <Span size="medium" bold>
            <A href={`users/${sessionId}/bookmarks`} frontend>
              {glossary.myBookmarks}
            </A>
          </Span>
        </li>
        <li className="SidebarLeft-item">
          <Span size="medium" bold>
            <A href={`users/${sessionId}/tags`} frontend>
              My Tags
            </A>
          </Span>
        </li>
        <li>
          <Span size="medium" bold>
            <A href="" frontend onClick={switchUiBookmarkModal}>
              Add bookmark
            </A>
          </Span>
        </li>
        <li>
          <Span size="medium" bold>
            <A href="" frontend onClick={switchUiListModal}>
              Create list
            </A>
          </Span>
        </li>
        <li className="SidebarLeft-item">
          <Span size="medium" bold>
            <A href={`users/${sessionId}/lists?sort=-createdAt`} frontend>
              My Lists
            </A>
          </Span>
        </li>
        <li className="SidebarLeft-item">
          <Span size="medium" bold>
            <A href={`users/${sessionId}/followers`} frontend>
              Followers
            </A>
          </Span>
        </li>
        <li className="SidebarLeft-item">
          <Span size="medium" bold>
            <A href={`users/${sessionId}/following`} frontend>
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
            <A href="/bookmarks?" frontend>
              All bookmarks
            </A>
          </Span>
        </li>
        <li className="SidebarLeft-item">
          <Span size="medium" bold>
            <A href="/lists" frontend>
              All lists
            </A>
          </Span>
        </li>
        <li className="SidebarLeft-item">
          <Span size="medium" bold>
            <A href="/bookmarks?sort=-createdAt" frontend>
              Recent bookmarks
            </A>
          </Span>
        </li>
        <li className="SidebarLeft-item">
          <Span size="medium" bold>
            <A href="/tags" frontend>
              Tags
            </A>
          </Span>
        </li>
      </ul>
    )}
  </Frame>
);
