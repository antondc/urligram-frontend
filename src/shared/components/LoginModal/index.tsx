import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Cross from 'Assets/svg/cross.svg';
import BaseModal from 'Components/BaseModal';
import LoginForm from 'Components/LoginForm';
import { logIn } from 'Modules/Session/actions/logIn';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { Border, Flex, H3, Hr } from '@antoniodcorrea/components';

import './LoginModal.less';

interface Props {
  switchLoginModal: (mount: boolean) => void;
}

const LoginModal: React.FC<Props> = ({ switchLoginModal }) => (
  <BaseModal onClick={() => switchLoginModal(false)}>
    <Border className="LoginModal" grow>
      <Cross className="LoginModal-cross" onClick={() => switchLoginModal(false)} />
      <Flex horizontal="center">
        <H3>Log in</H3>
      </Flex>
      <Hr spacer size="small" />
      <LoginForm />
    </Border>
  </BaseModal>
);

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps, {
  switchLoginModal,
  logIn,
})(LoginModal);
