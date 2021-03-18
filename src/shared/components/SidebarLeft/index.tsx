import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import A from 'Components/A';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { switchBookmarkModal } from 'Modules/Ui/actions/switchBookmarkModal';
import { Border, Span } from '@antoniodcorrea/components';

import './SidebarLeft.less';

export const SidebarLeft: React.FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectSessionLoggedIn);
  const sessionId = useSelector(selectSessionUserId);

  const switchUiBookmarkModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(switchBookmarkModal(true));
  };

  return (
    <Border className="SidebarLeft" data-test-id="SidebarLeft">
      {isLoggedIn && (
        <ul>
          <li className="SidebarLeft-item">
            <span className="SidebarLeft-bullet">•</span>
            <Span bold>
              <A href={`users/${sessionId}`} frontend>
                User
              </A>
            </Span>
          </li>
          <li className="SidebarLeft-item">
            <span className="SidebarLeft-bullet">•</span>
            <Span bold>
              <A href={`users/${sessionId}/bookmarks`} frontend>
                My bookmarks
              </A>
            </Span>
          </li>
          <li>
            <span className="SidebarLeft-bullet">•</span>
            <Span bold>
              <A href="" frontend onClick={switchUiBookmarkModal}>
                Add bookmark
              </A>
            </Span>
          </li>
          <li className="SidebarLeft-item">
            <span className="SidebarLeft-bullet">•</span>
            <Span bold>
              <A href={`users/${sessionId}/lists?sort=-createdat`} frontend>
                My Lists
              </A>
            </Span>
          </li>
          <li className="SidebarLeft-item">
            <span className="SidebarLeft-bullet">•</span>
            <Span bold>
              <A href={`users/${sessionId}/followers`} frontend>
                Followers
              </A>
            </Span>
          </li>
          <li className="SidebarLeft-item">
            <span className="SidebarLeft-bullet">•</span>
            <Span bold>
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
            <Span bold>
              <A href="/links" frontend>
                All links
              </A>
            </Span>
          </li>
          <li className="SidebarLeft-item">
            <span className="SidebarLeft-bullet">•</span>
            <Span bold>
              <A href="/lists" frontend>
                All lists
              </A>
            </Span>
          </li>
          <li className="SidebarLeft-item">
            <span className="SidebarLeft-bullet">•</span>
            <Span bold>
              <A href="/bookmarks?sort=-createdAt" frontend>
                Recent bookmarks
              </A>
            </Span>
          </li>
          <li className="SidebarLeft-item">
            <span className="SidebarLeft-bullet">•</span>
            <Span bold>
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
