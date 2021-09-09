import React from 'react';
import Helmet from 'react-helmet';

import { BaseModalFooter, BaseModalFooterLink, BaseModalTitle } from 'Components/BaseModal';
import BasePanel from 'Components/BasePanel';
import LoginForm from 'Components/LoginForm';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { Space } from 'Vendor/components';

import './Login.less';

export const Login: React.FC = () => (
  <>
    <Helmet title={`${SITE_TITLE} · Login`} />
    <BasePanel>
      <BaseModalTitle>Login</BaseModalTitle>
      <LoginForm />
      <BaseModalFooter className="ResetPassword-footer">
        <div>
          Forgot password?:
          <Space />
          <BaseModalFooterLink href="login">reset it</BaseModalFooterLink>
        </div>
        <div>
          Dont have an account?:
          <Space />
          <BaseModalFooterLink href="sign-up">sign up</BaseModalFooterLink>
        </div>
      </BaseModalFooter>
    </BasePanel>
  </>
);
