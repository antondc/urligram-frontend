import React from 'react';

import { Button, FadeInOut, Hr, Input, Span } from '@antoniodcorrea/components';

import './BookmarkForm.less';

interface Props {
  passwordValue: string;
  passwordError: string;
  onChangePassword: (e: React.FormEvent<HTMLInputElement>) => void;
  submitDisabled: boolean;
  submitSuccess: boolean;
  submitError: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const BookmarkForm: React.FC<Props> = ({
  passwordValue,
  passwordError,
  onChangePassword,
  submitDisabled,
  submitSuccess,
  submitError,
  onSubmit,
}) => (
  <form className="BookmarkForm">
    <Input
      name="password"
      type="password"
      label="Password"
      onChange={onChangePassword}
      onBlur={onChangePassword}
      value={passwordValue}
      error={passwordError}
      grow
    />
    <Hr size="nano" spacer />
    <FadeInOut valueToUpdate={!!passwordError} speed="fast">
      <Span className="BookmarkForm-error" size="small">
        {passwordError}
      </Span>
    </FadeInOut>
    <Hr size="big" spacer />
    <Button
      text="Enter"
      type="submit"
      onClick={onSubmit}
      error={!!submitError}
      success={submitSuccess}
      disabled={submitDisabled}
      grow
    />
    <Hr size="nano" spacer />
    <FadeInOut valueToUpdate={!!submitError} speed="fast">
      <Span className="BookmarkForm-error" size="small">
        {submitError}
      </Span>
    </FadeInOut>
  </form>
);
