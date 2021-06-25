import React from 'react';

import A from 'Components/A';
import { Button, FadeInOut, Flex, H1, Hr, Input, Span } from 'Vendor/components';

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
    <Hr spacer size="big" />
    <Hr spacer size="big" />
    <Hr spacer size="big" />
    <div className="SignUp">
      <div className="SignUp-content">
        <H1 className="SignUp-h1">Sign up</H1>
        <form className="SignUp-form">
          <Hr size="normal" spacer />
          <Input
            className="SignUp-input"
            name="name"
            type="text"
            label="Name"
            onChange={onChangeName}
            onBlur={onChangeName}
            value={nameValue}
            error={nameError}
          />
          <FadeInOut valueToUpdate={!!nameError} speed="fast">
            <Span className="SignUp-error" size="small">
              {nameError}
            </Span>
          </FadeInOut>
          <Hr size="nano" spacer />
          <Input
            className="SignUp-input"
            name="email"
            type="email"
            label="Email"
            onChange={onChangeEmail}
            onBlur={onChangeEmail}
            value={emailValue}
            error={emailError}
          />
          <Hr size="nano" spacer />
          <FadeInOut valueToUpdate={!!emailError} speed="fast">
            <Span className="SignUp-error" size="small">
              {emailError}
            </Span>
          </FadeInOut>
          <Hr size="nano" spacer />
          <Input
            className="SignUp-input"
            name="password"
            type="password"
            label="Password"
            onChange={onChangePassword}
            onBlur={onChangePassword}
            value={passwordValue}
            error={passwordError}
          />
          <Hr size="nano" spacer />
          <FadeInOut valueToUpdate={!!passwordError} speed="fast">
            <Span className="SignUp-error" size="small">
              {passwordError}
            </Span>
          </FadeInOut>
          <Hr size="nano" spacer />
          <Input
            className="SignUp-input"
            name="password_repeated"
            type="password"
            label="Repeat password"
            onChange={onChangePasswordRepeated}
            onBlur={onChangePasswordRepeated}
            value={passwordRepeatedValue}
            error={passwordRepeatedError}
          />
          <Hr size="nano" spacer />
          <FadeInOut valueToUpdate={!!passwordRepeatedError} speed="fast">
            <Span className="SignUp-error" size="small">
              {passwordRepeatedError}
            </Span>
          </FadeInOut>
          <Hr size="normal" spacer />
          <Button
            text="Submit"
            type="submit"
            onClick={onSubmit}
            error={!!submitError}
            success={submitSuccess}
            disabled={submitDisabled}
            loading={submitting}
          />
          <Hr size="nano" spacer />
          <FadeInOut valueToUpdate={!!submitError} speed="fast">
            <Span className="SignUp-error" size="small">
              {submitError}
            </Span>
          </FadeInOut>
        </form>
        <Hr size="big" spacer />
        <Flex horizontal="center">
          <div className="SignUp-section">
            <Span weight="semiBold">Forgot password?: </Span>
            <A href="forgot-password" styled underlined frontend>
              <Span weight="semiBold">reset it</Span>
            </A>
          </div>
          <Hr size="micro" spacer />
          <div className="SignUp-section">
            <Span weight="semiBold">Already have an account?: </Span>
            <A href="login" styled underlined frontend>
              <Span weight="semiBold">login</Span>
            </A>
          </div>
        </Flex>
      </div>
    </div>
  </>
);
