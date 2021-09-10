import React from 'react';

import BaseForm, { BaseFormError, BaseFormField, BaseFormLabel, BaseFormSubmit } from 'Components/BaseForm';
import { Button2, FadeInOut, Input, Switch } from 'Vendor/components';

import './ListForm.less';

interface Props {
  isUpdate: boolean;
  nameValue: string;
  nameError: string;
  onChangeName: (e: React.FormEvent<HTMLInputElement>) => void;
  descriptionValue: string;
  descriptionError: string;
  onChangeDescription: (e: React.FormEvent<HTMLInputElement>) => void;
  isPrivateValue: boolean;
  onChangeIsPrivate: (e: React.FormEvent<HTMLInputElement>) => void;
  submitDisabled: boolean;
  submitting: boolean;
  submitSuccess: boolean;
  submitError: string;
  removing: boolean;
  onSubmit: (e: React.FormEvent<HTMLElement>) => void;
  onRemove: (e: React.FormEvent<HTMLElement>) => void;
  onBlurTitle: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlurDescription: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const ListForm: React.FC<Props> = ({
  isUpdate,
  nameValue,
  nameError,
  onChangeName,
  descriptionValue,
  descriptionError,
  onChangeDescription,
  isPrivateValue,
  onChangeIsPrivate,
  submitDisabled,
  submitting,
  submitSuccess,
  submitError,
  removing,
  onSubmit,
  onBlurTitle,
  onBlurDescription,
  onRemove,
}) => (
  <BaseForm className="ListForm" onSubmit={onSubmit}>
    <BaseFormField>
      <Input
        name="name"
        type="text"
        label="List name"
        onChange={onChangeName}
        value={nameValue}
        error={nameError}
        onBlur={onBlurTitle}
        grow
        autoFocus
      />
    </BaseFormField>
    <BaseFormField>
      <Input
        name="description"
        type="text"
        label="List description"
        onChange={onChangeDescription}
        value={descriptionValue}
        error={descriptionError}
        onBlur={onBlurDescription}
        grow
      />
    </BaseFormField>
    <BaseFormField>
      <BaseFormLabel>Is Private</BaseFormLabel>
      <Switch name="isPrivate" checked={isPrivateValue} onChange={onChangeIsPrivate} />
    </BaseFormField>
    <BaseFormSubmit>
      <Button2
        text="Save"
        type="submit"
        onClick={onSubmit}
        error={!!submitError}
        success={submitSuccess}
        loading={submitting}
        disabled={submitDisabled}
        grow
      />
    </BaseFormSubmit>
    {!!isUpdate && (
      <BaseFormSubmit>
        <Button2
          className="ListForm-delete"
          text="Remove list"
          type="submit"
          onClick={onRemove}
          error={!!submitError}
          success={submitSuccess}
          loading={removing}
          grow
        />
      </BaseFormSubmit>
    )}
    <FadeInOut valueToUpdate={!!submitError} speed="fast">
      <BaseFormError>{submitError}</BaseFormError>
    </FadeInOut>
  </BaseForm>
);
