import React from 'react';

import Cross from 'Assets/svg/cross.svg';
import User from 'Assets/svg/user.svg';
import A from 'Components/A';
import { SessionState } from 'Modules/Session/session.types';

import './UserModal.less';

interface Props {
  userModalMounted: boolean;
  session: SessionState;
  sessionLogOut: () => void;
  switchMessageModal: () => void;
  switchUserModal: () => void;
}

export const UserModal: React.FC<Props> = ({
  userModalMounted,
  session,
  sessionLogOut,
  switchUserModal,
  switchMessageModal,
}) => (
  <div
    className={'UserModal' + (userModalMounted ? ' UserModal--mounted' : '')}
    onClick={switchUserModal}
    onMouseLeave={switchUserModal}
  >
    <img className="UserModal-userLogo" src={session?.image?.original} />
    <Cross className="UserModal-cross" />
    {!session?.id && <User className="UserModal-userLogo" onClick={switchMessageModal} />}
    <ul className="UserModal-list">
      <li className="UserModal-item">
        <A href={`users/${session?.id}`} frontend underlined>
          My account
        </A>
      </li>
      <li className="UserModal-item">
        <A href={`users/${session?.id}/followers`} frontend underlined>
          Followers
        </A>
      </li>
      <li className="UserModal-item">
        <A href={`users/${session?.id}/following`} frontend underlined>
          Following
        </A>
      </li>
      <li className="UserModal-item">
        <A href={`users/${session?.id}/bookmarks`} frontend underlined>
          My bookmarks
        </A>
      </li>
      <li className="UserModal-item">
        <A href={`users/${session?.id}/lists`} frontend underlined>
          My lists
        </A>
      </li>
      <li className="UserModal-item" onClick={sessionLogOut}>
        Log out
      </li>
    </ul>
  </div>
);
