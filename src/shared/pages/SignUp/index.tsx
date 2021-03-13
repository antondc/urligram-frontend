import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signUp } from 'Modules/Session/actions/signUp';
import { selectSessionErrorLast } from 'Modules/Session/selectors/selectSessionErrorLast';
import { selectSessionStatus } from 'Modules/Session/selectors/selectSessionStatus';
import { SESSION_STATUS_INACTIVE } from 'Modules/Session/session.types';
import { validateEmailAddress } from 'Tools/utils/string/validateEmailAddress';
import { validatePassword } from 'Tools/utils/string/validatePassword';
import { testStringHasWhiteSpaces } from '../../tools/utils/string/testStringHasWhiteSpaces';
import { SignUp as SignUpUi } from './SignUp';

import './SignUp.less';

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const sessionError = useSelector(selectSessionErrorLast);
  const sessionStatus = useSelector(selectSessionStatus);
  const sessionStatusInactive = sessionStatus === SESSION_STATUS_INACTIVE;

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

  const onChangeName = async (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setNameValue(value);
    setSubmitError(undefined);

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

    setNameError(undefined);
  };

  const onChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setEmailValue(value);
    setSubmitError(undefined);

    const isValidEmail = validateEmailAddress(value);

    if (!isValidEmail) {
      setEmailError('Email not valid');

      return;
    }

    setEmailError(undefined);
  };

  const onChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setPasswordValue(value);
    setSubmitError(undefined);

    const isValidPassword = validatePassword(value);

    if (!isValidPassword) {
      setPasswordError('6-10 chars., one digit and uppercase');

      return;
    }

    setPasswordError(undefined);
  };

  const onChangePasswordRepeated = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setPasswordRepeatedValue(value);
    setSubmitError(undefined);

    const isSamePassword = value === passwordValue;
    if (!isSamePassword) {
      setPasswordRepeatedError('Passwords are not equal');

      return;
    }

    setPasswordRepeatedError(undefined);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    dispatch(signUp(data));
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
    />
  );
};

export default SignUp;
