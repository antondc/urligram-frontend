import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Cross from 'Assets/svg/cross.svg';
import BaseModal from 'Components/BaseModal';
import { logIn } from 'Modules/Session/actions/logIn';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { Border, Button, Flex, H3, Hr, Input } from '@antoniodcorrea/components';

import './LoginModal.less';

interface Props {
  switchLoginModal: (mount: boolean) => void;
  logIn: ({ nameOrEmail, password }) => Promise<void>;
}

const LoginModal: React.FC<Props> = ({ logIn, switchLoginModal }) => {
  const [password, setPassword] = useState(undefined);
  const [nameOrEmail, setUsernameOrEmail] = useState(undefined);

  const onUsernameChange = (e) => {
    setUsernameOrEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    logIn({ nameOrEmail, password });
  };

  return (
    <BaseModal onClick={() => switchLoginModal(false)}>
      <Border className="LoginModal" grow>
        <Cross className="LoginModal-cross" onClick={() => switchLoginModal(false)} />
        <Flex horizontal="center">
          <H3>Log in</H3>
        </Flex>
        <Hr spacer size="small" />
        <form className="Login-form">
          <Input name="usrname" label="Session name" value={nameOrEmail} onChange={onUsernameChange} />
          <Hr spacer size="small" />
          <Input name="password" label="Session password" value={password} onChange={onPasswordChange} />
          <Hr spacer size="big" />
          <Button text="Enter" type="submit" onClick={onSubmit} />
        </form>
      </Border>
    </BaseModal>
  );
};

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps, {
  switchLoginModal,
  logIn,
})(LoginModal);
