import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Cross from 'Assets/svg/cross.svg';
import A from 'Components/A';
import BaseModal from 'Components/BaseModal';
import LoginForm from 'Components/LoginForm';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { Flex, H3, Hr, Span } from 'Vendor/components';

import './LoginModal.less';

const LoginModal: React.FC = () => {
  const dispatch = useDispatch();
  const [modalLocked, setModalLocked] = useState<boolean>(false);

  const closeModal = () => {
    if (modalLocked) return;
    dispatch(switchLoginModal(false));
  };

  return (
    <BaseModal>
      <div className="LoginModal">
        <Cross className="LoginModal-cross" onClick={closeModal} />
        <Flex horizontal="center">
          <H3>Log in</H3>
        </Flex>
        <Hr spacer size="small" />
        <LoginForm setModalLocked={setModalLocked} />
        <Hr spacer size="big" />
        <Flex horizontal="center">
          <div className="Login-section">
            <Span weight="semiBold">Forgot password?: </Span>
            <A href="forgot-password" styled underlined frontend onClick={closeModal}>
              <Span weight="semiBold">reset it</Span>
            </A>
          </div>
          <Hr size="micro" spacer />
          <div className="Login-section">
            <Span weight="semiBold">Dont have an account?: </Span>
            <A href="sign-up" styled underlined frontend onClick={closeModal}>
              <Span weight="semiBold">sign up</Span>
            </A>
          </div>
        </Flex>
      </div>
    </BaseModal>
  );
};

export default LoginModal;
