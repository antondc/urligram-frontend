import React from 'react';
import Helmet from 'react-helmet';

import A from 'Components/A';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { Button2, FadeInOut, Input2 } from 'Vendor/components';

import './ForgotPassword.less';

interface Props {
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
    <Helmet title={`${SITE_TITLE} · Forgot Password`} />
    <div className="ForgotPassword">
      <div className="ForgotPassword-content">
        <div className="ForgotPassword-h1">Password forgotten</div>
        <form className="ForgotPassword-form">
          <Input2
            name="nameOrEmail"
            type="text"
            label="Name or email"
            onChange={onChangeNameOrEmail}
            onBlur={onBlurNameOrEmail}
            value={nameOrEmailValue}
            error={nameOrEmailError}
            grow
          />
          <Button2
            className="ForgotPassword-submit"
            text="Submit"
            type="submit"
            onClick={onSubmit}
            error={!!submitError}
            success={submitSuccess}
            disabled={submitDisabled}
            loading={submitting}
            grow
          />
          <FadeInOut valueToUpdate={!!submitError} speed="fast">
            <span className="ForgotPassword-error">{submitError}</span>
          </FadeInOut>
        </form>
        <div className="ForgotPassword-footer">
          <div className="ForgotPassword-section">
            <span>Remember it?: </span>
            <A className="ForgotPassword-link" href="login" styled underlined frontend>
              <span>log in</span>
            </A>
          </div>
          <div className="ForgotPassword-section">
            <span>Dont have an account?: </span>
            <A className="ForgotPassword-link" href="sign-up" styled underlined frontend>
              <span>sign up</span>
            </A>
          </div>
        </div>
      </div>
    </div>
  </>
);
