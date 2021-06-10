import React from 'react';

import { Flex, Hr, Span } from 'Vendor/components';

import './SignUpConfirmation.less';

export const SignUpConfirmation: React.FC = () => (
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
);
