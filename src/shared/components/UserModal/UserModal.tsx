import React from 'react';

import ArrowRight from 'Assets/svg/arrowRight.svg';
import Bookmark from 'Assets/svg/bookmark.svg';
import Cross from 'Assets/svg/cross.svg';
import FlagLeft from 'Assets/svg/flagLeft.svg';
import FlagRight from 'Assets/svg/flagRight.svg';
import List from 'Assets/svg/list.svg';
import LogOut from 'Assets/svg/logOut.svg';
import Private from 'Assets/svg/private.svg';
import Tag from 'Assets/svg/tag.svg';
import User from 'Assets/svg/user.svg';
import UserFill from 'Assets/svg/userFill.svg';
import A from 'Components/A';
import { SessionState } from 'Modules/Session/session.types';

import './UserModal.less';

interface Props {
  routeName: string;
  userModalMounted: boolean;
  isUserPage: boolean;
  session: SessionState;
  sessionLogOut: () => void;
  switchMessageModal: () => void;
  onCloseClick: () => void;
}

export const UserModal: React.FC<Props> = ({
  userModalMounted,
  isUserPage,
  session,
  sessionLogOut,
  onCloseClick,
  switchMessageModal,
  routeName,
}) => (
  <div className={'UserModal' + (userModalMounted ? ' UserModal--mounted' : '')} onClick={onCloseClick}>
    {/* <img className="UserModal-userLogo" src={session?.image?.original} /> */}
    <div className="UserModal-cross">
      <Cross className="UserModal-crossIcon" />
    </div>
    {!session?.id && <User className="UserModal-userLogo" onClick={switchMessageModal} />}
    <ul className="UserModal-list">
      <li
        className={
          'UserModal-item' +
          (routeName === 'User' && isUserPage ? ' UserModal-item--active' : '') +
          ' UserModal--mobile'
        }
      >
        <A className="UserModal-link" href={`users/${session?.id}`} frontend underlined styled={false}>
          <UserFill className="UserModal-icon" />
          <div className="UserModal-label">My profile</div>
          <ArrowRight className="UserModal-iconArrow" />
        </A>
      </li>
      <li
        className={
          'UserModal-item' +
          (routeName === 'UserTags' && isUserPage ? ' UserModal-item--active' : '') +
          ' UserModal--mobile'
        }
      >
        <A className="UserModal-link" href={`users/${session?.id}/tags`} frontend underlined styled={false}>
          <Tag className="UserModal-icon" />
          <div className="UserModal-label">Tags</div>
          <ArrowRight className="UserModal-iconArrow" />
        </A>
      </li>
      <li
        className={
          'UserModal-item' +
          (routeName === 'UserBookmarks' && isUserPage ? ' UserModal-item--active' : '') +
          ' UserModal--mobile'
        }
      >
        <A className="UserModal-link" href={`users/${session?.id}/bookmarks`} frontend underlined styled={false}>
          <Bookmark className="UserModal-icon" />
          <div className="UserModal-label">Bookmarks</div>
          <ArrowRight className="UserModal-iconArrow" />
        </A>
      </li>
      <li
        className={
          'UserModal-item' +
          (routeName === 'UserLists' && isUserPage ? ' UserModal-item--active' : '') +
          ' UserModal--mobile'
        }
      >
        <A className="UserModal-link" href={`users/${session?.id}/lists`} frontend underlined styled={false}>
          <List className="UserModal-icon" />
          <div className="UserModal-label">Lists</div>
          <ArrowRight className="UserModal-iconArrow" />
        </A>
      </li>
      <li
        className={
          'UserModal-item' +
          (routeName === 'Followers' && isUserPage ? ' UserModal-item--active' : '') +
          ' UserModal--mobile'
        }
      >
        <A className="UserModal-link" href={`users/${session?.id}/followers`} frontend underlined styled={false}>
          <FlagLeft className="UserModal-icon" />
          <div className="UserModal-label">Followers</div>
          <ArrowRight className="UserModal-iconArrow" />
        </A>
      </li>
      <li
        className={
          'UserModal-item' +
          (routeName === 'Following' && isUserPage ? ' UserModal-item--active' : '') +
          ' UserModal--mobile'
        }
      >
        <A className="UserModal-link" href={`users/${session?.id}/following`} frontend underlined styled={false}>
          <FlagRight className="UserModal-icon" />
          <div className="UserModal-label">Following</div>
          <ArrowRight className="UserModal-iconArrow" />
        </A>
      </li>
      <li className={'UserModal-item' + (routeName === 'ForgotPassword' ? ' UserModal-item--active' : '')}>
        <A className="UserModal-link" href="/forgot-password" frontend underlined styled={false}>
          <Private className="UserModal-icon" />
          <div className="UserModal-label">Password</div>
          <ArrowRight className="UserModal-iconArrow" />
        </A>
      </li>
      <li className="UserModal-item UserModal-logOut" onClick={sessionLogOut}>
        <LogOut className="UserModal-icon" />
        <div className="UserModal-label">Log out </div>
        <ArrowRight className="UserModal-iconArrow" />
      </li>
    </ul>
  </div>
);
