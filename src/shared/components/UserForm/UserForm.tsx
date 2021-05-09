import React from 'react';

import { SessionState } from 'Modules/Session/session.types';
import { FadeInOut, ImageField, Span, TextArea } from 'Vendor/components';

interface Props {
  session: SessionState;
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
  session,
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
      @{session?.name}
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
