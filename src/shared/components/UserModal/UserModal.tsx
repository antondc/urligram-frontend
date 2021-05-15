import React from 'react';

import Cross from 'Assets/svg/cross.svg';
import User from 'Assets/svg/user.svg';
import A from 'Components/A';
import { SessionState } from 'Modules/Session/session.types';
import { Border, Hr, Span } from 'Vendor/components';

import './UserModal.less';

interface Props {
  sessionId: string;
  session: SessionState;
  sessionLogOut: () => void;
  switchMessageModal: () => void;
  switchUserModal: () => void;
}

export const UserModal: React.FC<Props> = ({
  sessionId,
  session,
  sessionLogOut,
  switchUserModal,
  switchMessageModal,
}) => (
  <Border className="UserModal" onClick={switchUserModal} onMouseLeave={switchUserModal}>
    {sessionId ? (
      <img className="UserModal-userLogo" src={session?.image?.original} />
    ) : (
      <Cross className="UserModal-cross" />
    )}
    {!sessionId && <User className="UserModal-userLogo" onClick={switchMessageModal} />}
    <ul>
      <li>
        <A href={`users/${sessionId}`} frontend>
          <Span bold>My account</Span>
        </A>
      </li>
      <Hr spacer size="small" />
      <li>
        <A href={`users/${sessionId}/followers`} frontend>
          <Span bold>Followers</Span>
        </A>
      </li>
      <Hr spacer size="small" />
      <li>
        <A href={`users/${sessionId}/following`} frontend>
          <Span bold>Following</Span>
        </A>
      </li>
      <Hr spacer size="small" />
      <li>
        <A href={`users/${sessionId}/bookmarks`} frontend>
          <Span bold>My bookmarks</Span>
        </A>
      </li>
      <Hr spacer size="small" />
      <li>
        <A href={`users/${sessionId}/lists`} frontend>
          <Span bold>My lists</Span>
        </A>
      </li>
      <Hr spacer size="small" />
      <li className="UserModal-sessionLogOut" onClick={sessionLogOut}>
        <Span bold>Log out</Span>
      </li>
    </ul>
  </Border>
);
