import React from 'react';

import Cross from 'Assets/svg/cross.svg';
import User from 'Assets/svg/user.svg';
import A from 'Components/A';
import { SessionState } from 'Modules/Session/session.types';
import { Frame, Hr, Span } from 'Vendor/components';

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
  <Frame className="UserModal" onClick={switchUserModal} onMouseLeave={switchUserModal}>
    {sessionId ? (
      <img className="UserModal-userLogo" src={session?.image?.original} />
    ) : (
      <Cross className="UserModal-cross" />
    )}
    {!sessionId && <User className="UserModal-userLogo" onClick={switchMessageModal} />}
    <ul>
      <li>
        <Span weight="extraBold">
          <A className="UserModal-link" href={`users/${sessionId}`} frontend underlined>
            My account
          </A>
        </Span>
      </li>
      <Hr spacer size="small" />
      <li>
        <Span weight="extraBold">
          <A className="UserModal-link" href={`users/${sessionId}/followers`} frontend underlined>
            Followers
          </A>
        </Span>
      </li>
      <Hr spacer size="small" />
      <li>
        <Span weight="extraBold">
          <A className="UserModal-link" href={`users/${sessionId}/following`} frontend underlined>
            Following
          </A>
        </Span>
      </li>
      <Hr spacer size="small" />
      <li>
        <Span weight="extraBold">
          <A className="UserModal-link" href={`users/${sessionId}/bookmarks`} frontend underlined>
            My bookmarks
          </A>
        </Span>
      </li>
      <Hr spacer size="small" />
      <li>
        <Span weight="extraBold">
          <A className="UserModal-link" href={`users/${sessionId}/lists`} frontend underlined>
            My lists
          </A>
        </Span>
      </li>
      <Hr spacer size="small" />
      <li className="UserModal-sessionLogOut" onClick={sessionLogOut}>
        <Span className="UserModal-link" weight="extraBold">
          Log out
        </Span>
      </li>
    </ul>
  </Frame>
);
