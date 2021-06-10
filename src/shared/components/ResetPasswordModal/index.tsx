import React from 'react';
import { useDispatch } from 'react-redux';

import Cross from 'Assets/svg/cross.svg';
import BaseModal from 'Components/BaseModal';
import { switchResetPasswordModal } from 'Modules/Ui/actions/switchResetPasswordModal';
import { Routes } from 'Router/routes';
import history from 'Services/History';
import { Flex, Frame, H4, Hr, P, Span } from 'Vendor/components';

import './ResetPasswordModal.less';

const ResetPasswordModal: React.FC = () => {
  const dispatch = useDispatch();

  const closeResetPasswordModal = () => {
    dispatch(switchResetPasswordModal(false));
    history.push(Routes.Home.route);
  };

  return (
    <BaseModal onClick={closeResetPasswordModal}>
      <Frame className="ResetPasswordModal" grow>
        <Cross className="ResetPasswordModal-cross" onClick={closeResetPasswordModal} />
        <Flex horizontal="center">
          <H4>Password reset success!</H4>
          <Hr size="normal" spacer />
          <P>
            <Span size="normal" weight="semiBold">
              Save it in a safe place
            </Span>
          </P>
          <Hr size="zero" spacer />
          <P>
            <Span size="normal" weight="semiBold">
              🎉&nbsp;&nbsp;&nbsp;🥳
            </Span>
          </P>
        </Flex>
      </Frame>
    </BaseModal>
  );
};

export default ResetPasswordModal;
