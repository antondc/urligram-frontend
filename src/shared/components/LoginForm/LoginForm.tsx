import React from 'react';

import { Button2, FadeInOut, Input2 } from 'Vendor/components';

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
  submitting: boolean;
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
  submitting,
  onSubmit,
}) => (
  <form className="LoginForm">
    <div className="LoginForm-inputField">
      <Input2
        name="nameOrEmail"
        type="text"
        label="Name or Email"
        onChange={onChangeNameOrEmail}
        onBlur={onChangeNameOrEmail}
        value={nameOrEmailValue}
        error={nameOrEmailError}
        grow
      />
    </div>
    <div className="LoginForm-inputField">
      <Input2
        name="password"
        type="password"
        label="Password"
        onChange={onChangePassword}
        onBlur={onChangePassword}
        value={passwordValue}
        error={passwordError}
        grow
      />
    </div>
    <div className="LoginForm-submit">
      <Button2
        text="Submit"
        type="submit"
        onClick={onSubmit}
        error={!!submitError}
        success={submitSuccess}
        disabled={submitDisabled}
        loading={submitting}
        grow
      />
    </div>
    <FadeInOut valueToUpdate={!!submitError} speed="fast">
      <span className="LoginForm-error">{submitError}</span>
    </FadeInOut>
  </form>
);
