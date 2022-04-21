import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import A from 'Components/A';
import BaseModal, { BaseModalText, BaseModalTitle } from 'Components/BaseModal';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { switchSignUpDisabledModal } from 'Modules/Ui/actions/switchSignUpDisabledModal';
import { DELAY_FAST_MS } from 'Root/src/shared/constants';
import history from 'Services/History';
import { getConfigByEnv } from 'Tools/utils/environment/getConfigByEnv';

import './SignUpDisabledModal.less';

const SignUpDisabledModal: React.FC = () => {
  const dispatch = useDispatch();
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const contactEmail = getConfigByEnv('CONTACT_EMAIL');

  const closeSignUpDisabledModal = () => {
    dispatch(switchSignUpDisabledModal(false));

    setTimeout(() => history.push(`/${currentLanguageSlug}`), DELAY_FAST_MS);
  };

  return (
    <BaseModal className="SignUpDisabledModal" onCloseClick={closeSignUpDisabledModal}>
      <>
        <BaseModalTitle>Sign up disabled</BaseModalTitle>
        <BaseModalText>Currently woprs is in a beta phase, but we will enable new sign ups soon.</BaseModalText>
        <BaseModalText>
          If you want information contact us at{' '}
          <A className="Docs-link" href={`mailto:${contactEmail}`} styled={false}>
            {contactEmail}
          </A>
          .
        </BaseModalText>
        <BaseModalText>⚙️&nbsp;&nbsp;&nbsp;🚀</BaseModalText>
      </>
    </BaseModal>
  );
};

export default SignUpDisabledModal;
