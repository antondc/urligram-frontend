import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BaseModal, { BaseModalText, BaseModalTitle } from 'Components/BaseModal';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { switchWelcomeModal } from 'Modules/Ui/actions/switchWelcomeModal';

import './WelcomeModal.less';

const WelcomeModal: React.FC = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(selectSession);

  const closeWelcomeModal = () => {
    dispatch(switchWelcomeModal(false));
  };

  return (
    <BaseModal className="WelcomeModal" onCloseClick={closeWelcomeModal}>
      <>
        <BaseModalTitle>Welcome @{name}!</BaseModalTitle>
        <BaseModalText>Your account is active now</BaseModalText>
        <BaseModalText>🎉&nbsp;&nbsp;&nbsp;🥳</BaseModalText>
      </>
    </BaseModal>
  );
};

export default WelcomeModal;
