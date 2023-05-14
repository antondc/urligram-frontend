import React from 'react';
import Helmet from 'react-helmet';

import { BaseModalFooter, BaseModalFooterLink, BaseModalFooterSection, BaseModalTitle } from 'Components/BaseModal';
import BasePanel from 'Components/BasePanel';
import LoginForm from 'Components/LoginForm';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { Space } from '@antoniodcorrea/components';

import './Login.less';

interface Props {
  glossary: GlossaryState;
}

export const Login: React.FC<Props> = ({ glossary }) => (
  <>
    <Helmet title={`${SITE_TITLE} · ${glossary.login}`} />
    <BasePanel>
      <BaseModalTitle>{glossary.login}</BaseModalTitle>
      <LoginForm />
      <BaseModalFooter className="ResetPassword-footer">
        <BaseModalFooterSection>
          {glossary.forgotPassword}:
          <Space />
          <BaseModalFooterLink href="forgot-password">{glossary.resetPassword}</BaseModalFooterLink>
        </BaseModalFooterSection>
        <BaseModalFooterSection>
          {glossary.dontHaveAccount}:
          <Space />
          <BaseModalFooterLink href="sign-up">{glossary.signUp}</BaseModalFooterLink>
        </BaseModalFooterSection>
      </BaseModalFooter>
    </BasePanel>
  </>
);
