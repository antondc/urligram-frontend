import React from 'react';

import ArrowRight from 'Assets/svg/arrowRight.svg';
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
          My account <ArrowRight className="UserModal-arrow" />
        </li>
      </A>
      <A href={`users/${session?.id}/followers`} frontend underlined>
        <li className="UserModal-item">
          Followers <ArrowRight className="UserModal-arrow" />
        </li>
      </A>
      <A href={`users/${session?.id}/following`} frontend underlined>
        <li className="UserModal-item">
          Following <ArrowRight className="UserModal-arrow" />
        </li>
      </A>
      <A href={`users/${session?.id}/bookmarks`} frontend underlined>
        <li className="UserModal-item">
          My bookmarks <ArrowRight className="UserModal-arrow" />
        </li>
      </A>
      <A href={`users/${session?.id}/lists`} frontend underlined>
        <li className="UserModal-item">
          My lists <ArrowRight className="UserModal-arrow" />
        </li>
      </A>
      <li className="UserModal-item" onClick={sessionLogOut}>
        Log out <ArrowRight className="UserModal-arrow" />
      </li>
    </ul>
  </div>
);
