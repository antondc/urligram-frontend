import React from 'react';
import Helmet from 'react-helmet';

import { SITE_TITLE } from 'Root/src/shared/constants';
import { Flex, Hr, Span } from 'Vendor/components';

import './SignUpConfirmation.less';

export const SignUpConfirmation: React.FC = () => (
  <>
    <Helmet title={`${SITE_TITLE} · Confirm Sign Up`} />
    <div className="SignUpConfirmation">
      <Hr spacer size="big" />
      <Hr spacer size="big" />
      <Hr spacer size="big" />
      <Flex horizontal="center">
        <Span weight="semiBold" size="normal">
          Please check your email
        </Span>
        <Hr spacer size="zero" />
        ✉️
      </Flex>
    </div>
  </>
);
