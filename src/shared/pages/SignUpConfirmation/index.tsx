import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentRouteQueryParams } from 'Modules/Routes/selectors/selectCurrentRouteQueryParams';
import { signUpConfirmation } from 'Modules/Session/actions/signUpConfirmation';
import { SpinnerCircle } from '@antoniodcorrea/components';

const SignUpConfirmation: React.FC = () => {
  const dispatch = useDispatch();
  const { name, token } = useSelector(selectCurrentRouteQueryParams);

  useEffect(() => {
    dispatch(signUpConfirmation({ name: String(name), token: String(token) }));
  }, [token]);

  return <SpinnerCircle />;
};

export default SignUpConfirmation;
