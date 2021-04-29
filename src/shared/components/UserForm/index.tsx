import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectSession } from 'Modules/Session/selectors/selectSession';
import { UserForm as UserFormUi } from './UserForm';

import './UserForm.less';

const UserForm: React.FC = () => {
  const session = useSelector(selectSession);
  const [statement, setStatement] = useState<string>(session?.statement);
  const [statementError, setStatementError] = useState<string>(null);
  const [image, setImage] = useState(session?.image);
  const [imageError, setImageError] = useState<string>(null);

  const onChangeStatement = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setStatementError(null);
    const { value } = e.currentTarget;
    setStatement(value);
  };

  const onChangeImage = (value: string) => {
    setImageError(null);
    setImage(value);
  };

  return (
    <UserFormUi
      session={session}
      statement={statement}
      onChangeStatement={onChangeStatement}
      statementError={statementError}
      image={image}
      imageError={imageError}
      onChangeImage={onChangeImage}
    />
  );
};

export default UserForm;
