import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BaseModal, {
  BaseModalFooter,
  BaseModalFooterLink,
  BaseModalFooterSection,
  BaseModalTitle,
} from 'Components/BaseModal';
import LoginForm from 'Components/LoginForm';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { Space } from '@antoniodcorrea/components';

import './LoginModal.less';

const LoginModal: React.FC = () => {
  const dispatch = useDispatch();
  const glossary = useSelector(selectCurrentGlossary);
  const [locked, setLocked] = useState<boolean>(false);

  const closeModal = () => {
    if (locked) return;
    dispatch(switchLoginModal(false));
  };

  return (
    <BaseModal className="LoginModal" onCloseClick={closeModal}>
      <>
        <BaseModalTitle>{glossary.login}</BaseModalTitle>
        <LoginForm setLocked={setLocked} />
        <BaseModalFooter>
          <BaseModalFooterSection>
            {glossary.forgotPassword}:
            <Space />
            <BaseModalFooterLink href="forgot-password">{glossary.resetPassword}</BaseModalFooterLink>
          </BaseModalFooterSection>
          <BaseModalFooterSection>
            {glossary.dontHaveAccount}:
            <Space />
            <BaseModalFooterLink href="sign-up">{glossary.signUp}</BaseModalFooterLink>
          </BaseModalFooterSection>
        </BaseModalFooter>
      </>
    </BaseModal>
  );
};

export default LoginModal;
