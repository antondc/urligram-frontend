import React from 'react';

import A from 'Components/A';
import { Button, FadeInOut, Flex, H1, Hr, Input, Span } from 'Vendor/components';

import './ForgotPassword.less';

interface Props {
  nameOrEmailValue: string;
  nameOrEmailError: string;
  onChangeNameOrEmail: (e: React.FormEvent<HTMLInputElement>) => void;
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
    <div className="ForgotPassword">
      <div className="ForgotPassword-content">
        <H1 className="ForgotPassword-h1">Password forgotten</H1>
        <form className="ForgotPassword-form">
          <Hr size="normal" spacer />
          <Input
            name="nameOrEmail"
            type="text"
            label="Name or email"
            onChange={onChangeNameOrEmail}
            onBlur={onChangeNameOrEmail}
            value={nameOrEmailValue}
            error={nameOrEmailError}
          />
          <FadeInOut valueToUpdate={!!nameOrEmailError} speed="fast">
            <Span className="ForgotPassword-error" size="small">
              {nameOrEmailError}
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
            <Span className="ForgotPassword-error" size="small">
              {submitError}
            </Span>
          </FadeInOut>
        </form>
        <Hr size="big" spacer />
        <Flex horizontal="center">
          <div className="ForgotPassword-section">
            <Span weight="semiBold">Remember it?: </Span>
            <A href="login" styled underlined frontend>
              <Span weight="semiBold">log in</Span>
            </A>
          </div>
          <Hr size="micro" spacer />
          <div className="ForgotPassword-section">
            <Span weight="semiBold">Dont have an account?: </Span>
            <A href="sign-up" styled underlined frontend>
              <Span weight="semiBold">sign up</Span>
            </A>
          </div>
        </Flex>
      </div>
    </div>
  </>
);
