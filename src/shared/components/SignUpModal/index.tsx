import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BaseModal2, { BaseModalText, BaseModalTitle } from 'Components/BaseModal2';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { switchSignUpModal } from 'Modules/Ui/actions/switchSignUpModal';

import './SignUpModal.less';

const SignUpModal: React.FC = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(selectSession);

  const closeSignUpModal = () => {
    dispatch(switchSignUpModal(false));
  };

  return (
    <BaseModal2 className="SignUpModal" onCloseClick={closeSignUpModal}>
      <BaseModalTitle>Thanks @{name}!</BaseModalTitle>
      <BaseModalText>
        Your account has been created and is on stand by. Please check your email to activate it!
      </BaseModalText>
      <BaseModalText>✉️&nbsp;&nbsp;&nbsp;🚀</BaseModalText>
    </BaseModal2>
  );
};

export default SignUpModal;
