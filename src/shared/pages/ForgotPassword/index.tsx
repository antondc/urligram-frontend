import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { sessionForgotPassword } from 'Modules/Session/actions/sessionForgotPassword';
import { sessionResetErrors } from 'Modules/Session/actions/sessionResetErrors';
import { selectSessionErrorLast } from 'Modules/Session/selectors/selectSessionErrorLast';
import { selectSessionLoading } from 'Modules/Session/selectors/selectSessionLoading';
import { selectSessionPasswordRequested } from 'Modules/Session/selectors/selectSessionPasswordRequested';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { uiScreenDesktopUnlock } from 'Modules/Ui/actions/uiScreenDesktopUnlock';
import { uiScreenMobileUnLock } from 'Modules/Ui/actions/uiScreenMobileUnLock';
import { DELAY_MEDIUM_MS, EVENT_BLUR } from 'Root/src/shared/constants';
import { validateEmailAddress, validateUserName } from '@antoniodcorrea/utils';
import { ForgotPassword as ForgotPasswordUi } from './ForgotPassword';

import './ForgotPassword.less';

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch();
  const glossary = useSelector(selectCurrentGlossary);
  const sessionError = useSelector(selectSessionErrorLast);
  const sessionPasswordRequested = useSelector(selectSessionPasswordRequested);
  const sessionLoading = useSelector(selectSessionLoading);
  const [nameOrEmailValue, setNameOrEmailValue] = useState<string>(undefined);
  const [nameOrEmailError, setNameOrEmailError] = useState<string>(undefined);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>(undefined);
  const submitDisabled = !nameOrEmailValue || !!nameOrEmailError;

  const onNameOrEmailValidate = (value: string) => {
    setSubmitError(undefined);
    setSubmitSuccess(undefined);

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

    const nameOrEmailLowercase = value.toLowerCase();

    setNameOrEmailValue(nameOrEmailLowercase);
    setSubmitError(undefined);
    setNameOrEmailError(undefined);
    onNameOrEmailValidateDebounced(nameOrEmailLowercase);
  };

  const onBlurNameOrEmail = async (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (!value) {
      setNameOrEmailError('Name or email required');

      return;
    }

    onNameOrEmailValidate(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data = {
      nameOrEmail: nameOrEmailValue,
    };

    await dispatch(sessionForgotPassword(data));
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
    <ForgotPasswordUi
      glossary={glossary}
      nameOrEmailValue={nameOrEmailValue}
      nameOrEmailError={nameOrEmailError}
      onChangeNameOrEmail={onChangeNameOrEmail}
      onBlurNameOrEmail={onBlurNameOrEmail}
      onSubmit={onSubmit}
      submitDisabled={submitDisabled}
      submitSuccess={submitSuccess}
      submitError={submitError}
      submitting={sessionLoading}
    />
  );
};

export default ForgotPassword;
