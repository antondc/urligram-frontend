import React from 'react';
import { useSelector } from 'react-redux';

import A from 'Components/A';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { Border, Span } from '@antoniodcorrea/components';

import './SidebarLeft.less';

export const SidebarLeft: React.FC = () => {
  const isLoggedIn = useSelector(selectSessionLoggedIn);

  return (
    <Border className="SidebarLeft" data-test-id="SidebarLeft">
      {isLoggedIn && (
        <ul>
          <li>
            <span className="SidebarLeft-bullet">•</span>
            <Span bold>
              <A href="" frontend styled>
                Logged In
              </A>
            </Span>
          </li>
          <li>
            <span className="SidebarLeft-bullet">•</span>
            <Span bold>
              <A href="" frontend>
                User
              </A>
            </Span>
          </li>
          <li>
            <span className="SidebarLeft-bullet">•</span>
            <Span bold>
              <A href="" frontend>
                Followers
              </A>
            </Span>
          </li>
          <li>
            <span className="SidebarLeft-bullet">•</span>
            <Span bold>
              <A href="" frontend>
                Following
              </A>
            </Span>
          </li>
          <li>
            <span className="SidebarLeft-bullet">•</span>
            <Span bold>
              <A href="" frontend>
                My Lists
              </A>
            </Span>
          </li>
          <li>
            <span className="SidebarLeft-bullet">•</span>
            <Span bold>
              <A href="" frontend>
                User
              </A>
            </Span>
          </li>
          <li>
            <span className="SidebarLeft-bullet">•</span>
            <Span bold>
              <A href="" frontend>
                Followers
              </A>
            </Span>
          </li>
          <li>
            <span className="SidebarLeft-bullet">•</span>
            <Span bold>
              <A href="" frontend>
                Following
              </A>
            </Span>
          </li>
          <li>
            <span className="SidebarLeft-bullet">•</span>
            <Span bold>
              <A href="" frontend>
                My Lists
              </A>
            </Span>
          </li>
        </ul>
      )}
      {!isLoggedIn && (
        <ul>
          <li>
            <span className="SidebarLeft-bullet">•</span>
            <Span bold>
              <A href="" frontend>
                Not logged in
              </A>
            </Span>
          </li>
          <li>
            <span className="SidebarLeft-bullet">•</span>
            <Span bold>
              <A href="" frontend>
                All bookmarks
              </A>
            </Span>
          </li>
          <li>
            <span className="SidebarLeft-bullet">•</span>
            <Span bold>
              <A href="" frontend>
                Tags
              </A>
            </Span>
          </li>
          <li>
            <span className="SidebarLeft-bullet">•</span>
            <Span bold>
              <A href="" frontend>
                All lists
              </A>
            </Span>
          </li>
          <li>
            <span className="SidebarLeft-bullet">•</span>
            <Span bold>
              <A href="" frontend>
                Recent bookmarks
              </A>
            </Span>
          </li>
        </ul>
      )}
    </Border>
  );
};

export default SidebarLeft;
