import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamUserId } from 'Modules/Routes/selectors/selectCurrentRouteParamUserId';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import { ImageUpload } from 'Services/ImageUpload';
import { UserForm as UserFormUi } from './UserForm';

import './UserForm.less';

const UserForm: React.FC = () => {
  const userId = useSelector(selectCurrentRouteParamUserId);
  const user = useSelector((state: RootState) => selectUserById(state, { id: userId }));
  const [statement, setStatement] = useState<string>(user?.statement);
  const [statementError, setStatementError] = useState<string>(null);
  const [image, setImage] = useState(user?.image);
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
      name={user?.name}
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
