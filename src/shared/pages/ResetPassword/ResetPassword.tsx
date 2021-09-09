import React from 'react';
import Helmet from 'react-helmet';

import A from 'Components/A';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { Button2, FadeInOut, Input2 } from 'Vendor/components';

import './ResetPassword.less';

interface Props {
  passwordValue: string;
  passwordError: string;
  onChangePassword: (e: React.FormEvent<HTMLInputElement>) => void;
  passwordRepeatedValue: string;
  passwordRepeatedError: string;
  onChangePasswordRepeated: (e: React.FormEvent<HTMLInputElement>) => void;
  submitDisabled: boolean;
  submitSuccess: boolean;
  submitError: string;
  sessionLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}

export const ResetPassword: React.FC<Props> = ({
  passwordValue,
  passwordError,
  onChangePassword,
  passwordRepeatedValue,
  passwordRepeatedError,
  onChangePasswordRepeated,
  submitDisabled,
  submitSuccess,
  submitError,
  sessionLoading,
  onSubmit,
}) => (
  <>
    <Helmet title={`${SITE_TITLE} · Reset Password`} />
    <div className="ResetPassword">
      <div className="ResetPassword-content">
        <div className="ResetPassword-h1">Reset Password</div>
        <form className="ResetPassword-form">
          <div className="ResetPassword-inputField">
            <Input2
              name="password"
              type="password"
              label="Password"
              onChange={onChangePassword}
              onBlur={onChangePassword}
              value={passwordValue}
              error={passwordError}
              grow
            />
          </div>
          <div className="ResetPassword-inputField">
            <Input2
              name="password_repeated"
              type="password"
              label="Repeat password"
              onChange={onChangePasswordRepeated}
              onBlur={onChangePasswordRepeated}
              value={passwordRepeatedValue}
              error={passwordRepeatedError}
              grow
            />
          </div>
          <div className="ResetPassword-submit">
            <Button2
              text="Submit"
              type="submit"
              onClick={onSubmit}
              error={!!submitError}
              success={submitSuccess}
              disabled={submitDisabled}
              loading={sessionLoading}
              grow
            />
            <FadeInOut valueToUpdate={!!submitError} speed="fast">
              <span className="ResetPassword-error">{submitError}</span>
            </FadeInOut>
          </div>
        </form>
        <div className="ResetPassword-footer">
          <div className="ResetPassword-section">
            <span>Remember it?: </span>
            <A href="login" styled underlined frontend>
              <span>log in</span>
            </A>
          </div>
          <div className="ResetPassword-section">
            <span>Dont have an account?: </span>
            <A href="sign-up" styled underlined frontend>
              <span>sign up</span>
            </A>
          </div>
        </div>
      </div>
    </div>
  </>
);
