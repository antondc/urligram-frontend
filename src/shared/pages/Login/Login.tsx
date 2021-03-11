import React from 'react';

import A from 'Components/A';
import { Button, FadeInOut, Flex, H1, Hr, Input, Span } from '@antoniodcorrea/components';

import './Login.less';

interface Props {
  nameOrEmailValue: string;
  nameOrEmailError: string;
  onChangeNameOrEmail: (e: React.FormEvent<HTMLInputElement>) => void;
  passwordValue: string;
  passwordError: string;
  onChangePassword: (e: React.FormEvent<HTMLInputElement>) => void;
  submitDisabled: boolean;
  submitSuccess: boolean;
  submitError: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Login: React.FC<Props> = ({
  nameOrEmailValue,
  nameOrEmailError,
  onChangeNameOrEmail,
  passwordValue,
  passwordError,
  onChangePassword,
  submitDisabled,
  submitSuccess,
  submitError,
  onSubmit,
}) => (
  <>
    <Hr spacer size="big" />
    <Hr spacer size="big" />
    <Hr spacer size="big" />
    <div className="Login">
      <div className="Login-content">
        <H1 className="Login-h1">Sign up</H1>
        <form className="Login-form">
          <Hr size="normal" spacer />
          <Input
            name="nameOrEmail"
            type="text"
            label="Name or Email"
            onChange={onChangeNameOrEmail}
            onBlur={onChangeNameOrEmail}
            value={nameOrEmailValue}
            error={nameOrEmailError}
          />
          <FadeInOut valueToUpdate={!!nameOrEmailError} speed="fast">
            <Span className="Login-error" size="small">
              {nameOrEmailError}
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
            <Span className="Login-error" size="small">
              {passwordError}
            </Span>
          </FadeInOut>
          <Hr size="normal" spacer />
          <Button
            text="Enter"
            type="submit"
            onClick={onSubmit}
            error={!!submitError}
            success={submitSuccess}
            disabled={submitDisabled}
          />
          <Hr size="nano" spacer />
          <FadeInOut valueToUpdate={!!submitError} speed="fast">
            <Span className="Login-error" size="small">
              {submitError}
            </Span>
          </FadeInOut>
        </form>
        <Hr size="big" spacer />
        <Flex horizontal="center">
          <Span bold>Forgot password?</Span>
          <Hr size="micro" spacer />
          <div className="Login-section">
            <Span bold>Dont have an account?: </Span>
            <A href="sign-up" styled underlined frontend>
              <Span bold>sign up</Span>
            </A>
          </div>
        </Flex>
      </div>
    </div>
  </>
);
