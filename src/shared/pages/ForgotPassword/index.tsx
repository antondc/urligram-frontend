import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { forgotPassword } from 'Modules/Session/actions/forgotPassword';
import { selectSessionErrorLast } from 'Modules/Session/selectors/selectSessionErrorLast';
import { selectSessionPasswordRequested } from 'Modules/Session/selectors/selectSessionPasswordRequested';
import { testStringHasWhiteSpaces } from 'Tools/utils/string/testStringHasWhiteSpaces';
import { validateEmailAddress } from 'Tools/utils/string/validateEmailAddress';
import { ForgotPassword as ForgotPasswordUi } from './ForgotPassword';

import './ForgotPassword.less';

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch();
  const sessionError = useSelector(selectSessionErrorLast);
  const sessionPasswordRequested = useSelector(selectSessionPasswordRequested);
  const [nameOrEmailValue, setNameValue] = useState<string>(undefined);
  const [nameOrEmailError, setNameOrEmailError] = useState<string>(undefined);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>(undefined);

  const submitDisabled = !nameOrEmailValue || !!nameOrEmailError;

  const onChangeNameOrEmail = async (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setNameValue(value);
    setSubmitError(undefined);
    setSubmitSuccess(undefined);

    const stringHasWhiteSpaces = testStringHasWhiteSpaces(value);

    if (stringHasWhiteSpaces) {
      setNameOrEmailError('Name can not contain spaces');

      return;
    }

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      nameOrEmail: nameOrEmailValue,
    };

    dispatch(forgotPassword(data));
  };

  useEffect(() => {
    setNameOrEmailError(undefined);
    setSubmitError(undefined);
  }, []);

  useEffect(() => {
    if (!!sessionPasswordRequested) setSubmitSuccess(true);
  }, [sessionPasswordRequested]);

  useEffect(() => {
    if (sessionError?.field === 'nameOrEmail') {
      setNameOrEmailError(sessionError?.message);

      return;
    }

    if (sessionError?.message) setSubmitError(sessionError?.message);
  }, [sessionError]);

  return (
    <ForgotPasswordUi
      nameOrEmailValue={nameOrEmailValue}
      nameOrEmailError={nameOrEmailError}
      onChangeNameOrEmail={onChangeNameOrEmail}
      onSubmit={onSubmit}
      submitDisabled={submitDisabled}
      submitSuccess={submitSuccess}
      submitError={submitError}
    />
  );
};

export default ForgotPassword;
