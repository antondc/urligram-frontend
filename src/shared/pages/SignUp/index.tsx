import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import A from 'Components/A';
import { signUp } from 'Modules/Session/actions/signUp';
import { selectSessionError } from 'Modules/Session/selectors/selectSessionError';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { SignUpRequest } from 'Modules/Session/session.types';
import { Button, Flex, H1, Hr, Input, Span } from '@antoniodcorrea/components';

import './SignUp.less';

const SignUp: React.FC = () => {
  const [formState, setFormState] = useState<Partial<SignUpRequest>>({
    name: undefined,
    email: undefined,
    password: undefined,
    password_repeated: undefined,
  });
  const dispatch = useDispatch();
  const sessionError = useSelector(selectSessionError);
  const sessionId = useSelector(selectSessionUserId);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: formState.name,
      email: formState.email,
      password: formState.password,
      password_repeated: formState.password_repeated,
    };

    dispatch(signUp(data));
  };

  return (
    <>
      <Hr spacer size="big" />
      <Hr spacer size="big" />
      <Hr spacer size="big" />
      <div className="SignUp">
        <div className="SignUp-content">
          <H1 className="SignUp-h1">Sign up</H1>
          <form className="SignUp-form">
            <Hr size="normal" spacer />
            <Input
              name="name"
              type="text"
              label="Name"
              onChange={onChange}
              value={formState.name}
              error={!!sessionError}
              success={!!sessionId}
            />
            <Hr size="nano" spacer />
            <Input
              name="email"
              type="email"
              label="Email"
              onChange={onChange}
              value={formState.email}
              error={!!sessionError}
              success={!!sessionId}
            />
            <Hr size="nano" spacer />
            <Input
              name="password"
              type="password"
              label="Password"
              onChange={onChange}
              value={formState.password}
              error={!!sessionError}
              success={!!sessionId}
            />
            <Hr size="nano" spacer />
            <Input
              name="password_repeated"
              type="password"
              label="Repeat password"
              onChange={onChange}
              value={formState.password_repeated}
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
            <div className="SignUp-section">
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

export default SignUp;
