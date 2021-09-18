import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentRouteQueryParams } from 'Modules/Routes/selectors/selectCurrentRouteQueryParams';
import { sessionSignUpConfirmation } from 'Modules/Session/actions/sessionSignUpConfirmation';

const SignUpConfirmation: React.FC = () => {
  const dispatch = useDispatch();
  const { name, token } = useSelector(selectCurrentRouteQueryParams);

  useEffect(() => {
    dispatch(sessionSignUpConfirmation({ name: String(name), token: String(token) }));
  }, [token]);

  return <></>;
};

export default SignUpConfirmation;
