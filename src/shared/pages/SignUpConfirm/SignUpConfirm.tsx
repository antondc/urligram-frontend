import React from 'react';

import { Flex, Hr, Span } from '@antoniodcorrea/components';

import './SignUpConfirm.less';

export const SignUpConfirm: React.FC = () => (
  <div className="SignUpConfirm">
    <Hr spacer size="big" />
    <Hr spacer size="big" />
    <Hr spacer size="big" />
    <Flex horizontal="center">
      <Span bold size="normal">
        Please check your email
      </Span>
      <Hr spacer size="zero" />
      ✉️
    </Flex>
  </div>
);
