import React from 'react';
import Helmet from 'react-helmet';

import { BaseModalFooter, BaseModalFooterLink, BaseModalFooterSection, BaseModalTitle } from 'Components/BaseModal';
import BasePanel from 'Components/BasePanel';
import LoginForm from 'Components/LoginForm';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { Space } from '@antoniodcorrea/components';

import './Login.less';

export const Login: React.FC = () => (
  <>
    <Helmet title={`${SITE_TITLE} · Login`} />
    <BasePanel>
      <BaseModalTitle>Login</BaseModalTitle>
      <LoginForm />
      <BaseModalFooter className="ResetPassword-footer">
        <BaseModalFooterSection>
          Forgot password?:
          <Space />
          <BaseModalFooterLink href="login">reset it</BaseModalFooterLink>
        </BaseModalFooterSection>
        <BaseModalFooterSection>
          Dont have an account?:
          <Space />
          <BaseModalFooterLink href="sign-up">sign up</BaseModalFooterLink>
        </BaseModalFooterSection>
      </BaseModalFooter>
    </BasePanel>
  </>
);
