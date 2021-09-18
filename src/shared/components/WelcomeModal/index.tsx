import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BaseModal, { BaseModalText, BaseModalTitle } from 'Components/BaseModal';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { switchWelcomeModal } from 'Modules/Ui/actions/switchWelcomeModal';
import { Routes } from 'Router/routes';
import history from 'Services/History';

import './WelcomeModal.less';

const WelcomeModal: React.FC = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(selectSession);
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);

  const closeWelcomeModal = () => {
    dispatch(switchWelcomeModal(false));
  };

  // Redirect to Home after unmount
  useEffect(() => () => history.push(`/${currentLanguageSlug}${Routes.Home.route}`), []);

  return (
    <BaseModal className="WelcomeModal" onCloseClick={closeWelcomeModal}>
      <>
        <BaseModalTitle>Welcome @{name}!</BaseModalTitle>
        <BaseModalText>Your account is active now</BaseModalText>
        <br />
        <BaseModalText>🎉&nbsp;&nbsp;&nbsp;🥳</BaseModalText>
      </>
    </BaseModal>
  );
};

export default WelcomeModal;
