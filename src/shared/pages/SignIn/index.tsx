import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import A from 'Components/A';
import { logIn } from 'Modules/Session/actions/logIn';
import { selectSessionError } from 'Modules/Session/selectors/selectSessionError';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { Button, Flex, H1, Hr, Input, Span } from '@antoniodcorrea/components';

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
      <div className="SignIn">
        <div className="SignIn-content">
          <H1 className="SignIn-h1">Sign in</H1>
          <form className="SignIn-form">
            <Hr size="normal" spacer />
            <Input
              name="username"
              type="text"
              label="Name"
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
            <Hr size="normal" spacer />
            <Button text="Enter" type="submit" onClick={onSubmit} error={!!sessionError} success={!!sessionId} />
          </form>
          <Hr size="big" spacer />
          <Flex horizontal="center">
            <Span bold>Forgot password?</Span>
            <Hr size="micro" spacer />
            <div className="SignIn-section">
              <Span bold>Already have an account?: </Span>
              <A href="login" styled underlined frontend>
                <Span bold>login</Span>
              </A>
            </div>
          </Flex>
        </div>
      </div>
    </>
  );
};

export default SignIn;
