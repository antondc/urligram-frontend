import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectSession } from 'Modules/Session/selectors/selectSession';
import { ImageUpload } from 'Services/ImageUpload';
import { UserForm as UserFormUi } from './UserForm';

import './UserForm.less';

const UserForm: React.FC = () => {
  const session = useSelector(selectSession);
  const [statement, setStatement] = useState<string>(session?.statement);
  const [statementError, setStatementError] = useState<string>(null);
  const [image, setImage] = useState(session?.image);
  const [imageError, setImageError] = useState<string>(null);
  const [percentCompleted, setPercentCompleted] = useState<number>(0);
  const imageUpload = new ImageUpload();

  const onChangeStatement = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setStatementError(null);
    const { value } = e.currentTarget;
    setStatement(value);
  };

  const uploadFilesToServer = async (file) => {
    try {
      const data = await imageUpload.uploadFileToServer({
        file,
        setPercentCompleted,
      });
      await setImage(data?.image);
    } catch (error) {
      setImageError(error.message);
    }
  };

  const onRemoved = (): void => {
    setImageError(undefined);
    setImage(undefined);
  };

  const removeFilesFromServer = async (url: string) => {
    try {
      await imageUpload.removeFileFromServer({
        url,
        onRemoved,
      });
    } catch (error) {
      setImageError(error.message);
    }
  };

  return (
    <UserFormUi
      session={session}
      statement={statement}
      onChangeStatement={onChangeStatement}
      statementError={statementError}
      image={image}
      imageError={imageError}
      percentCompleted={percentCompleted}
      uploadFilesToServer={uploadFilesToServer}
      removeFilesFromServer={removeFilesFromServer}
    />
  );
};

export default UserForm;
