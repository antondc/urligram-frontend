import React from 'react';

import BaseForm, { BaseFormField } from 'Components/BaseForm';
import { BaseFormError } from 'Components/BaseForm/BaseFormError';
import { BaseFormLabel } from 'Components/BaseForm/BaseFormLabel';
import { BaseFormSubmit } from 'Components/BaseForm/BaseFormSubmit';
import { Button2, FadeInOut, Input2, Switch } from 'Vendor/components';

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
      <Input2
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
      <Input2
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
      {!!isUpdate && (
        <Button2
          text="Remove list"
          type="submit"
          onClick={onRemove}
          error={!!submitError}
          success={submitSuccess}
          loading={removing}
          grow
        />
      )}
      <FadeInOut valueToUpdate={!!submitError} speed="fast">
        <BaseFormError>{submitError}</BaseFormError>
      </FadeInOut>
    </BaseFormSubmit>
  </BaseForm>
);
