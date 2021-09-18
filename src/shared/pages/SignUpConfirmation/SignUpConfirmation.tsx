import React from 'react';
import Helmet from 'react-helmet';

import { SITE_TITLE } from 'Root/src/shared/constants';

import './SignUpConfirmation.less';

export const SignUpConfirmation: React.FC = () => (
  <>
    <Helmet title={`${SITE_TITLE} · Confirm Sign Up`} />
    <div className="SignUpConfirmation">Please check your email ✉️</div>
  </>
);
