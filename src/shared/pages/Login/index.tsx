import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { Login as LoginUi } from './Login';

import './Login.less';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const glossary = useSelector(selectCurrentGlossary);

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  return <LoginUi glossary={glossary} />;
};

export default Login;
