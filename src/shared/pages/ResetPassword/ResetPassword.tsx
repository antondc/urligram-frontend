import React from 'react';
import Helmet from 'react-helmet';

import BaseForm, { BaseFormError, BaseFormField, BaseFormSubmit } from 'Components/BaseForm';
import { BaseModalFooter, BaseModalFooterLink, BaseModalTitle } from 'Components/BaseModal';
import BasePanel from 'Root/src/shared/components/BasePanel/BasePanel';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { Button2, FadeInOut, Input2, Space } from 'Vendor/components';

import './ResetPassword.less';

interface Props {
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
    <Helmet title={`${SITE_TITLE} · Reset Password`} />
    <BasePanel>
      <BaseModalTitle>Reset Password</BaseModalTitle>
      <BaseForm className="ResetPassword-form">
        <BaseFormField>
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
        </BaseFormField>
        <BaseFormField>
          <Input2
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
          <Button2
            text="Submit"
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
          <div>
            Remember it?:
            <Space />
            <BaseModalFooterLink href="login">log in</BaseModalFooterLink>
          </div>
          <div>
            Dont have an account?:
            <Space />
            <BaseModalFooterLink href="sign-up">sign up</BaseModalFooterLink>
          </div>
        </BaseModalFooter>
      </BaseForm>
    </BasePanel>
  </>
);
