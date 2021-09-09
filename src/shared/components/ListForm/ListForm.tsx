import React from 'react';

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
  <form className="ListForm" onSubmit={onSubmit}>
    <div className="ListForm-inputField">
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
    </div>
    <div className="ListForm-inputField">
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
    </div>
    <div className="ListForm-inputField">
      <div className="ListForm-privateTitle">Is Private</div>
      <Switch name="isPrivate" checked={isPrivateValue} onChange={onChangeIsPrivate} />
    </div>
    <div className="ListForm-submit">
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
      <FadeInOut valueToUpdate={!!submitError} speed="fast">
        <span className="ListForm-error">{submitError}</span>
      </FadeInOut>
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
    </div>
  </form>
);
