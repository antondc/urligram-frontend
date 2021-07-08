import React from 'react';

import ArrowRight from 'Assets/svg/arrowRight.svg';
import Bookmark from 'Assets/svg/bookmarkRounded.svg';
import Cross from 'Assets/svg/cross.svg';
import FlagLeft from 'Assets/svg/flagLeft.svg';
import FlagRight from 'Assets/svg/flagRight.svg';
import List from 'Assets/svg/list.svg';
import LogOut from 'Assets/svg/logOut.svg';
import Tag from 'Assets/svg/tag.svg';
import User from 'Assets/svg/user.svg';
import UserFill from 'Assets/svg/userFill.svg';
import A from 'Components/A';
import { SessionState } from 'Modules/Session/session.types';

import './UserModal.less';

interface Props {
  userModalMounted: boolean;
  session: SessionState;
  sessionLogOut: () => void;
  switchMessageModal: () => void;
  onCloseClick: () => void;
}

export const UserModal: React.FC<Props> = ({
  userModalMounted,
  session,
  sessionLogOut,
  onCloseClick,
  switchMessageModal,
}) => (
  <div className={'UserModal' + (userModalMounted ? ' UserModal--mounted' : '')} onClick={onCloseClick}>
    <img className="UserModal-userLogo" src={session?.image?.original} />
    <Cross className="UserModal-cross" />
    {!session?.id && <User className="UserModal-userLogo" onClick={switchMessageModal} />}
    <ul className="UserModal-list">
      <A href={`users/${session?.id}`} frontend underlined>
        <li className="UserModal-item">
          <UserFill className="UserModal-iconMobile" />
          <span className="UserModal-label">My account </span>
          <ArrowRight className="UserModal-iconArrow" />
        </li>
      </A>
      <A href={`users/${session?.id}/followers`} frontend underlined>
        <li className="UserModal-item">
          <FlagRight className="UserModal-iconMobile" />
          <span className="UserModal-label">Followers </span>
          <ArrowRight className="UserModal-iconArrow" />
        </li>
      </A>
      <A href={`users/${session?.id}/following`} frontend underlined>
        <li className="UserModal-item">
          <FlagLeft className="UserModal-iconMobile" />
          <span className="UserModal-label">Following </span>
          <ArrowRight className="UserModal-iconArrow" />
        </li>
      </A>
      <A href={`users/${session?.id}/bookmarks`} frontend underlined>
        <li className="UserModal-item">
          <Bookmark className="UserModal-iconMobile" />
          <span className="UserModal-label">My bookmarks </span>
          <ArrowRight className="UserModal-iconArrow" />
        </li>
      </A>
      <A href={`users/${session?.id}/lists`} frontend underlined>
        <li className="UserModal-item">
          <List className="UserModal-iconMobile UserModal-iconLists" />
          <span className="UserModal-label">My lists </span>
          <ArrowRight className="UserModal-iconArrow" />
        </li>
      </A>
      <A href={`users/${session?.id}/tags`} frontend underlined>
        <li className="UserModal-item">
          <Tag className="UserModal-iconMobile" />
          <span className="UserModal-label">My tags </span>
          <ArrowRight className="UserModal-iconArrow" />
        </li>
      </A>
      <li className="UserModal-item" onClick={sessionLogOut}>
        <LogOut className="UserModal-iconMobile" />
        <span className="UserModal-label">Log out </span>
        <ArrowRight className="UserModal-iconArrow" />
      </li>
    </ul>
  </div>
);
