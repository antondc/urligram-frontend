import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cross from 'Assets/svg/cross.svg';
import BaseModal from 'Components/BaseModal';
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
    <BaseModal onClick={closeWelcomeModal}>
      <div className="WelcomeModal">
        <Cross className="WelcomeModal-cross" onClick={closeWelcomeModal} />
        <h4 className="WelcomeModal-title">Welcome @{name}!</h4>
        <p className="WelcomeModal-text"> Your account is active now</p>
        <p className="WelcomeModal-text">🎉&nbsp;&nbsp;&nbsp;🥳</p>
      </div>
    </BaseModal>
  );
};

export default WelcomeModal;
