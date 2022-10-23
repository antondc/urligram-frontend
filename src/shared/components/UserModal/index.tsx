import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentRoute } from 'Modules/Routes/selectors/selectCurrentRoute';
import { sessionLogOut } from 'Modules/Session/actions/sessionLogOut';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { switchMessageModal } from 'Modules/Ui/actions/switchMessageModal';
import { userModalMount } from 'Modules/Ui/actions/userModalMount';
import { userModalUnmount } from 'Modules/Ui/actions/userModalUnmount';
import { selectUiScreenTypeIsTablet } from 'Modules/Ui/selectors/selectUiScreenTypeIsTablet';
import { selectUiUserModalMounted } from 'Modules/Ui/selectors/selectUiUserModalMounted';
import { UserModal as UserModalUi } from './UserModal';

import './UserModal.less';

const UserModal: React.FC = () => {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);
  const userModalMounted = useSelector(selectUiUserModalMounted);
  const route = useSelector(selectCurrentRoute);
  const isUserPage = route?.params?.userId === session?.id;
  const uiScreenTypeIsTablet = useSelector(selectUiScreenTypeIsTablet);

  const logOutDispatched = () => {
    dispatch(sessionLogOut());
  };

  const switchUserModal = () => {
    if (!userModalMounted) {
      dispatch(userModalMount());

      return;
    }
    dispatch(userModalUnmount());
  };

  const switchUserModalOnMouseLeave = () => {
    if (!!uiScreenTypeIsTablet) return;

    dispatch(userModalUnmount());
  };

  const switchMessageModalDispatched = () => {
    dispatch(switchMessageModal());
  };

  if (!session?.id) return null;

  return (
    <UserModalUi
      isUserPage={isUserPage}
      routeName={route?.name}
      userModalMounted={userModalMounted}
      session={session}
      sessionLogOut={logOutDispatched}
      switchUserModal={switchUserModal}
      switchUserModalOnMouseLeave={switchUserModalOnMouseLeave}
      switchMessageModal={switchMessageModalDispatched}
    />
  );
};

export default UserModal;
