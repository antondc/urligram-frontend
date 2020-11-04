import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Cross from 'Assets/svg/cross.svg';
import { switchMessageModal } from 'Modules/Ui/actions/switchMessageModal';
import Border from 'Ui/Border';
import Button from 'Ui/Button';
import Flex from '../../ui/Flex';
import Hr from '../../ui/Hr';
import Span from '../../ui/Span';
import BaseModal from '../BaseModal';

import './ModalMessage.less';

interface Props {
  message: string;
  switchMessageModal: () => void;
}

const ModalMessage: React.FC<Props> = ({ message, switchMessageModal }) => (
  <BaseModal onClick={switchMessageModal}>
    <Border className="ModalMessage" grow>
      <Cross className="ModalMessage-cross" onClick={switchMessageModal} />
      <Span className="ModalMessage-message" bold>
        {message}
      </Span>
      <Hr type="spacer" size="big" />
      <Flex horizontal="center">
        <Button text="Submit" onClick={switchMessageModal} />
      </Flex>
    </Border>
  </BaseModal>
);

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps, {
  switchMessageModal,
})(ModalMessage);
