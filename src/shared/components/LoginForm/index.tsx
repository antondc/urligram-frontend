import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { sessionLogIn } from 'Modules/Session/actions/sessionLogIn';
import { sessionResetErrors } from 'Modules/Session/actions/sessionResetErrors';
import { selectSessionErrorLast } from 'Modules/Session/selectors/selectSessionErrorLast';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { uiScreenDesktopUnlock } from 'Modules/Ui/actions/uiScreenDesktopUnlock';
import { uiScreenMobileUnLock } from 'Modules/Ui/actions/uiScreenMobileUnLock';
import { COOKIE_POLICY_COOKIE, COOKIE_POLICY_TEXT, DELAY_MEDIUM_MS, EVENT_BLUR } from 'Root/src/shared/constants';
import { CookiesWrapper } from 'Services/CookiesWrapper';
import { validateEmailAddress, validatePassword, validateUserName } from '@antoniodcorrea/utils';
import { LoginForm as LoginFormUi } from './LoginForm';

import './LoginForm.less';

interface Props {
  setLocked?: (locked: boolean) => void;
}

const LoginForm: React.FC<Props> = ({ setLocked }) => {
  const dispatch = useDispatch();
  const sessionError = useSelector(selectSessionErrorLast);
  const glossary = useSelector(selectCurrentGlossary);
  const isLoggedIn = useSelector(selectSessionLoggedIn);
  const [nameOrEmailValue, setNameOrEmailValue] = useState<string>(undefined);
  const [nameOrEmailError, setNameOrEmailError] = useState<string>(undefined);
  const [passwordValue, setPasswordValue] = useState<string>(undefined);
  const [passwordError, setPasswordError] = useState<string>(undefined);
  const [submitError, setSubmitError] = useState<string>(undefined);
  const [submitting, setSubmitting] = useState<boolean>(undefined);
  const submitDisabled = !nameOrEmailValue || !!nameOrEmailError || !passwordValue || !!passwordError;

  const onNameOrEmailValidate = (value: string) => {
    setSubmitError(undefined);

    const isEmail = value.includes('@');
    const isValidEmail = validateEmailAddress(value);
    const isValidName = validateUserName(value);

    if (isEmail && !isValidEmail) {
      setNameOrEmailError('Email not valid');

      return;
    }
    if (!isEmail && !isValidName) {
      setNameOrEmailError('Name not valid');

      return;
    }

    setNameOrEmailError(undefined);
  };

  // To debounce the validation we need to memoize it as well
  const onNameOrEmailValidateDebounced = useCallback(debounce(onNameOrEmailValidate, DELAY_MEDIUM_MS), []);

  const onChangeNameOrEmail = async (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (e.type === EVENT_BLUR && !value) {
      setNameOrEmailError('Name or email required');

      return;
    }

    const nameOrEmailLowercase = value.toLowerCase();

    setNameOrEmailValue(nameOrEmailLowercase);
    setSubmitError(undefined);
    setNameOrEmailError(undefined);
    onNameOrEmailValidateDebounced(nameOrEmailLowercase);
  };

  const onBlurNameOrEmail = async (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (e.type === EVENT_BLUR && !value) {
      setNameOrEmailError('Name or email required');

      return;
    }

    onNameOrEmailValidate(value);
  };

  const onPasswordValidate = (value: string) => {
    setSubmitError(undefined);

    const isValidPassword = validatePassword(value);

    if (!isValidPassword) {
      setPasswordError('6-10 chars., digits, low and uppercase');

      return;
    }

    setPasswordError(undefined);
  };

  // To debounce the validation we need to memoize it as well
  const onPasswordValidateDebounced = useCallback(debounce(onPasswordValidate, DELAY_MEDIUM_MS), []);

  const onChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setPasswordValue(value);
    setPasswordError(undefined);
    setSubmitError(undefined);
    onPasswordValidateDebounced(value);
  };

  const onBlurPassword = async (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (e.type === EVENT_BLUR && !value) {
      setPasswordError('Password required');

      return;
    }

    onPasswordValidate(value);
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
      glossary={glossary}
      nameOrEmailValue={nameOrEmailValue}
      nameOrEmailError={nameOrEmailError}
      onChangeNameOrEmail={onChangeNameOrEmail}
      onBlurNameOrEmail={onBlurNameOrEmail}
      passwordValue={passwordValue}
      passwordError={passwordError}
      onChangePassword={onChangePassword}
      onBlurPassword={onBlurPassword}
      onSubmit={onSubmit}
      submitDisabled={submitDisabled}
      submitSuccess={isLoggedIn}
      submitError={submitError}
      submitting={submitting}
    />
  );
};

export default LoginForm;
