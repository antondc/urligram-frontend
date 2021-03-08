import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logIn } from 'Modules/Session/actions/logIn';
import { selectSessionError } from 'Modules/Session/selectors/selectSessionError';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { Button, H3, Hr, Input } from '@antoniodcorrea/components';

import './SignIn.less';

interface State {
  username: string | undefined;
  password: string | undefined;
}
const SignIn: React.FC = () => {
  const [formState, setFormState] = useState<State>({
    username: undefined,
    password: undefined,
  });
  const dispatch = useDispatch();
  const sessionError = useSelector(selectSessionError);
  const sessionId = useSelector(selectSessionUserId);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.currentTarget.name]: e.currentTarget.value,
    } as Pick<State, keyof State>);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: formState.username,
      password: formState.password,
    };

    dispatch(logIn(data));
  };

  return (
    <>
      <Hr spacer size="big" />
      <Hr spacer size="big" />
      <Hr spacer size="big" />
      <div className="Login">
        <div className="Login-content">
          <H3 className="Login-h1">LOGIN PAGE</H3>
          <form className="Login-form">
            <Hr size="small" spacer />
            <Input
              name="username"
              type="input"
              label="Session name"
              onChange={onChange}
              value={formState.username}
              error={!!sessionError}
              success={!!sessionId}
            />
            <Hr size="small" spacer />
            <Input
              name="password"
              type="password"
              label="Password"
              onChange={onChange}
              value={formState.password}
              error={!!sessionError}
              success={!!sessionId}
            />
            <Hr size="big" spacer />
            <Button text="Enter" type="submit" onClick={onSubmit} error={!!sessionError} success={!!sessionId} />
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
