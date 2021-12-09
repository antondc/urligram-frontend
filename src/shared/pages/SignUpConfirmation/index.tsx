import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentRouteQueryParams } from 'Modules/Routes/selectors/selectCurrentRouteQueryParams';
import { switchWelcomeModal } from 'Modules/Ui/actions/switchWelcomeModal';
import { switchWelcomeModalError } from 'Modules/Ui/actions/switchWelcomeModalError';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';

const SignUpConfirmation: React.FC = () => {
  const dispatch = useDispatch();
  const queryParams = useSelector(selectCurrentRouteQueryParams);

  useEffect(() => {
    if (!!queryParams?.success) {
      dispatch(switchWelcomeModal(true));

      return;
    }

    dispatch(switchWelcomeModalError(true));
  }, []);

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  return <></>;
};

export default SignUpConfirmation;
