import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import A from 'Components/A';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { switchBookmarkCreateModal } from 'Modules/Ui/actions/switchBookmarkCreateModal';
import { switchListModal } from 'Modules/Ui/actions/switchListModal';
import { Border, Span } from 'Vendor/components';

import './SidebarLeft.less';

export const SidebarLeft: React.FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectSessionLoggedIn);
  const sessionId = useSelector(selectSessionUserId);
  const glossary = useSelector(selectCurrentGlossary);

  const switchUiBookmarkModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(switchBookmarkCreateModal(true));
  };

  const switchUiListModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(switchListModal({ mounted: true }));
  };

  return (
    <Border className="SidebarLeft" data-test-id="SidebarLeft">
      {isLoggedIn && (
        <ul>
          <li className="SidebarLeft-item">
            <span className="SidebarLeft-bullet">•</span>
            <Span size="medium" bold>
              <A href={`users/${sessionId}`} frontend>
                {glossary.myUser}
              </A>
            </Span>
          </li>
          <li className="SidebarLeft-item">
            <span className="SidebarLeft-bullet">•</span>
            <Span size="medium" bold>
              <A href={`users/${sessionId}/bookmarks`} frontend>
                {glossary.myBookmarks}
              </A>
            </Span>
          </li>
          <li className="SidebarLeft-item">
            <span className="SidebarLeft-bullet">•</span>
            <Span size="medium" bold>
              <A href={`users/${sessionId}/tags`} frontend>
                My Tags
              </A>
            </Span>
          </li>
          <li>
            <span className="SidebarLeft-bullet">•</span>
            <Span size="medium" bold>
              <A href="" frontend onClick={switchUiBookmarkModal}>
                Add bookmark
              </A>
            </Span>
          </li>
          <li>
            <span className="SidebarLeft-bullet">•</span>
            <Span size="medium" bold>
              <A href="" frontend onClick={switchUiListModal}>
                Create list
              </A>
            </Span>
          </li>
          <li className="SidebarLeft-item">
            <span className="SidebarLeft-bullet">•</span>
            <Span size="medium" bold>
              <A href={`users/${sessionId}/lists?sort=-createdAt`} frontend>
                My Lists
              </A>
            </Span>
          </li>
          <li className="SidebarLeft-item">
            <span className="SidebarLeft-bullet">•</span>
            <Span size="medium" bold>
              <A href={`users/${sessionId}/followers`} frontend>
                Followers
              </A>
            </Span>
          </li>
          <li className="SidebarLeft-item">
            <span className="SidebarLeft-bullet">•</span>
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
            <span className="SidebarLeft-bullet">•</span>
            <Span size="medium" bold>
              <A href="/bookmarks?" frontend>
                All bookmarks
              </A>
            </Span>
          </li>
          <li className="SidebarLeft-item">
            <span className="SidebarLeft-bullet">•</span>
            <Span size="medium" bold>
              <A href="/lists" frontend>
                All lists
              </A>
            </Span>
          </li>
          <li className="SidebarLeft-item">
            <span className="SidebarLeft-bullet">•</span>
            <Span size="medium" bold>
              <A href="/bookmarks?sort=-createdAt" frontend>
                Recent bookmarks
              </A>
            </Span>
          </li>
          <li className="SidebarLeft-item">
            <span className="SidebarLeft-bullet">•</span>
            <Span size="medium" bold>
              <A href="/tags" frontend>
                Tags
              </A>
            </Span>
          </li>
        </ul>
      )}
    </Border>
  );
};

export default SidebarLeft;
