import React from 'react';

import A from 'Components/A';
import LoginForm from 'Components/LoginForm';
import { Flex, H1, Span } from 'Vendor/components';

import './Login.less';

export const Login: React.FC = ({}) => (
  <>
    <div className="Login">
      <div className="Login-content">
        <H1 className="Login-h1">Login</H1>
        <div className="Login-form">
          <LoginForm />
        </div>
        <div className="Login-footer">
          <div className="Login-section">
            <Span weight="semiBold">Forgot password?: </Span>
            <A className="Login-link" href="forgot-password" styled underlined frontend>
              <Span weight="semiBold">reset it</Span>
            </A>
          </div>
          <div className="Login-section">
            <Span weight="semiBold">Dont have an account?: </Span>
            <A className="Login-link" href="sign-up" styled underlined frontend>
              <Span weight="semiBold">sign up</Span>
            </A>
          </div>
        </div>
      </div>
    </div>
  </>
);
