import React from 'react';

import BaseForm, { BaseFormError, BaseFormField, BaseFormSubmit } from 'Components/BaseForm';
import { Button, FadeInOut, Input } from '@antoniodcorrea/components';

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
  <BaseForm className="LoginForm">
    <BaseFormField>
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
    </BaseFormField>
    <BaseFormField>
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
    </BaseFormField>
    <BaseFormSubmit>
      <Button
        text="Submit"
        type="submit"
        onClick={onSubmit}
        error={!!submitError}
        success={submitSuccess}
        disabled={submitDisabled}
        loading={submitting}
        grow
      />
    </BaseFormSubmit>
    <FadeInOut valueToUpdate={!!submitError} speed="fast">
      <BaseFormError className="LoginForm-error">{submitError}</BaseFormError>
    </FadeInOut>
  </BaseForm>
);
