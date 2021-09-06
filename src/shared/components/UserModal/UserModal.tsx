import React from 'react';

import ArrowRight from 'Assets/svg/arrowRight.svg';
import Cross from 'Assets/svg/cross.svg';
import LogOut from 'Assets/svg/logOut.svg';
import Private from 'Assets/svg/private.svg';
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
      <li className={'UserModal-item' + (routeName === 'User' && isUserPage ? ' UserModal-item--active' : '')}>
        <A className="UserModal-link" href={`users/${session?.id}`} frontend underlined styled={false}>
          <UserFill className="UserModal-icon" />
          <span className="UserModal-label">My profile</span>
          <ArrowRight className="UserModal-iconArrow" />
        </A>
      </li>
      <li className={'UserModal-item' + (routeName === 'ForgotPassword' ? ' UserModal-item--active' : '')}>
        <A className="UserModal-link" href="/forgot-password" frontend underlined styled={false}>
          <Private className="UserModal-icon" />
          <span className="UserModal-label">Change Password </span>
          <ArrowRight className="UserModal-iconArrow" />
        </A>
      </li>
      <li className="UserModal-item UserModal-logOut" onClick={sessionLogOut}>
        <LogOut className="UserModal-icon" />
        <span className="UserModal-label">Log out </span>
        <ArrowRight className="UserModal-iconArrow" />
      </li>
    </ul>
  </div>
);
