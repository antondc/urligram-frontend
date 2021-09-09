import React from 'react';
import { useDispatch } from 'react-redux';

import BaseModal, { BaseModalText, BaseModalTitle } from 'Components/BaseModal';
import { switchResetPasswordModal } from 'Modules/Ui/actions/switchResetPasswordModal';
import { Routes } from 'Router/routes';
import history from 'Services/History';

import './ResetPasswordModal.less';

const ResetPasswordModal: React.FC = () => {
  const dispatch = useDispatch();

  const closeResetPasswordModal = () => {
    dispatch(switchResetPasswordModal(false));
    history.push(Routes.Home.route);
  };

  return (
    <BaseModal className="ResetPasswordModal" onCloseClick={closeResetPasswordModal}>
      <>
        <BaseModalTitle>Password reset success!</BaseModalTitle>
        <BaseModalText>Save it in a safe place</BaseModalText>
        <BaseModalText>🎉&nbsp;&nbsp;&nbsp;🥳</BaseModalText>
      </>
    </BaseModal>
  );
};

export default ResetPasswordModal;
