import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectSessionErrorLast } from 'Modules/Session/selectors/selectSessionErrorLast';
import { selectSessionLoggedIn } from '../../redux/modules/Session/selectors/selectSessionLoggedIn';
import { BookmarkForm as BookmarkFormUi } from './BookmarkForm';

import './BookmarkForm.less';

const BookmarkForm: React.FC = () => {
  // const dispatch = useDispatch();
  const sessionError = useSelector(selectSessionErrorLast);
  const isLoggedIn = useSelector(selectSessionLoggedIn);
  const [passwordValue, setPasswordValue] = useState<string>(undefined);
  const [passwordError, setPasswordError] = useState<string>(undefined);
  const [submitError, setSubmitError] = useState<string>(undefined);

  const submitDisabled = !passwordValue || !!passwordError;

  const onChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setPasswordValue(value);

    setPasswordError(undefined);
    setSubmitError(undefined);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      password: passwordValue,
    };

    // dispatch(logIn(data));
  };

  useEffect(() => {
    setSubmitError(undefined);
  }, []);

  useEffect(() => {
    if (sessionError?.field === 'password') {
      setPasswordError(sessionError?.message);

      return;
    }

    if (sessionError?.message) setSubmitError(sessionError?.message);
  }, [sessionError]);

  return (
    <BookmarkFormUi
      passwordValue={passwordValue}
      passwordError={passwordError}
      onChangePassword={onChangePassword}
      onSubmit={onSubmit}
      submitDisabled={submitDisabled}
      submitSuccess={isLoggedIn}
      submitError={submitError}
    />
  );
};

export default BookmarkForm;
