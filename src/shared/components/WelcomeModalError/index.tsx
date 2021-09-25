import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BaseModal, { BaseModalText, BaseModalTitle } from 'Components/BaseModal';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { switchWelcomeModalError } from 'Modules/Ui/actions/switchWelcomeModalError';
import { Routes } from 'Router/routes';
import history from 'Services/History';

import './WelcomeModalError.less';

const WelcomeModalError: React.FC = () => {
  const dispatch = useDispatch();
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);

  const closeWelcomeModalError = () => {
    dispatch(switchWelcomeModalError(false));
  };

  // Redirect to Home after unmount
  useEffect(() => () => history.push(`/${currentLanguageSlug}${Routes.Home.route}`), []);

  return (
    <BaseModal className="WelcomeModalError" onCloseClick={closeWelcomeModalError}>
      <>
        <BaseModalTitle>Link not valid</BaseModalTitle>
        <BaseModalText>We couldnt activate your account</BaseModalText>
      </>
    </BaseModal>
  );
};

export default WelcomeModalError;
