import React from 'react';

import BaseForm, { BaseFormError, BaseFormField, BaseFormSubmit } from 'Components/BaseForm';
import { Button, FadeInOut, ImageField, TextArea } from '@antoniodcorrea/components';

interface Props {
  statement: string;
  statementError: string;
  image: string;
  imageError: string;
  percentCompleted: number;
  submitting: boolean;
  onChangeStatement: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  uploadFilesToServer: (file: File) => void;
  removeFilesFromServer: (file: any) => void;
  onSubmit: (e: React.FormEvent<HTMLElement>) => void;
}

export const UserForm: React.FC<Props> = ({
  statement,
  statementError,
  onChangeStatement,
  image,
  imageError,
  percentCompleted,
  submitting,
  uploadFilesToServer,
  removeFilesFromServer,
  onSubmit,
}) => (
  <BaseForm className="UserForm" onSubmit={onSubmit}>
    <BaseFormField className="UserForm-statement">
      <TextArea
        name="statement"
        type="text"
        label="About me"
        onChange={onChangeStatement}
        value={statement}
        grow
        maxLength={200}
        error={!!statementError}
      />
    </BaseFormField>
    <ImageField
      className="UserForm-image"
      label="My file"
      name="userImage"
      image={image}
      grow={false}
      uploadFiles={uploadFilesToServer}
      onRemove={removeFilesFromServer}
      percentCompleted={percentCompleted}
      accept=".jpg,.jpeg,.png"
    />
    <FadeInOut valueToUpdate={!!imageError} speed="fast">
      <BaseFormError className="UserForm-imageError">{imageError}</BaseFormError>
    </FadeInOut>
    <BaseFormSubmit className="UserForm-submitButton">
      <Button text="Save" type="submit" onClick={onSubmit} loading={submitting} grow />
    </BaseFormSubmit>
  </BaseForm>
);
