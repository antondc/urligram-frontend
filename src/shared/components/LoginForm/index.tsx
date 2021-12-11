import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sessionLogIn } from 'Modules/Session/actions/sessionLogIn';
import { sessionResetErrors } from 'Modules/Session/actions/sessionResetErrors';
import { selectSessionErrorLast } from 'Modules/Session/selectors/selectSessionErrorLast';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { EVENT_BLUR } from 'Root/src/shared/constants';
import { validateEmailAddress } from 'Tools/utils/string/validateEmailAddress';
import { LoginForm as LoginFormUi } from './LoginForm';

import './LoginForm.less';

interface Props {
  setLocked?: (locked: boolean) => void;
}

const LoginForm: React.FC<Props> = ({ setLocked }) => {
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

    if (e.type === EVENT_BLUR) return;

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

    if (e.type === EVENT_BLUR) return;

    setPasswordValue(value);

    setPasswordError(undefined);
    setSubmitError(undefined);
  };

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setSubmitting(true);
    if (setLocked) setLocked(true);

    try {
      const data = {
        nameOrEmail: nameOrEmailValue,
        password: passwordValue,
      };

      await dispatch(sessionLogIn(data));
    } finally {
      setSubmitting(false);
      if (setLocked) setLocked(false);
    }
  };

  useEffect(() => {
    setSubmitError(undefined);

    return () => {
      setSubmitError(undefined);
      setPasswordError(undefined);
      setNameOrEmailError(undefined);
      setSubmitting(undefined);
      dispatch(sessionResetErrors());

      if (setLocked) setLocked(undefined);
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
  }, [sessionError]);

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
