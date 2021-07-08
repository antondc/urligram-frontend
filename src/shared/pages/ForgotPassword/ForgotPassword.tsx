import React from 'react';

import A from 'Components/A';
import { Button, FadeInOut, H1, Input, Span } from 'Vendor/components';

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
    <div className="ForgotPassword">
      <div className="ForgotPassword-content">
        <H1 className="ForgotPassword-h1">Password forgotten</H1>
        <form className="ForgotPassword-form">
          <Input
            name="nameOrEmail"
            type="text"
            label="Name or email"
            onChange={onChangeNameOrEmail}
            onBlur={onBlurNameOrEmail}
            value={nameOrEmailValue}
            error={nameOrEmailError}
          />
          <FadeInOut valueToUpdate={!!nameOrEmailError} speed="fast">
            <Span className="ForgotPassword-error" size="small">
              {nameOrEmailError}
            </Span>
          </FadeInOut>
          <Button
            className="ForgotPassword-submit"
            text="Submit"
            type="submit"
            onClick={onSubmit}
            error={!!submitError}
            success={submitSuccess}
            disabled={submitDisabled}
            loading={submitting}
          />
          <FadeInOut valueToUpdate={!!submitError} speed="fast">
            <Span className="ForgotPassword-error" size="small">
              {submitError}
            </Span>
          </FadeInOut>
        </form>
        <div className="ForgotPassword-footer">
          <div className="ForgotPassword-section">
            <Span weight="semiBold">Remember it?: </Span>
            <A className="ForgotPassword-link" href="login" styled underlined frontend>
              <Span weight="semiBold">log in</Span>
            </A>
          </div>
          <div className="ForgotPassword-section">
            <Span weight="semiBold">Dont have an account?: </Span>
            <A className="ForgotPassword-link" href="sign-up" styled underlined frontend>
              <Span weight="semiBold">sign up</Span>
            </A>
          </div>
        </div>
      </div>
    </div>
  </>
);
