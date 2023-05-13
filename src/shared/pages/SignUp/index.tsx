import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { sessionResetErrors } from 'Modules/Session/actions/sessionResetErrors';
import { sessionSignUp } from 'Modules/Session/actions/sessionSignUp';
import { selectSessionErrorLast } from 'Modules/Session/selectors/selectSessionErrorLast';
import { selectSessionLoading } from 'Modules/Session/selectors/selectSessionLoading';
import { selectSessionStatus } from 'Modules/Session/selectors/selectSessionStatus';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { uiScreenDesktopUnlock } from 'Modules/Ui/actions/uiScreenDesktopUnlock';
import { uiScreenMobileUnLock } from 'Modules/Ui/actions/uiScreenMobileUnLock';
import { UserStatus } from 'Modules/Users/users.types';
import { DELAY_MEDIUM_MS, EVENT_BLUR } from 'Root/src/shared/constants';
import {
  testStringHasWhiteSpaces,
  validateEmailAddress,
  validatePassword,
  validateUserName,
} from '@antoniodcorrea/utils';
import { SignUp as SignUpUi } from './SignUp';

import './SignUp.less';

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const glossary = useSelector(selectCurrentGlossary);
  const sessionError = useSelector(selectSessionErrorLast);
  const sessionStatus = useSelector(selectSessionStatus);
  const sessionStatusInactive = sessionStatus === UserStatus.Inactive;
  const sessionLoading = useSelector(selectSessionLoading);
  const [emailValue, setEmailValue] = useState<string>(undefined);
  const [emailError, setEmailError] = useState<string>(undefined);
  const [nameValue, setNameValue] = useState<string>(undefined);
  const [nameError, setNameError] = useState<string>(undefined);
  const [passwordValue, setPasswordValue] = useState<string>(undefined);
  const [passwordError, setPasswordError] = useState<string>(undefined);
  const [passwordRepeatedValue, setPasswordRepeatedValue] = useState<string>(undefined);
  const [passwordRepeatedError, setPasswordRepeatedError] = useState<string>(undefined);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>(undefined);
  const submitDisabled =
    !emailValue ||
    !!emailError ||
    !nameValue ||
    !!nameError ||
    !passwordValue ||
    !!passwordError ||
    !passwordRepeatedValue ||
    !!passwordRepeatedError;

  const onNameValidate = (value: string) => {
    const stringHasWhiteSpaces = testStringHasWhiteSpaces(value);
    if (stringHasWhiteSpaces) {
      setNameError('Name can not contain spaces');

      return;
    }

    const userNameValid = validateUserName(value);
    if (!userNameValid) {
      setNameError('Invalid user name');

      return;
    }
  };

  // To debounce the validation we need to memoize it as well
  const onNameValidateDebounced = useCallback(debounce(onNameValidate, DELAY_MEDIUM_MS), []);

  const onChangeName = async (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (e.type === EVENT_BLUR) return;

    setNameValue(value);
    setSubmitError(undefined);
    setNameError(undefined);

    if (!value) {
      setNameError('Name required');

      return;
    }

    onNameValidateDebounced(value);
  };

  const onEmailValidate = (value: string) => {
    setSubmitError(undefined);
    setSubmitSuccess(undefined);

    const isValidEmail = validateEmailAddress(value);

    if (!isValidEmail) {
      setEmailError('Email not valid');

      return;
    }

    setEmailError(undefined);
  };

  // To debounce the validation we need to memoize it as well
  const onEmailValidateDebounced = useCallback(debounce(onEmailValidate, DELAY_MEDIUM_MS), []);

  const onChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (e.type === EVENT_BLUR) return;

    setEmailValue(value);
    setSubmitError(undefined);
    setEmailError(undefined);

    if (!value) {
      setEmailError('Email required');

      return;
    }

    onEmailValidateDebounced(value);
  };

  const onPasswordValidate = (value: string) => {
    const isValidPassword = validatePassword(value);
    if (!isValidPassword) {
      setPasswordError('6-10 chars., digits, low and uppercase');

      return;
    }
  };

  // To debounce the validation we need to memoize it as well
  const onPasswordValidateDebounced = useCallback(debounce(onPasswordValidate, DELAY_MEDIUM_MS), []);

  const onChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (e.type === EVENT_BLUR) return;

    setPasswordValue(value);

    setSubmitError(undefined);
    setPasswordError(undefined);

    if (!value) {
      setPasswordError('Password required');

      return;
    }

    onPasswordValidateDebounced(value);
  };

  const onPasswordRepeatedValidate = (value: string, passwordValue: string) => {
    const isSamePassword = value === passwordValue;
    if (!isSamePassword) {
      setPasswordRepeatedError('Passwords are not equal');

      return;
    }
  };

  // To debounce the validation we need to memoize it as well
  const onPasswordRepeatedValidateDebounced = useCallback(debounce(onPasswordRepeatedValidate, DELAY_MEDIUM_MS), []);

  const onChangePasswordRepeated = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (e.type === EVENT_BLUR) return;

    setPasswordRepeatedValue(value);
    setSubmitError(undefined);
    setPasswordRepeatedError(undefined);

    if (!value) {
      setPasswordRepeatedError('Password required');

      return;
    }

    onPasswordRepeatedValidateDebounced(value, passwordValue);
  };

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const isSamePassword = passwordRepeatedValue === passwordValue;
    if (!isSamePassword) {
      setPasswordRepeatedError('Passwords are not equal');

      return;
    }

    const data = {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
      password_repeated: passwordRepeatedValue,
    };

    dispatch(sessionSignUp(data));
  };

  useEffect(() => {
    setSubmitError(undefined);
  }, []);

  useEffect(() => {
    if (!!sessionStatusInactive) setSubmitSuccess(true);
  }, [sessionStatusInactive]);

  useEffect(() => {
    if (sessionError?.field === 'name') {
      setNameError(sessionError?.message);
      setEmailError(sessionError?.message);

      return;
    }
    if (sessionError?.field === 'password') {
      setPasswordError(sessionError?.message);
      setPasswordRepeatedError(sessionError?.message);

      return;
    }
    if (sessionError?.message) setSubmitError(sessionError?.message);
  }, [sessionError]);

  useEffect(
    () => () => {
      dispatch(sessionResetErrors());
      dispatch(uiScreenMobileUnLock());
      dispatch(uiScreenDesktopUnlock());
      dispatch(uiResetModalsState());
    },
    []
  );

  return (
    <SignUpUi
      glossary={glossary}
      nameValue={nameValue}
      nameError={nameError}
      onChangeName={onChangeName}
      emailValue={emailValue}
      emailError={emailError}
      onChangeEmail={onChangeEmail}
      passwordValue={passwordValue}
      passwordError={passwordError}
      onChangePassword={onChangePassword}
      passwordRepeatedValue={passwordRepeatedValue}
      passwordRepeatedError={passwordRepeatedError}
      onChangePasswordRepeated={onChangePasswordRepeated}
      onSubmit={onSubmit}
      submitDisabled={submitDisabled}
      submitSuccess={submitSuccess}
      submitError={submitError}
      submitting={sessionLoading}
    />
  );
};

export default SignUp;
