import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BaseModal, { BaseModalText, BaseModalTitle } from 'Components/BaseModal';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { switchSignUpModal } from 'Modules/Ui/actions/switchSignUpModal';
import { DELAY_SLOW_MS } from 'Root/src/shared/constants';
import history from 'Services/History';

import './SignUpModal.less';

const SignUpModal: React.FC = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(selectSession);
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);

  const closeSignUpModal = () => {
    dispatch(switchSignUpModal(false));

    setTimeout(() => history.push(`/${currentLanguageSlug}`), DELAY_SLOW_MS);
  };

  return (
    <BaseModal className="SignUpModal" onCloseClick={closeSignUpModal}>
      <>
        <BaseModalTitle>Thanks @{name}!</BaseModalTitle>
        <BaseModalText>
          Your account has been created and is on stand by. Please check your email to activate it!
        </BaseModalText>
        <BaseModalText>✉️&nbsp;&nbsp;&nbsp;🚀</BaseModalText>
      </>
    </BaseModal>
  );
};

export default SignUpModal;
