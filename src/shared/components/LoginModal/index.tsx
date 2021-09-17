import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import BaseModal, {
  BaseModalFooter,
  BaseModalFooterLink,
  BaseModalFooterSection,
  BaseModalTitle,
} from 'Components/BaseModal';
import LoginForm from 'Components/LoginForm';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { Space } from '@antoniodcorrea/components';

import './LoginModal.less';

const LoginModal: React.FC = () => {
  const dispatch = useDispatch();
  const [locked, setLocked] = useState<boolean>(false);

  const closeModal = () => {
    if (locked) return;
    dispatch(switchLoginModal(false));
  };

  return (
    <BaseModal className="LoginModal" onCloseClick={closeModal}>
      <>
        <BaseModalTitle>Log In</BaseModalTitle>
        <LoginForm setLocked={setLocked} />
        <BaseModalFooter>
          <BaseModalFooterSection>
            Forgot password?:
            <Space />
            <BaseModalFooterLink href="forgot-password">reset it</BaseModalFooterLink>
          </BaseModalFooterSection>
          <BaseModalFooterSection>
            Dont have an account?:
            <Space />
            <BaseModalFooterLink href="sign-up">sign up</BaseModalFooterLink>
          </BaseModalFooterSection>
        </BaseModalFooter>
      </>
    </BaseModal>
  );
};

export default LoginModal;
