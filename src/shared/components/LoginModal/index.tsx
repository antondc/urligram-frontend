import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Cross from 'Assets/svg/cross.svg';
import A from 'Components/A';
import BaseModal from 'Components/BaseModal';
import LoginForm from 'Components/LoginForm';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';

import './LoginModal.less';

const LoginModal: React.FC = () => {
  const dispatch = useDispatch();
  const [locked, setLocked] = useState<boolean>(false);

  const closeModal = () => {
    if (locked) return;
    dispatch(switchLoginModal(false));
  };

  return (
    <BaseModal>
      <div className="LoginModal">
        <Cross className="LoginModal-cross" onClick={closeModal} />
        <h3 className="LoginModal-title">Log in</h3>
        <LoginForm setLocked={setLocked} />
        <div className="LoginModal-section">
          <span>Forgot password?: </span>
          <A className="LoginModal-link" href="forgot-password" styled underlined frontend onClick={closeModal}>
            <span>reset it</span>
          </A>
        </div>
        <div className="LoginModal-section">
          <span>Dont have an account?: </span>
          <A className="LoginModal-link" href="sign-up" styled underlined frontend onClick={closeModal}>
            <span>sign up</span>
          </A>
        </div>
      </div>
    </BaseModal>
  );
};

export default LoginModal;
