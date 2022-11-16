import React from 'react';
import Helmet from 'react-helmet';

import BaseForm, { BaseFormError, BaseFormField, BaseFormSubmit } from 'Components/BaseForm';
import { BaseModalFooter, BaseModalFooterLink, BaseModalFooterSection, BaseModalTitle } from 'Components/BaseModal';
import BasePanel from 'Components/BasePanel';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { Button, FadeInOut, Input, Space } from '@antoniodcorrea/components';

import './SignUp.less';

interface Props {
  nameValue: string;
  nameError: string;
  onChangeName: (e: React.FormEvent<HTMLInputElement>) => void;
  emailValue: string;
  emailError: string;
  onChangeEmail: (e: React.FormEvent<HTMLInputElement>) => void;
  passwordValue: string;
  passwordError: string;
  onChangePassword: (e: React.FormEvent<HTMLInputElement>) => void;
  passwordRepeatedValue: string;
  passwordRepeatedError: string;
  onChangePasswordRepeated: (e: React.FormEvent<HTMLInputElement>) => void;
  submitDisabled: boolean;
  submitSuccess: boolean;
  submitError: string;
  submitting: boolean;
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}

export const SignUp: React.FC<Props> = ({
  nameValue,
  nameError,
  onChangeName,
  emailValue,
  emailError,
  onChangeEmail,
  passwordValue,
  passwordError,
  onChangePassword,
  passwordRepeatedValue,
  passwordRepeatedError,
  onChangePasswordRepeated,
  submitDisabled,
  submitSuccess,
  submitError,
  submitting,
  onSubmit,
}) => (
  <>
    <Helmet title={`${SITE_TITLE} · Sign Up`} />
    <BasePanel>
      <BaseModalTitle>Sign up</BaseModalTitle>
      <BaseForm className="SignUp-form">
        <BaseFormField>
          <Input
            name="name"
            type="text"
            label="Name"
            onChange={onChangeName}
            onBlur={onChangeName}
            value={nameValue}
            error={nameError}
            grow
          />
        </BaseFormField>
        <BaseFormField>
          <Input
            name="email"
            type="email"
            label="Email"
            onChange={onChangeEmail}
            onBlur={onChangeEmail}
            value={emailValue}
            error={emailError}
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
        <BaseFormField>
          <Input
            name="password_repeated"
            type="password"
            label="Repeat password"
            onChange={onChangePasswordRepeated}
            onBlur={onChangePasswordRepeated}
            value={passwordRepeatedValue}
            error={passwordRepeatedError}
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
            loading={submitting}
            grow
          />
          <FadeInOut valueToUpdate={!!submitError} speed="fast">
            <BaseFormError>{submitError}</BaseFormError>
          </FadeInOut>
        </BaseFormSubmit>
      </BaseForm>
      <BaseModalFooter className="ResetPassword-footer">
        <BaseModalFooterSection>
          Forgot password?:
          <Space />
          <BaseModalFooterLink href="forgot-password">reset it</BaseModalFooterLink>
        </BaseModalFooterSection>
        <BaseModalFooterSection>
          Already have an account?:
          <Space />
          <BaseModalFooterLink href="login">log in</BaseModalFooterLink>
        </BaseModalFooterSection>
      </BaseModalFooter>
    </BasePanel>
  </>
);
