import React from 'react';
import { useDispatch } from 'react-redux';

import Cross from 'Assets/svg/cross.svg';
import A from 'Components/A';
import BaseModal from 'Components/BaseModal';
import LoginForm from 'Components/LoginForm';
import { Border, Flex, H3, Hr, Span } from 'Vendor/components';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';

import './LoginModal.less';

const LoginModal: React.FC = () => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(switchLoginModal(false));
  };

  return (
    <BaseModal onClick={closeModal}>
      <Border className="LoginModal" grow>
        <Cross className="LoginModal-cross" onClick={closeModal} />
        <Flex horizontal="center">
          <H3>Log in</H3>
        </Flex>
        <Hr spacer size="small" />
        <LoginForm />
        <Hr spacer size="big" />
        <Flex horizontal="center">
          <div className="Login-section">
            <Span bold>Forgot password?: </Span>
            <A href="forgot-password" styled underlined frontend onClick={closeModal}>
              <Span bold>reset it</Span>
            </A>
          </div>
          <Hr size="micro" spacer />
          <div className="Login-section">
            <Span bold>Dont have an account?: </Span>
            <A href="sign-up" styled underlined frontend onClick={closeModal}>
              <Span bold>sign up</Span>
            </A>
          </div>
        </Flex>
      </Border>
    </BaseModal>
  );
};

export default LoginModal;
