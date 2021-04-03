import React from 'react';

import { Button, Fade, FadeInOut, Flex, Hr, Input, Span, SpinnerCircle, Switch } from '@antoniodcorrea/components';

import './ListForm.less';

interface Props {
  nameValue: string;
  nameError: string;
  onChangeName: (e: React.FormEvent<HTMLInputElement>) => void;
  descriptionValue: string;
  descriptionError: string;
  onChangeDescription: (e: React.FormEvent<HTMLInputElement>) => void;
  isPrivateValue: boolean;
  isPrivateError: string;
  onChangeIsPrivate: (e: React.FormEvent<HTMLInputElement>) => void;
  submitDisabled: boolean;
  submitInProcess: boolean;
  submitSuccess: boolean;
  submitError: string;
  onSubmit: (e: React.FormEvent<HTMLElement>) => void;
}

export const ListForm: React.FC<Props> = ({
  nameValue,
  nameError,
  onChangeName,
  descriptionValue,
  descriptionError,
  onChangeDescription,
  isPrivateValue,
  isPrivateError,
  onChangeIsPrivate,
  submitDisabled,
  submitInProcess,
  submitSuccess,
  submitError,
  onSubmit,
}) => (
  <form className="ListForm" onSubmit={onSubmit}>
    <Flex growVertical={false} horizontal="left" vertical="bottom" noWrap>
      <Input
        name="name"
        type="text"
        label="List name"
        onChange={onChangeName}
        value={nameValue}
        error={nameError}
        grow
        autoFocus
      />
    </Flex>
    <Hr size="nano" spacer />
    <FadeInOut valueToUpdate={!!nameError} speed="fast">
      <Span className="ListForm-error" size="small">
        {nameError}
      </Span>
    </FadeInOut>
    <Hr spacer />
    <Input
      name="title"
      type="text"
      label="List description"
      onChange={onChangeDescription}
      value={descriptionValue}
      error={descriptionError}
      grow
    />
    <Hr size="nano" spacer />
    <FadeInOut valueToUpdate={!!descriptionError} speed="fast">
      <Span className="ListForm-error" size="small">
        {descriptionError}
      </Span>
    </FadeInOut>
    <Hr spacer />
    <Span size="small" className="ListForm-private">
      Is Private
    </Span>
    <Hr size="micro" spacer />
    <Switch name="isPrivate" checked={isPrivateValue} onChange={onChangeIsPrivate} />
    <Hr size="nano" spacer />
    <FadeInOut valueToUpdate={!!isPrivateError} speed="fast">
      <Span className="ListForm-error" size="small">
        {isPrivateError}
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
      <Span className="ListForm-error" size="small">
        {submitError}
      </Span>
    </FadeInOut>
    <Fade mounted={submitInProcess} position="absolute">
      <SpinnerCircle background />
    </Fade>
  </form>
);
