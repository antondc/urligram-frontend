import React from 'react';

import A from 'Components/A';
import LoginForm from 'Components/LoginForm';
import { Flex, H1, Hr, Span } from 'Vendor/components';

import './Login.less';

export const Login: React.FC = ({}) => (
  <>
    <Hr spacer size="big" />
    <Hr spacer size="big" />
    <Hr spacer size="big" />
    <div className="Login">
      <div className="Login-content">
        <H1 className="Login-h1">Login</H1>
        <LoginForm />
        <Hr size="big" spacer />
        <Flex horizontal="center">
          <div className="Login-section">
            <Span bold>Forgot password?: </Span>
            <A href="forgot-password" styled underlined frontend>
              <Span bold>reset it</Span>
            </A>
          </div>
          <Hr size="micro" spacer />
          <div className="Login-section">
            <Span bold>Dont have an account?: </Span>
            <A href="sign-up" styled underlined frontend>
              <Span bold>sign up</Span>
            </A>
          </div>
        </Flex>
      </div>
    </div>
  </>
);
