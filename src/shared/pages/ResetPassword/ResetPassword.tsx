import React from 'react';

import A from 'Components/A';
import { Button, FadeInOut, Flex, H1, Hr, Input, Span } from 'Vendor/components';

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
  onSubmit,
}) => (
  <>
    <Hr spacer size="big" />
    <Hr spacer size="big" />
    <Hr spacer size="big" />
    <div className="ResetPassword">
      <div className="ResetPassword-content">
        <H1 className="ResetPassword-h1">Password forgotten</H1>
        <form className="ResetPassword-form">
          <Hr size="normal" spacer />
          <Input
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
            text="Enter"
            type="submit"
            onClick={onSubmit}
            error={!!submitError}
            success={submitSuccess}
            disabled={submitDisabled}
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
          <div className="ResetPassword-section">
            <Span bold>Remember it?: </Span>
            <A href="login" styled underlined frontend>
              <Span bold>log in</Span>
            </A>
          </div>
          <Hr size="micro" spacer />
          <div className="ResetPassword-section">
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
