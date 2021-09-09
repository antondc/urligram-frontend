import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import BaseModal2, { BaseModalFooterLink, BaseModalSection, BaseModalTitle } from 'Components/BaseModal2';
import LoginForm from 'Components/LoginForm';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { Space } from 'Vendor/components';

import './LoginModal.less';

const LoginModal: React.FC = () => {
  const dispatch = useDispatch();
  const [locked, setLocked] = useState<boolean>(false);

  const closeModal = () => {
    if (locked) return;
    dispatch(switchLoginModal(false));
  };

  return (
    <BaseModal2 className="LoginModal" onCloseClick={closeModal}>
      <BaseModalTitle>Log In</BaseModalTitle>
      <LoginForm setLocked={setLocked} />
      <BaseModalSection>
        Forgot password?:
        <Space />
        <BaseModalFooterLink href="forgot-password">reset it</BaseModalFooterLink>
      </BaseModalSection>
      <BaseModalSection>
        Dont have an account?:
        <Space />
        <BaseModalFooterLink href="sign-up">sign up</BaseModalFooterLink>
      </BaseModalSection>
    </BaseModal2>
  );
};

export default LoginModal;
