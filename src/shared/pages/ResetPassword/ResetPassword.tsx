import React from 'react';

import A from 'Components/A';
import { Button, FadeInOut, H1, Input, Span } from 'Vendor/components';

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
    <div className="ResetPassword">
      <div className="ResetPassword-content">
        <H1 className="ResetPassword-h1">Password forgotten</H1>
        <form className="ResetPassword-form">
          <Input
            name="password"
            type="password"
            label="Password"
            onChange={onChangePassword}
            onBlur={onChangePassword}
            value={passwordValue}
            error={passwordError}
          />
          <FadeInOut valueToUpdate={!!passwordError} speed="fast">
            <Span className="SignUp-error" size="small">
              {passwordError}
            </Span>
          </FadeInOut>
          <Input
            name="password_repeated"
            type="password"
            label="Repeat password"
            onChange={onChangePasswordRepeated}
            onBlur={onChangePasswordRepeated}
            value={passwordRepeatedValue}
            error={passwordRepeatedError}
          />
          <FadeInOut valueToUpdate={!!passwordRepeatedError} speed="fast">
            <Span className="SignUp-error" size="small">
              {passwordRepeatedError}
            </Span>
          </FadeInOut>
          <Button
            className="ResetPassword-submit"
            text="Submit"
            type="submit"
            onClick={onSubmit}
            error={!!submitError}
            success={submitSuccess}
            disabled={submitDisabled}
            loading={sessionLoading}
          />
          <FadeInOut valueToUpdate={!!submitError} speed="fast">
            <Span className="SignUp-error" size="small">
              {submitError}
            </Span>
          </FadeInOut>
        </form>
        <div className="ResetPassword-footer">
          <div className="ResetPassword-section">
            <Span weight="semiBold">Remember it?: </Span>
            <A href="login" styled underlined frontend>
              <Span weight="semiBold">log in</Span>
            </A>
          </div>
          <div className="ResetPassword-section">
            <Span weight="semiBold">Dont have an account?: </Span>
            <A href="sign-up" styled underlined frontend>
              <Span weight="semiBold">sign up</Span>
            </A>
          </div>
        </div>
      </div>
    </div>
  </>
);
