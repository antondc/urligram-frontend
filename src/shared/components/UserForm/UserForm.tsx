import React from 'react';

import { Button2, FadeInOut, ImageField, Span, TextArea2 } from 'Vendor/components';

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
  <form className="UserForm" onSubmit={onSubmit}>
    <TextArea2
      className="UserForm-statement"
      name="statement"
      type="text"
      label="About me"
      onChange={onChangeStatement}
      value={statement}
      grow
      maxLength={200}
      error={!!statementError}
    />
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
    <Button2 className="UserForm-submitButton" text="Save" type="submit" onClick={onSubmit} loading={submitting} grow />
  </form>
);
