import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sessionErrorClear } from 'Modules/Session/actions/sessionErrorClear';
import { sessionLogIn } from 'Modules/Session/actions/sessionLogIn';
import { selectSessionErrorLast } from 'Modules/Session/selectors/selectSessionErrorLast';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { SessionDataStorage } from 'Root/src/shared/services/SessionDataStorage';
import { validateEmailAddress } from 'Tools/utils/string/validateEmailAddress';
import { LoginForm as LoginFormUi } from './LoginForm';

import './LoginForm.less';

const LoginForm: React.FC = () => {
  const sessionDataStorage = new SessionDataStorage();
  const dispatch = useDispatch();
  const sessionError = useSelector(selectSessionErrorLast);
  const isLoggedIn = useSelector(selectSessionLoggedIn);
  const [nameOrEmailValue, setNameValue] = useState<string>(undefined);
  const [nameOrEmailError, setNameOrEmailError] = useState<string>(undefined);
  const [passwordValue, setPasswordValue] = useState<string>(undefined);
  const [passwordError, setPasswordError] = useState<string>(undefined);
  const [submitError, setSubmitError] = useState<string>(undefined);
  const [submitting, setSubmitting] = useState<boolean>(undefined);
  const submitDisabled = !nameOrEmailValue || !!nameOrEmailError || !passwordValue || !!passwordError;

  const onChangeNameOrEmail = async (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setNameValue(value);
    setSubmitError(undefined);
    dispatch(sessionErrorClear());

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
    dispatch(sessionErrorClear());

    setPasswordError(undefined);
    setSubmitError(undefined);
  };

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setSubmitting(true);

    const data = {
      nameOrEmail: nameOrEmailValue,
      password: passwordValue,
    };

    try {
      const sessionData = await dispatch(sessionLogIn(data));
      await sessionDataStorage.set(sessionData);
    } catch (error) {
      alert(error?.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setSubmitError(undefined);

    return () => {
      setSubmitError(undefined);
      setPasswordError(undefined);
      setNameOrEmailError(undefined);
      setSubmitting(undefined);
    };
  }, []);

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
  }, [sessionError, nameOrEmailValue, passwordValue]);

  return (
    <LoginFormUi
      nameOrEmailValue={nameOrEmailValue}
      nameOrEmailError={nameOrEmailError}
      onChangeNameOrEmail={onChangeNameOrEmail}
      passwordValue={passwordValue}
      passwordError={passwordError}
      onChangePassword={onChangePassword}
      onSubmit={onSubmit}
      submitDisabled={submitDisabled}
      submitSuccess={isLoggedIn}
      submitError={submitError}
      submitting={submitting}
    />
  );
};

export default LoginForm;
