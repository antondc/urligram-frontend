import React from 'react';
import Helmet from 'react-helmet';

import BaseForm, { BaseFormError, BaseFormField, BaseFormSubmit } from 'Components/BaseForm';
import { BaseModalFooter, BaseModalFooterLink, BaseModalFooterSection, BaseModalTitle } from 'Components/BaseModal';
import BasePanel from 'Components/BasePanel';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { Button, FadeInOut, Input, Space } from '@antoniodcorrea/components';

import './ForgotPassword.less';

interface Props {
  glossary: GlossaryState;
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
  glossary,
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
    <Helmet title={`${SITE_TITLE} · ${glossary.forgotPassword}`} />
    <BasePanel>
      <BaseForm className="ForgotPassword-form">
        <BaseModalTitle>{glossary.passwordForgotten}</BaseModalTitle>
        <BaseFormField>
          <Input
            name="nameOrEmail"
            type="text"
            label={glossary.nameOrEmail}
            onChange={onChangeNameOrEmail}
            onBlur={onBlurNameOrEmail}
            value={nameOrEmailValue}
            error={nameOrEmailError}
            grow
          />
        </BaseFormField>
        <BaseFormSubmit>
          <Button
            className="ForgotPassword-submit"
            text={glossary.accept}
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
