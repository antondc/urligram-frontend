import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';

import { sessionSignUp } from 'Modules/Session/actions/sessionSignUp';
import { selectSessionErrorLast } from 'Modules/Session/selectors/selectSessionErrorLast';
import { selectSessionLoading } from 'Modules/Session/selectors/selectSessionLoading';
import { selectSessionStatus } from 'Modules/Session/selectors/selectSessionStatus';
import { SESSION_STATUS_INACTIVE } from 'Modules/Session/session.types';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { DELAY_SLOW_MS } from 'Root/src/shared/constants';
import { testStringHasWhiteSpaces } from 'Tools/utils/string/testStringHasWhiteSpaces';
import { validateEmailAddress } from 'Tools/utils/string/validateEmailAddress';
import { validatePassword } from 'Tools/utils/string/validatePassword';
import { SignUp as SignUpUi } from './SignUp';

import './SignUp.less';

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const sessionError = useSelector(selectSessionErrorLast);
  const sessionStatus = useSelector(selectSessionStatus);
  const sessionStatusInactive = sessionStatus === SESSION_STATUS_INACTIVE;
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

    const isNameLengthValid = value.length > 5;

    if (!isNameLengthValid) {
      setNameError('Name too short');

      return;
    }
  };

  // To debounce the validation we need to memoize it as well
  const onNameValidateDebounced = useCallback(debounce(onNameValidate, DELAY_SLOW_MS), []);

  const onChangeName = async (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
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

    const isEmail = value?.includes('@');
    const isValidEmail = validateEmailAddress(value);

    if (isEmail && !isValidEmail) {
      setEmailError('Email not valid');

      return;
    }

    const stringHasWhiteSpaces = testStringHasWhiteSpaces(value);
    if (stringHasWhiteSpaces) {
      setEmailError('Name can not contain spaces');

      return;
    }
    setEmailError(undefined);
  };

  // To debounce the validation we need to memoize it as well
  const onEmailValidateDebounced = useCallback(debounce(onEmailValidate, DELAY_SLOW_MS), []);

  const onChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
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
  const onPasswordValidateDebounced = useCallback(debounce(onPasswordValidate, DELAY_SLOW_MS), []);

  const onChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setPasswordValue(value);
    setSubmitError(undefined);
    setPasswordError(undefined);

    if (!value) {
      setPasswordError('Password required');

      return;
    }

    onPasswordValidateDebounced(value);
  };

  const onPasswordRepeatedValidate = (value: string) => {
    const isSamePassword = value === passwordValue;
    if (!isSamePassword) {
      setPasswordRepeatedError('Passwords are not equal');

      return;
    }
  };

  // To debounce the validation we need to memoize it as well
  const onPasswordRepeatedValidateDebounced = useCallback(debounce(onPasswordRepeatedValidate, DELAY_SLOW_MS), []);

  const onChangePasswordRepeated = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setPasswordRepeatedValue(value);
    setSubmitError(undefined);
    setPasswordRepeatedError(undefined);

    if (!value) {
      setPasswordRepeatedError('Password required');

      return;
    }

    onPasswordRepeatedValidateDebounced(value);
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

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  return (
    <SignUpUi
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
