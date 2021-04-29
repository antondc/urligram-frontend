import React from 'react';

import { SessionState } from 'Modules/Session/session.types';
import { FadeInOut, ImageField, Span, TextArea, WithUploadLogic } from 'Vendor/components';

const ImageFieldWithUploadApi = WithUploadLogic(ImageField);

interface Props {
  session: SessionState;
  statement: string;
  statementError: string;
  image: string;
  imageError: string;
  onChangeStatement: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  onChangeImage: (value: string) => void;
}

export const UserForm: React.FC<Props> = ({
  session,
  statement,
  statementError,
  onChangeStatement,
  image,
  imageError,
  onChangeImage,
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
    <ImageFieldWithUploadApi
      className="UserForm-image"
      label="My file"
      name="Some file"
      rounded
      urlApiUpload="http://example.com/api/v1/upload"
      url={image}
      onUploaded={onChangeImage}
    />
    <FadeInOut valueToUpdate={!!imageError} speed="fast">
      <Span className="UserForm-imageError" size="small">
        {imageError}
      </Span>
    </FadeInOut>
  </form>
);
