import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sessionLogIn } from 'Modules/Session/actions/sessionLogIn';
import { sessionResetErrors } from 'Modules/Session/actions/sessionResetErrors';
import { selectSessionErrorLast } from 'Modules/Session/selectors/selectSessionErrorLast';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { uiScreenDesktopUnlock } from 'Modules/Ui/actions/uiScreenDesktopUnlock';
import { uiScreenMobileUnLock } from 'Modules/Ui/actions/uiScreenMobileUnLock';
import { COOKIE_POLICY_COOKIE, COOKIE_POLICY_TEXT, EVENT_BLUR } from 'Root/src/shared/constants';
import { CookiesWrapper } from 'Services/CookiesWrapper';
import { validateEmailAddress } from '@antoniodcorrea/utils';
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

  const didUserAcceptCookie = (): boolean => {
    const cookiesWrapper = new CookiesWrapper();
    const cookiePolicyCookie = cookiesWrapper.getCookie(COOKIE_POLICY_COOKIE);

    if (!cookiePolicyCookie || cookiePolicyCookie === '0') {
      const confirmed = confirm(COOKIE_POLICY_TEXT);

      if (confirmed) {
        cookiesWrapper.removeCookie(COOKIE_POLICY_COOKIE);
      }

      dispatch(switchLoginModal(false));

      return false;
    }

    return true;
  };

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const userAcceptedCookie = didUserAcceptCookie();
    if (!userAcceptedCookie) {
      return;
    }

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
      dispatch(uiScreenMobileUnLock());
      dispatch(uiScreenDesktopUnlock());
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
