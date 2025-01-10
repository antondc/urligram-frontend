import React from 'react';
import Helmet from 'react-helmet';

import BaseForm, { BaseFormError, BaseFormField, BaseFormSubmit } from 'Components/BaseForm';
import { BaseModalFooter, BaseModalFooterLink, BaseModalFooterSection, BaseModalTitle } from 'Components/BaseModal';
import BasePanel from 'Components/BasePanel';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { Button, FadeInOut, Input, Space } from '@antoniodcorrea/components';

import './SignUp.less';

interface Props {
  glossary: GlossaryState;
  nameValue: string;
  nameError: string;
  onChangeName: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlurName: (e: React.FormEvent<HTMLInputElement>) => void;
  emailValue: string;
  emailError: string;
  onChangeEmail: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlurEmail: (e: React.FormEvent<HTMLInputElement>) => void;
  passwordValue: string;
  passwordError: string;
  onChangePassword: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlurPassword: (e: React.FormEvent<HTMLInputElement>) => void;
  passwordRepeatedValue: string;
  passwordRepeatedError: string;
  onChangePasswordRepeated: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlurPasswordRepeated: (e: React.FormEvent<HTMLInputElement>) => void;
  submitDisabled: boolean;
  submitSuccess: boolean;
  submitError: string;
  submitting: boolean;
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}

export const SignUp: React.FC<Props> = ({
  glossary,
  nameValue,
  nameError,
  onChangeName,
  onBlurName,
  emailValue,
  emailError,
  onChangeEmail,
  onBlurEmail,
  passwordValue,
  passwordError,
  onChangePassword,
  onBlurPassword,
  passwordRepeatedValue,
  passwordRepeatedError,
  onChangePasswordRepeated,
  onBlurPasswordRepeated,
  submitDisabled,
  submitSuccess,
  submitError,
  submitting,
  onSubmit,
}) => (
  <>
    <Helmet title={`${SITE_TITLE} · ${glossary.signUp}`} />
    <BasePanel>
      <BaseModalTitle>{glossary.signUp}</BaseModalTitle>
      <BaseForm className="SignUp-form">
        <BaseFormField>
          <Input
            name="name"
            type="text"
            label={glossary.name}
            onChange={onChangeName}
            onBlur={onBlurName}
            value={nameValue}
            error={nameError}
            grow
          />
        </BaseFormField>
        <BaseFormField>
          <Input
            name="email"
            type="email"
            label={glossary.email}
            onChange={onChangeEmail}
            onBlur={onBlurEmail}
            value={emailValue}
            error={emailError}
            grow
          />
        </BaseFormField>
        <BaseFormField>
          <Input
            name="password"
            type="password"
            label={glossary.password}
            onChange={onChangePassword}
            onBlur={onBlurPassword}
            value={passwordValue}
            error={passwordError}
            grow
          />
        </BaseFormField>
        <BaseFormField>
          <Input
            name="password_repeated"
            type="password"
            label={glossary.repeatPassword}
            onChange={onChangePasswordRepeated}
            onBlur={onBlurPasswordRepeated}
            value={passwordRepeatedValue}
            error={passwordRepeatedError}
            grow
          />
        </BaseFormField>
        <BaseFormSubmit>
          <Button
            text={glossary.accept}
            type="submit"
            onClick={onSubmit}
            error={!!submitError}
            success={submitSuccess}
            loading={submitting}
            disabled={submitDisabled}
            grow
          />
          <FadeInOut valueToUpdate={!!submitError} speed="fast">
            <BaseFormError>{submitError}</BaseFormError>
          </FadeInOut>
        </BaseFormSubmit>
      </BaseForm>
      <BaseModalFooter className="ResetPassword-footer">
        <BaseModalFooterSection>
          {glossary.forgotPassword}:
          <Space />
          <BaseModalFooterLink href="forgot-password">{glossary.resetPassword}</BaseModalFooterLink>
        </BaseModalFooterSection>
        <BaseModalFooterSection>
          {glossary.alreadyHaveAnAccount}:
          <Space />
          <BaseModalFooterLink href="login">{glossary.login}</BaseModalFooterLink>
        </BaseModalFooterSection>
      </BaseModalFooter>
    </BasePanel>
  </>
);
