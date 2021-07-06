import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sessionLogOut } from 'Modules/Session/actions/sessionLogOut';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { switchMessageModal } from 'Modules/Ui/actions/switchMessageModal';
import { userModalMount } from 'Modules/Ui/actions/userModalMount';
import { userModalUnmount } from 'Modules/Ui/actions/userModalUnmount';
import { UserModal as UserModalUi } from './UserModal';

import './UserModal.less';

interface Props {
  userModalMounted: boolean;
}

const UserModal: React.FC<Props> = ({ userModalMounted }) => {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);

  const logOutDispatched = () => {
    dispatch(sessionLogOut());
  };

  const switchUserModalDispatched = () => {
    if (!userModalMounted) {
      dispatch(userModalMount());

      return;
    }
    dispatch(userModalUnmount());
  };

  const switchMessageModalDispatched = () => {
    dispatch(switchMessageModal());
  };

  if (!session?.id) return null;

  return (
    <UserModalUi
      userModalMounted={userModalMounted}
      session={session}
      sessionLogOut={logOutDispatched}
      switchUserModal={switchUserModalDispatched}
      switchMessageModal={switchMessageModalDispatched}
    />
  );
};

export default UserModal;
