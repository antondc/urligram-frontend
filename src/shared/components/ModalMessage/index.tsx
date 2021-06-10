import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Cross from 'Assets/svg/cross.svg';
import BaseModal from 'Components/BaseModal';
import { switchMessageModal } from 'Modules/Ui/actions/switchMessageModal';
import { Button, Flex, Frame, Hr, Span } from 'Vendor/components';

import './ModalMessage.less';

interface Props {
  message: string;
  switchMessageModal: () => void;
}

const ModalMessage: React.FC<Props> = ({ message, switchMessageModal }) => (
  <BaseModal onClick={switchMessageModal}>
    <Frame className="ModalMessage" grow>
      <Cross className="ModalMessage-cross" onClick={switchMessageModal} />
      <Span className="ModalMessage-message" weight="semiBold">
        {message}
      </Span>
      <Hr spacer size="big" />
      <Flex horizontal="center">
        <Button text="Submit" onClick={switchMessageModal} />
      </Flex>
    </Frame>
  </BaseModal>
);

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps, {
  switchMessageModal,
})(ModalMessage);
