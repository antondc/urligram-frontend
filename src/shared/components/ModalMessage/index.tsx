import React from 'react';
import { useDispatch } from 'react-redux';

import BaseModal, { BaseModalText, BaseModalTitle } from 'Components/BaseModal';
import { switchMessageModal } from 'Modules/Ui/actions/switchMessageModal';
import { Button2 } from 'Vendor/components';

import './ModalMessage.less';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  title: string;
}

const ModalMessage: React.FC<Props> = ({ children, title }) => {
  const dispatch = useDispatch();

  const onCloseOrSubmitClick = () => {
    dispatch(switchMessageModal());
  };

  return (
    <BaseModal className="ModalMessage" onCloseClick={onCloseOrSubmitClick}>
      <BaseModalTitle>{title}</BaseModalTitle>
      <BaseModalText>{children}</BaseModalText>
      <Button2 className="ModalMessage-submit" text="Submit" onClick={onCloseOrSubmitClick} grow />
    </BaseModal>
  );
};

export default ModalMessage;
