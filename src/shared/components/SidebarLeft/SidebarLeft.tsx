import React from 'react';

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
}) => (
  <div className="SidebarLeft" data-test-id="SidebarLeft">
    {isLoggedIn && (
      <ul>
        <li className="SidebarLeft-item">
          <UserFill className="SidebarLeft-icon SidebarLeft-iconUser" />
          <A className="SidebarLeft-link" href={`users/${sessionId}`} frontend underlined active={routeName === 'User'}>
            {glossary.myUser}
          </A>
        </li>

        <li className="SidebarLeft-item">
          <Tag className="SidebarLeft-icon SidebarLeft-iconUserTags" />
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
          <PlusCircle className="SidebarLeft-icon SidebarLeft-iconPlusCircle" />
          <A className="SidebarLeft-link" href="" frontend underlined onClick={switchUiBookmarkModal}>
            Add bookmark
          </A>
        </li>
        <li className="SidebarLeft-item">
          <BookmarkFilled className="SidebarLeft-icon SidebarLeft-iconBookmarkFilled" />
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
          <FlagRight className="SidebarLeft-icon SidebarLeft-iconFlagRight" />

          <A
            className="SidebarLeft-link"
            href={`users/${sessionId}/followers`}
            frontend
            underlined
            active={routeName === 'Followers'}
          >
            Followers
          </A>
        </li>
        <li className="SidebarLeft-item">
          <FlagLeft className="SidebarLeft-icon SidebarLeft-iconFlagLeft" />
          <A
            className="SidebarLeft-link"
            href={`users/${sessionId}/following`}
            frontend
            underlined
            active={routeName === 'Following'}
          >
            Following
          </A>
        </li>
        <li className="SidebarLeft-item">
          <PlusCircle className="SidebarLeft-icon SidebarLeft-iconPlusCircle" />
          <A className="SidebarLeft-link" href="" frontend underlined onClick={switchUiListModal}>
            Create list
          </A>
        </li>
        <li className="SidebarLeft-item">
          <List className="SidebarLeft-icon SidebarLeft-iconLists" />
          <A
            className="SidebarLeft-link"
            href={`users/${sessionId}/lists?sort=-createdAt`}
            frontend
            underlined
            onClick={onListTitleClick}
          >
            My Lists
          </A>
          <Space />
          <Triangle className={'SidebarLeft-listsTriangle' + (listsShown ? ' SidebarLeft-listsTriangle--show' : '')} />
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
    {!!isLoggedIn && <SidebarLeftLists lists={lists} loading={false} listsShown={listsShown} />}
  </div>
);
