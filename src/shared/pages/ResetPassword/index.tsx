import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentRouteQueryParams } from 'Modules/Routes/selectors/selectCurrentRouteQueryParams';
import { sessionResetPassword } from 'Modules/Session/actions/sessionResetPassword';
import { selectSessionErrorLast } from 'Modules/Session/selectors/selectSessionErrorLast';
import { selectSessionPasswordRequested } from 'Modules/Session/selectors/selectSessionPasswordRequested';
import { validatePassword } from 'Tools/utils/string/validatePassword';
import { ResetPassword as ResetPasswordUi } from './ResetPassword';

import './ResetPassword.less';

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();
  const { name, token } = useSelector(selectCurrentRouteQueryParams);

  const sessionError = useSelector(selectSessionErrorLast);
  const sessionPasswordRequested = useSelector(selectSessionPasswordRequested);
  //
  const [passwordValue, setPasswordValue] = useState<string>(undefined);
  const [passwordError, setPasswordError] = useState<string>(undefined);
  const [passwordRepeatedValue, setPasswordRepeatedValue] = useState<string>(undefined);
  const [passwordRepeatedError, setPasswordRepeatedError] = useState<string>(undefined);
  //
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>(undefined);

  const submitDisabled = !passwordValue || !!passwordError || !passwordRepeatedValue || !!passwordRepeatedError;

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

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const isSamePassword = passwordRepeatedValue === passwordValue;
    if (!isSamePassword) {
      setPasswordRepeatedError('Passwords are not equal');

      return;
    }

    const data = {
      name: String(name),
      token: String(token),
      password: passwordValue,
      passwordRepeated: passwordRepeatedValue,
    };

    dispatch(sessionResetPassword(data));
  };

  useEffect(() => {
    setPasswordError(undefined);
    setPasswordRepeatedError(undefined);
    setSubmitError(undefined);
  }, []);

  useEffect(() => {
    if (!!sessionPasswordRequested) setSubmitSuccess(true);
  }, [sessionPasswordRequested]);

  useEffect(() => {
    if (sessionError?.field === 'password') {
      setPasswordError(sessionError?.message);

      return;
    }

    if (sessionError?.message) setSubmitError(sessionError?.message);
  }, [sessionError]);

  return (
    <ResetPasswordUi
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

export default ResetPassword;
