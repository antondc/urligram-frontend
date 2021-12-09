import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { Login as LoginUi } from './Login';

import './Login.less';

const Login: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  return <LoginUi />;
};

export default Login;
