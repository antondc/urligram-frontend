import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sessionLogOut } from 'Modules/Session/actions/sessionLogOut';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { switchMessageModal } from 'Modules/Ui/actions/switchMessageModal';
import { switchUserModal } from 'Modules/Ui/actions/switchUserModal';
import { UserModal as UserModalUi } from './UserModal';

import './UserModal.less';

const UserModal: React.FC = () => {
  const dispatch = useDispatch();
  const sessionId = useSelector(selectSessionUserId);
  const session = useSelector(selectSession);

  const logOutDispatched = () => {
    dispatch(sessionLogOut());
  };

  const switchUserModalDispatched = () => {
    dispatch(switchUserModal());
  };

  const switchMessageModalDispatched = () => {
    dispatch(switchMessageModal());
  };

  return (
    <UserModalUi
      sessionId={sessionId}
      session={session}
      sessionLogOut={logOutDispatched}
      switchUserModal={switchUserModalDispatched}
      switchMessageModal={switchMessageModalDispatched}
    />
  );
};

export default UserModal;
