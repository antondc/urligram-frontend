import React from 'react';

import A from 'Components/A';
import SidebarListLists from 'Components/SidebarListLists';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { ListState } from 'Modules/Lists/lists.types';
import { Frame, Hr, Span } from 'Vendor/components';

import './SidebarLeft.less';

interface Props {
  routeName: string;
  isLoggedIn: boolean;
  sessionId: string;
  glossary: GlossaryState;
  lists: ListState[];
  switchUiBookmarkModal: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  switchUiListModal: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const SidebarLeft: React.FC<Props> = ({
  routeName,
  isLoggedIn,
  sessionId,
  glossary,
  lists,
  switchUiBookmarkModal,
  switchUiListModal,
}) => (
  <Frame className="SidebarLeft" data-test-id="SidebarLeft" borderTop={false} borderLeft={false} borderRight={false}>
    {isLoggedIn && (
      <ul className="SidebarLeft-list">
        <li className="SidebarLeft-item">
          <Span size="medium" extraBold>
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
          <Span size="medium" extraBold>
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
          <Span size="medium" extraBold>
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
          <Span size="medium" extraBold>
            <A className="SidebarLeft-link" href="" frontend underlined onClick={switchUiBookmarkModal}>
              Add bookmark
            </A>
          </Span>
        </li>
        <li className="SidebarLeft-item">
          <Span size="medium" extraBold>
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
          <Span size="medium" extraBold>
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
        <li className="SidebarLeft-item">
          <Span size="medium" extraBold>
            <A className="SidebarLeft-link" href="" frontend underlined onClick={switchUiListModal}>
              Create list
            </A>
          </Span>
        </li>
        <li className="SidebarLeft-item">
          <Span size="medium" extraBold>
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
      </ul>
    )}
    {!isLoggedIn && (
      <ul className="SidebarLeft-list">
        <li className="SidebarLeft-item">
          <Span size="medium" extraBold>
            <A className="SidebarLeft-link" href="" frontend underlined>
              Dont
            </A>
          </Span>
        </li>
        <li className="SidebarLeft-item">
          <Span size="medium" extraBold>
            <A className="SidebarLeft-link" href="" frontend underlined>
              Know
            </A>
          </Span>
        </li>
        <li className="SidebarLeft-item">
          <Span size="medium" extraBold>
            <A className="SidebarLeft-link" href="" frontend underlined>
              What
            </A>
          </Span>
        </li>
        <li className="SidebarLeft-item">
          <Span size="medium" extraBold>
            <A className="SidebarLeft-link" href="" frontend underlined>
              Goes
            </A>
          </Span>
        </li>
        <li className="SidebarLeft-item">
          <Span size="medium" extraBold>
            <A className="SidebarLeft-link" href="" frontend underlined>
              Here
            </A>
          </Span>
        </li>
      </ul>
    )}
    <Hr spacer size="micro" />
    <SidebarListLists items={lists} title="SidebarLeft-lists" />
  </Frame>
);
