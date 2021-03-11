import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logIn } from 'Modules/Session/actions/logIn';
import { selectSessionError } from 'Modules/Session/selectors/selectSessionError';
import { selectSessionStatus } from 'Modules/Session/selectors/selectSessionStatus';
import { SESSION_STATUS_INACTIVE } from 'Modules/Session/session.types';
import { DELAY_SLOW_MS } from 'Root/src/shared/constants';
import { Routes } from 'Router/routes';
import history from 'Services/History';
import { validateEmailAddress } from 'Tools/utils/string/validateEmailAddress';
import { Login as LoginUi } from './Login';

import './Login.less';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const sessionError = useSelector(selectSessionError);
  const sessionStatus = useSelector(selectSessionStatus);
  const sessionStatusInactive = sessionStatus === SESSION_STATUS_INACTIVE;

  const [nameOrEmailValue, setNameValue] = useState<string>(undefined);
  const [nameOrEmailError, setNameOrEmailError] = useState<string>(undefined);
  const [passwordValue, setPasswordValue] = useState<string>(undefined);
  const [passwordError, setPasswordError] = useState<string>(undefined);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>(undefined);

  const submitDisabled = !nameOrEmailValue || !!nameOrEmailError || !passwordValue || !!passwordError;

  const onChangeNameOrEmail = async (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setNameValue(value);
    setSubmitError(undefined);

    const isNameOrEmailLengthValid = value.length > 5;

    if (!isNameOrEmailLengthValid) {
      setNameOrEmailError('Name or Email too short');

      return;
    }

    const isEmail = value.includes('@');
    const isValidEmail = validateEmailAddress(value);

    if (isEmail && !isValidEmail) {
      setNameOrEmailError('Email not valid');

      return;
    }

    setNameOrEmailError(undefined);
  };

  const onChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setPasswordValue(value);

    setPasswordError(undefined);
    setSubmitError(undefined);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      nameOrEmail: nameOrEmailValue,
      password: passwordValue,
    };

    dispatch(logIn(data));
  };

  useEffect(() => {
    setSubmitError(undefined);
  }, []);

  useEffect(() => {
    if (!!sessionStatusInactive) {
      setSubmitSuccess(true);
      setTimeout(() => history.push(Routes.ConfirmLogin.route), DELAY_SLOW_MS);
    }
  }, [sessionStatusInactive]);

  useEffect(() => {
    if (sessionError?.field === 'password') {
      setPasswordError(sessionError?.message);

      return;
    }

    if (sessionError?.field === 'nameOrEmail') {
      setNameOrEmailError(sessionError?.message);

      return;
    }

    if (sessionError?.message) setSubmitError(sessionError?.message);
  }, [sessionError]);

  return (
    <LoginUi
      nameOrEmailValue={nameOrEmailValue}
      nameOrEmailError={nameOrEmailError}
      onChangeNameOrEmail={onChangeNameOrEmail}
      passwordValue={passwordValue}
      passwordError={passwordError}
      onChangePassword={onChangePassword}
      onSubmit={onSubmit}
      submitDisabled={submitDisabled}
      submitSuccess={submitSuccess}
      submitError={submitError}
    />
  );
};

export default Login;
