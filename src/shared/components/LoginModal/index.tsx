import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Cross from 'Assets/svg/cross.svg';
import { logIn } from 'Modules/Session/actions/logIn';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import Border from 'Ui/Border';
import Button from 'Ui/Button';
import H3 from 'Ui/H3';
import Hr from 'Ui/Hr';
import Input from 'Ui/Input';
import Flex from '../../ui/Flex';
import BaseModal from '../BaseModal';

import './LoginModal.less';

interface Props {
  switchLoginModal: () => void;
  logIn: (credentials: any) => Promise<void>;
}

const LoginModal: React.FC<Props> = ({ logIn, switchLoginModal }) => {
  const [password, setPassword] = useState(undefined);
  const [username, setUsername] = useState(undefined);

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    logIn({ username, password });
  };

  return (
    <BaseModal onClick={switchLoginModal}>
      <Border className="LoginModal" grow>
        <Cross className="LoginModal-cross" onClick={switchLoginModal} />
        <Flex horizontal="center">
          <H3>Log in</H3>
        </Flex>
        <Hr type="spacer" size="small" />
        <form className="Login-form">
          <Input name="usrname" label="Session name" value={username} onChange={onUsernameChange} />
          <Hr type="spacer" size="small" />
          <Input name="password" label="Session password" value={password} onChange={onPasswordChange} />
          <Hr type="spacer" size="big" />
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
