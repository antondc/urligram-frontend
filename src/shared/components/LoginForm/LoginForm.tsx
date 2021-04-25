import React from 'react';

import A from 'Components/A';
import { Button, FadeInOut, Hr, Input, Span } from 'Vendor/components';

import './LoginForm.less';

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
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}

export const LoginForm: React.FC<Props> = ({
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
  <form className="LoginForm">
    <Hr size="normal" spacer />
    <Input
      name="nameOrEmail"
      type="text"
      label="Name or Email"
      onChange={onChangeNameOrEmail}
      onBlur={onChangeNameOrEmail}
      value={nameOrEmailValue}
      error={nameOrEmailError}
      grow
    />
    <FadeInOut valueToUpdate={!!nameOrEmailError} speed="fast">
      <Span className="LoginForm-error" size="small">
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
      grow
    />
    <Hr size="nano" spacer />
    <FadeInOut valueToUpdate={!!passwordError} speed="fast">
      <Span className="LoginForm-error" size="small">
        {passwordError}
      </Span>
    </FadeInOut>
    <Hr size="big" spacer />
    <Button
      text="Enter"
      type="submit"
      onClick={onSubmit}
      error={!!submitError}
      success={submitSuccess}
      disabled={submitDisabled}
      grow
    />
    <Hr size="nano" spacer />
    <FadeInOut valueToUpdate={!!submitError} speed="fast">
      <Span className="LoginForm-error" size="small">
        {submitError}
      </Span>
    </FadeInOut>
  </form>
);
