import React from 'react';

import { FadeInOut, ImageField, Span, TextArea } from 'Vendor/components';

interface Props {
  name: string;
  statement: string;
  statementError: string;
  image: string;
  imageError: string;
  percentCompleted: number;
  onChangeStatement: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  uploadFilesToServer: (file: File) => void;
  removeFilesFromServer: (file: any) => void;
}

export const UserForm: React.FC<Props> = ({
  name,
  statement,
  statementError,
  onChangeStatement,
  image,
  imageError,
  percentCompleted,
  uploadFilesToServer,
  removeFilesFromServer,
}) => (
  <form className="UserForm" onSubmit={() => {}}>
    <Span className="UserForm-title" bold>
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
    />
    <FadeInOut valueToUpdate={!!statementError} speed="fast">
      <Span className="UserForm-statementError" size="small">
        {statementError}
      </Span>
    </FadeInOut>
    <ImageField
      className="UserForm-image"
      label="My file"
      name="Some image"
      image={image}
      grow={false}
      uploadFiles={uploadFilesToServer}
      onRemove={removeFilesFromServer}
      percentCompleted={percentCompleted}
      removable
    />
    <FadeInOut valueToUpdate={!!imageError} speed="fast">
      <Span className="UserForm-imageError" size="small">
        {imageError}
      </Span>
    </FadeInOut>
  </form>
);
