import React from 'react';
import Helmet from 'react-helmet';

import A from 'Components/A';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { Button2, FadeInOut, Input2 } from 'Vendor/components';

import './SignUp.less';

interface Props {
  nameValue: string;
  nameError: string;
  onChangeName: (e: React.FormEvent<HTMLInputElement>) => void;
  emailValue: string;
  emailError: string;
  onChangeEmail: (e: React.FormEvent<HTMLInputElement>) => void;
  passwordValue: string;
  passwordError: string;
  onChangePassword: (e: React.FormEvent<HTMLInputElement>) => void;
  passwordRepeatedValue: string;
  passwordRepeatedError: string;
  onChangePasswordRepeated: (e: React.FormEvent<HTMLInputElement>) => void;
  submitDisabled: boolean;
  submitSuccess: boolean;
  submitError: string;
  submitting: boolean;
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}

export const SignUp: React.FC<Props> = ({
  nameValue,
  nameError,
  onChangeName,
  emailValue,
  emailError,
  onChangeEmail,
  passwordValue,
  passwordError,
  onChangePassword,
  passwordRepeatedValue,
  passwordRepeatedError,
  onChangePasswordRepeated,
  submitDisabled,
  submitSuccess,
  submitError,
  submitting,
  onSubmit,
}) => (
  <>
    <Helmet title={`${SITE_TITLE} · Sign Up`} />
    <div className="SignUp">
      <div className="SignUp-content">
        <h1 className="SignUp-h1">Sign up</h1>
        <form className="SignUp-form">
          <div className="SignUp-inputField">
            <Input2
              name="name"
              type="text"
              label="Name"
              onChange={onChangeName}
              onBlur={onChangeName}
              value={nameValue}
              error={nameError}
              grow
            />
          </div>
          <div className="SignUp-inputField">
            <Input2
              name="email"
              type="email"
              label="Email"
              onChange={onChangeEmail}
              onBlur={onChangeEmail}
              value={emailValue}
              error={emailError}
              grow
            />
          </div>
          <div className="SignUp-inputField">
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
          <div className="SignUp-inputField">
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
          <div className="SignUp-submit">
            <Button2
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
              <span className="SignUp-error">{submitError}</span>
            </FadeInOut>
          </div>
        </form>
        <div className="SignUp-footer">
          <div className="SignUp-section">
            <span>Forgot password?: </span>
            <A className="SignUp-link" href="forgot-password" styled underlined frontend>
              <span>reset it</span>
            </A>
          </div>
          <div className="SignUp-section">
            <span>Already have an account?: </span>
            <A className="SignUp-link" href="login" styled underlined frontend>
              <span>login</span>
            </A>
          </div>
        </div>
      </div>
    </div>
  </>
);
