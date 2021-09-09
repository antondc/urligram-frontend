import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BaseModal, { BaseModalTitle } from 'Components/BaseModal';
import ListForm from 'Components/ListForm';
import { switchListModal } from 'Modules/Ui/actions/switchListModal';
import { selectUiListModal } from 'Modules/Ui/selectors/selectUiListModal';

import './ListModal.less';

const ListModal: React.FC = () => {
  const dispatch = useDispatch();
  const { listId } = useSelector(selectUiListModal);
  const [locked, setLocked] = useState<boolean>(false);
  const isUpdate = !!listId;

  const closeModal = () => {
    if (locked) return;
    dispatch(switchListModal({ mounted: false }));
  };

  return (
    <BaseModal className="ListModal" onCloseClick={closeModal}>
      <>
        <BaseModalTitle>{!!isUpdate ? 'Update List' : 'Create List'}</BaseModalTitle>
        <ListForm closeModal={closeModal} setLocked={setLocked} />
      </>
    </BaseModal>
  );
};

export default ListModal;
