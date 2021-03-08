import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logOut } from 'Modules/Session/actions/logOut';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { switchMessageModal } from 'Modules/Ui/actions/switchMessageModal';
import { switchUserModal } from 'Modules/Ui/actions/switchUserModal';
import { UserModal as UserModalUi } from './UserModal';

import './UserModal.less';

const UserModal: React.FC = () => {
  const dispatch = useDispatch();
  const sessionId = useSelector(selectSessionUserId);

  const logOutDispatched = () => {
    dispatch(logOut());
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
      logOut={logOutDispatched}
      switchUserModal={switchUserModalDispatched}
      switchMessageModal={switchMessageModalDispatched}
    />
  );
};

export default UserModal;
