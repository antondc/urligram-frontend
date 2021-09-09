import React from 'react';
import { useDispatch } from 'react-redux';

import BaseModal2, { BaseModalText, BaseModalTitle } from 'Components/BaseModal2';
import { switchForgotPasswordModal } from 'Modules/Ui/actions/switchForgotPasswordModal';
import { Routes } from 'Router/routes';
import history from 'Services/History';

import './ForgotPasswordModal.less';

const ForgotPasswordModal: React.FC = () => {
  const dispatch = useDispatch();

  const closeForgotPasswordModal = () => {
    dispatch(switchForgotPasswordModal(false));
    history.push(Routes.Home.route);
  };

  return (
    <BaseModal2 className="ForgotPasswordModal" onCloseClick={closeForgotPasswordModal}>
      <BaseModalTitle>We received your request</BaseModalTitle>
      <BaseModalText>Please check your email</BaseModalText>
      <BaseModalText>✉️&nbsp;&nbsp;&nbsp;🚀</BaseModalText>
    </BaseModal2>
  );
};

export default ForgotPasswordModal;
