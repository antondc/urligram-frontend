import React from 'react';
import Helmet from 'react-helmet';

import BaseForm, { BaseFormError, BaseFormField, BaseFormSubmit } from 'Components/BaseForm';
import { BaseModalFooter, BaseModalFooterLink, BaseModalFooterSection, BaseModalTitle } from 'Components/BaseModal';
import { GlossaryState } from 'Modules/Languages/languages.types';
import BasePanel from 'Root/src/shared/components/BasePanel/BasePanel';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { Button, FadeInOut, Input, Space } from '@antoniodcorrea/components';

import './ResetPassword.less';

interface Props {
  glossary: GlossaryState;
  passwordValue: string;
  passwordError: string;
  onChangePassword: (e: React.FormEvent<HTMLInputElement>) => void;
  passwordRepeatedValue: string;
  passwordRepeatedError: string;
  onChangePasswordRepeated: (e: React.FormEvent<HTMLInputElement>) => void;
  submitDisabled: boolean;
  submitSuccess: boolean;
  submitError: string;
  sessionLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}

export const ResetPassword: React.FC<Props> = ({
  glossary,
  passwordValue,
  passwordError,
  onChangePassword,
  passwordRepeatedValue,
  passwordRepeatedError,
  onChangePasswordRepeated,
  submitDisabled,
  submitSuccess,
  submitError,
  sessionLoading,
  onSubmit,
}) => (
  <>
    <Helmet title={`${SITE_TITLE} · ${glossary.resetPassword}`} />
    <BasePanel>
      <BaseModalTitle>{glossary.resetPassword}</BaseModalTitle>
      <BaseForm className="ResetPassword-form">
        <BaseFormField>
          <Input
            name="password"
            type="password"
            label={glossary.password}
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
            label={glossary.repeatPassword}
            onChange={onChangePasswordRepeated}
            onBlur={onChangePasswordRepeated}
            value={passwordRepeatedValue}
            error={passwordRepeatedError}
            grow
          />
        </BaseFormField>
        <BaseFormSubmit>
          <Button
            text={glossary.save}
            type="submit"
            onClick={onSubmit}
            error={!!submitError}
            success={submitSuccess}
            disabled={submitDisabled}
            loading={sessionLoading}
            grow
          />
          <FadeInOut valueToUpdate={!!submitError} speed="fast">
            <BaseFormError>{submitError}</BaseFormError>
          </FadeInOut>
        </BaseFormSubmit>
        <BaseModalFooter className="ResetPassword-footer">
          <BaseModalFooterSection>
            {glossary.rememberIt}:
            <Space />
            <BaseModalFooterLink href="login">{glossary.login}</BaseModalFooterLink>
          </BaseModalFooterSection>
          <BaseModalFooterSection>
            {glossary.dontHaveAccount}:
            <Space />
            <BaseModalFooterLink href="sign-up">{glossary.signUp}</BaseModalFooterLink>
          </BaseModalFooterSection>
        </BaseModalFooter>
      </BaseForm>
    </BasePanel>
  </>
);
