import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentRouteQueryParams } from 'Modules/Routes/selectors/selectCurrentRouteQueryParams';
import { sessionResetErrors } from 'Modules/Session/actions/sessionResetErrors';
import { sessionResetPassword } from 'Modules/Session/actions/sessionResetPassword';
import { selectSessionErrorLast } from 'Modules/Session/selectors/selectSessionErrorLast';
import { selectSessionLoading } from 'Modules/Session/selectors/selectSessionLoading';
import { selectSessionPasswordRequested } from 'Modules/Session/selectors/selectSessionPasswordRequested';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { uiScreenDesktopUnlock } from 'Modules/Ui/actions/uiScreenDesktopUnlock';
import { uiScreenMobileUnLock } from 'Modules/Ui/actions/uiScreenMobileUnLock';
import { EVENT_BLUR } from 'Root/src/shared/constants';
import { validatePassword } from '@antoniodcorrea/utils';
import { ResetPassword as ResetPasswordUi } from './ResetPassword';

import './ResetPassword.less';

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();
  const { name, token } = useSelector(selectCurrentRouteQueryParams);

  const glossary = useSelector(selectCurrentGlossary);
  const sessionError = useSelector(selectSessionErrorLast);
  const sessionPasswordRequested = useSelector(selectSessionPasswordRequested);
  const sessionLoading = useSelector(selectSessionLoading);

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

    if (e.type === EVENT_BLUR) return;

    setPasswordValue(value);
    setSubmitError(undefined);

    const isValidPassword = validatePassword(value);

    if (!isValidPassword) {
      setPasswordError('6-10 chars., digits, low and uppercase');

      return;
    }

    setPasswordError(undefined);
  };

  const onChangePasswordRepeated = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (e.type === EVENT_BLUR) return;

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
    <ResetPasswordUi
      glossary={glossary}
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
      sessionLoading={sessionLoading}
    />
  );
};

export default ResetPassword;
