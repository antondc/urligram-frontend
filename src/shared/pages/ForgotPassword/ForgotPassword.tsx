import React from 'react';
import Helmet from 'react-helmet';

import BaseForm, { BaseFormError, BaseFormField, BaseFormSubmit } from 'Components/BaseForm';
import { BaseModalFooter, BaseModalFooterLink, BaseModalTitle } from 'Components/BaseModal';
import BasePanel from 'Components/BasePanel';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { Button2, FadeInOut, Input2, Space } from 'Vendor/components';

import './ForgotPassword.less';

interface Props {
  nameOrEmailValue: string;
  nameOrEmailError: string;
  onChangeNameOrEmail: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlurNameOrEmail: (e: React.FormEvent<HTMLInputElement>) => void;
  submitDisabled: boolean;
  submitSuccess: boolean;
  submitError: string;
  submitting: boolean;
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}

export const ForgotPassword: React.FC<Props> = ({
  nameOrEmailValue,
  nameOrEmailError,
  onChangeNameOrEmail,
  onBlurNameOrEmail,
  submitDisabled,
  submitSuccess,
  submitError,
  submitting,
  onSubmit,
}) => (
  <>
    <Helmet title={`${SITE_TITLE} · Forgot Password`} />
    <BasePanel>
      <BaseForm className="ForgotPassword-form">
        <BaseModalTitle>Password forgotten</BaseModalTitle>
        <BaseFormField>
          <Input2
            name="nameOrEmail"
            type="text"
            label="Name or email"
            onChange={onChangeNameOrEmail}
            onBlur={onBlurNameOrEmail}
            value={nameOrEmailValue}
            error={nameOrEmailError}
            grow
          />
        </BaseFormField>
        <BaseFormSubmit>
          <Button2
            className="ForgotPassword-submit"
            text="Submit"
            type="submit"
            onClick={onSubmit}
            error={!!submitError}
            success={submitSuccess}
            disabled={submitDisabled}
            loading={submitting}
            grow
          />
          <FadeInOut valueToUpdate={!!submitError} speed="fast">
            <BaseFormError className="ForgotPassword-error">{submitError}</BaseFormError>
          </FadeInOut>
        </BaseFormSubmit>
        <BaseModalFooter>
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
