import React from 'react';

import { Button, FadeInOut, ImageField, Span, TextArea } from 'Vendor/components';

interface Props {
  name: string;
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
  name,
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
  <form className="UserForm" onSubmit={onSubmit}>
    <Span className="UserForm-title" weight="extraBold">
      @{name}
    </Span>
    <TextArea
      className="UserForm-statement"
      name="statement"
      type="text"
      label="Statement"
      onChange={onChangeStatement}
      value={statement}
      grow
      maxLength={200}
    />
    <FadeInOut valueToUpdate={!!statementError} speed="fast">
      <Span className="UserForm-statementError" size="small">
        {statementError}
      </Span>
    </FadeInOut>
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
      <Span className="UserForm-imageError" size="small">
        {imageError}
      </Span>
    </FadeInOut>
    <Button
      className="UserForm-submitButton"
      text="Save"
      type="submit"
      onClick={onSubmit}
      loading={submitting}
      // error={!!submitError}
      // success={submitSuccess}
      // disabled={submitDisabled}
      grow
    />
  </form>
);
