import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import A from 'Components/A';
import { signUp } from 'Modules/Session/actions/signUp';
import { selectSessionError } from 'Modules/Session/selectors/selectSessionError';
import { selectSessionStatus } from 'Modules/Session/selectors/selectSessionStatus';
import { SESSION_STATUS_INACTIVE } from 'Modules/Session/session.types';
import { DELAY_SLOW_MS } from 'Root/src/shared/constants';
import { Routes } from 'Router/routes';
import history from 'Services/History';
import { validateEmailAddress } from 'Tools/utils/string/validateEmailAddress';
import { validatePassword } from 'Tools/utils/string/validatePassword';
import { Button, FadeInOut, Flex, H1, Hr, Input, Span } from '@antoniodcorrea/components';

import './SignUp.less';

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const sessionError = useSelector(selectSessionError);
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
  const [submitSucces, setSubmitSucces] = useState<boolean>(false);
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
      setPasswordError('Password not valid');

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

  const onSubmit = async (e) => {
    e.preventDefault();

    const isSamePassword = passwordRepeatedValue === passwordValue;
    if (!isSamePassword) {
      setPasswordRepeatedError('Passwords not identical');

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
    if (!!sessionStatusInactive) {
      setSubmitSucces(true);
      setTimeout(() => history.push(Routes.ConfirmSignUp.route), DELAY_SLOW_MS);
    }
  }, [sessionStatusInactive]);

  useEffect(() => {
    if (sessionError?.message) setSubmitError(sessionError?.message);
  }, [sessionError]);

  return (
    <>
      <Hr spacer size="big" />
      <Hr spacer size="big" />
      <Hr spacer size="big" />
      <div className="SignUp">
        <div className="SignUp-content">
          <H1 className="SignUp-h1">Sign up</H1>
          <form className="SignUp-form">
            <Hr size="normal" spacer />
            <Input
              name="name"
              type="text"
              label="Name"
              onChange={onChangeName}
              onBlur={onChangeName}
              value={nameValue}
              error={nameError}
            />
            <FadeInOut valueToUpdate={!!nameError} speed="fast">
              <Span className="SignUp-error" size="small">
                {nameError}
              </Span>
            </FadeInOut>
            <Hr size="nano" spacer />
            <Input
              name="email"
              type="email"
              label="Email"
              onChange={onChangeEmail}
              onBlur={onChangeEmail}
              value={emailValue}
              error={emailError}
            />
            <Hr size="nano" spacer />
            <FadeInOut valueToUpdate={!!emailError} speed="fast">
              <Span className="SignUp-error" size="small">
                {emailError}
              </Span>
            </FadeInOut>
            <Hr size="nano" spacer />
            <Input
              name="password"
              type="password"
              label="Password"
              onChange={onChangePassword}
              onBlur={onChangePassword}
              value={passwordValue}
              error={passwordError}
            />
            <Hr size="nano" spacer />
            <FadeInOut valueToUpdate={!!passwordError} speed="fast">
              <Span className="SignUp-error" size="small">
                {passwordError}
              </Span>
            </FadeInOut>
            <Hr size="nano" spacer />
            <Input
              name="password_repeated"
              type="password"
              label="Repeat password"
              onChange={onChangePasswordRepeated}
              onBlur={onChangePasswordRepeated}
              value={passwordRepeatedValue}
              error={passwordRepeatedError}
            />
            <Hr size="nano" spacer />
            <FadeInOut valueToUpdate={!!passwordRepeatedError} speed="fast">
              <Span className="SignUp-error" size="small">
                {passwordRepeatedError}
              </Span>
            </FadeInOut>
            <Hr size="normal" spacer />
            <Button
              text="Enter"
              type="submit"
              onClick={onSubmit}
              error={!!submitError}
              success={submitSucces}
              disabled={submitDisabled}
            />
            <Hr size="nano" spacer />
            <FadeInOut valueToUpdate={!!submitError} speed="fast">
              <Span className="SignUp-error" size="small">
                {submitError}
              </Span>
            </FadeInOut>
          </form>
          <Hr size="big" spacer />
          <Flex horizontal="center">
            <Span bold>Forgot password?</Span>
            <Hr size="micro" spacer />
            <div className="SignUp-section">
              <Span bold>Already have an account?: </Span>
              <A href="login" styled underlined frontend>
                <Span bold>login</Span>
              </A>
            </div>
          </Flex>
        </div>
      </div>
    </>
  );
};

export default SignUp;
