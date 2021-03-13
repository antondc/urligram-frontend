import React from 'react';
import { useDispatch } from 'react-redux';

import Cross from 'Assets/svg/cross.svg';
import BaseModal from 'Components/BaseModal';
import { switchForgotPasswordModal } from 'Modules/Ui/actions/switchForgotPasswordModal';
import { Routes } from 'Router/routes';
import history from 'Services/History';
import { Border, Flex, H4, Hr, P, Span } from '@antoniodcorrea/components';

import './ForgotPasswordModal.less';

const ForgotPasswordModal: React.FC = () => {
  const dispatch = useDispatch();

  const closeForgotPasswordModal = () => {
    dispatch(switchForgotPasswordModal(false));
    history.push(Routes.Home.route);
  };

  return (
    <BaseModal onClick={closeForgotPasswordModal}>
      <Border className="ForgotPasswordModal" grow>
        <Cross className="ForgotPasswordModal-cross" onClick={closeForgotPasswordModal} />
        <Flex horizontal="center">
          <H4>We received your request</H4>
          <Hr size="normal" spacer />
          <P>
            <Span size="normal" bold>
              Please check your email
            </Span>
          </P>
          <Hr size="zero" spacer />
          <P>
            <Span size="normal" bold>
              ✉️&nbsp;&nbsp;&nbsp;🚀
            </Span>
          </P>
        </Flex>
      </Border>
    </BaseModal>
  );
};

export default ForgotPasswordModal;
