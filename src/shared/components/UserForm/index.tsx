import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamUserId } from 'Modules/Routes/selectors/selectCurrentRouteParamUserId';
import { sessionUpdateDetails } from 'Modules/Session/actions/sessionUpdateDetails';
import { selectSessionLoading } from 'Modules/Session/selectors/selectSessionLoading';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import { ImageUpload } from 'Services/ImageUpload';
import { UserForm as UserFormUi } from './UserForm';

import './UserForm.less';

const UserForm: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentRouteParamUserId);
  const user = useSelector((state: RootState) => selectUserById(state, { id: userId }));
  const sessionLoading = useSelector(selectSessionLoading);
  const [statement, setStatement] = useState<string>(undefined);
  const [statementError, setStatementError] = useState<string>(null);
  const [image, setImage] = useState<{ original: string }>(undefined);
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
      await setImage({
        original: data?.image,
      });
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

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data = {
      name: user?.name,
      email: user?.email,
      statement: statement,
      location: user?.location,
      image: image,
    };

    await dispatch(sessionUpdateDetails(data));
  };

  useEffect(() => {
    setImage({
      original: user?.image?.original,
    });
    setStatement(user?.statement);
  }, [user]);

  return (
    <UserFormUi
      name={user?.name}
      statement={statement}
      onChangeStatement={onChangeStatement}
      statementError={statementError}
      image={image?.original}
      imageError={imageError}
      percentCompleted={percentCompleted}
      uploadFilesToServer={uploadFilesToServer}
      removeFilesFromServer={removeFilesFromServer}
      onSubmit={onSubmit}
      submitting={sessionLoading}
    />
  );
};

export default UserForm;
