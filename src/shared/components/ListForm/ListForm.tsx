import React from 'react';

import BaseForm, { BaseFormError, BaseFormField, BaseFormLabel, BaseFormSubmit } from 'Components/BaseForm';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { Button, Earth, FadeInOut, Hr, Input, Switch } from '@antoniodcorrea/components';

import './ListForm.less';

interface Props {
  currentGlossary: GlossaryState;
  isUpdate: boolean;
  nameValue: string;
  nameError: string;
  onChangeName: (e: React.FormEvent<HTMLInputElement>) => void;
  descriptionValue: string;
  descriptionError: string;
  onChangeDescription: (e: React.FormEvent<HTMLInputElement>) => void;
  isPublicValue: boolean;
  onChangeIsPublic: (e: React.FormEvent<HTMLInputElement>) => void;
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
  currentGlossary,
  isUpdate,
  nameValue,
  nameError,
  onChangeName,
  descriptionValue,
  descriptionError,
  onChangeDescription,
  isPublicValue,
  onChangeIsPublic,
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
        label={currentGlossary.listName}
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
        label={currentGlossary.listDescription}
        onChange={onChangeDescription}
        value={descriptionValue}
        error={descriptionError}
        onBlur={onBlurDescription}
        grow
      />
    </BaseFormField>
    <BaseFormField>
      <BaseFormLabel>{currentGlossary.isPublicFem}</BaseFormLabel>
      <div className="ListForm-public">
        <Switch name="isPublic" checked={isPublicValue} onChange={onChangeIsPublic} />
        <Earth
          className={'ListForm-iconPublic' + (!!isPublicValue ? ' ListForm-iconPublic--active' : '')}
          size="medium"
        />
      </div>
    </BaseFormField>
    <BaseFormSubmit>
      <Button
        className="ListForm-save"
        text={currentGlossary.save}
        type="submit"
        onClick={onSubmit}
        error={!!submitError}
        success={submitSuccess}
        loading={submitting}
        disabled={submitDisabled}
        grow
      />
      {!!isUpdate && (
        <Button
          className="ListForm-delete"
          text={currentGlossary.removeList}
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
