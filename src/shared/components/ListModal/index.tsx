import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cross from 'Assets/svg/cross.svg';
import BaseModal from 'Components/BaseModal';
import ListForm from 'Components/ListForm';
import { switchListModal } from 'Modules/Ui/actions/switchListModal';
import { selectUiListModal } from 'Modules/Ui/selectors/selectUiListModal';
import { Flex, Frame, H3, Hr } from 'Vendor/components';

import './ListModal.less';

const ListModal: React.FC = () => {
  const dispatch = useDispatch();
  const { listId } = useSelector(selectUiListModal);
  const [modalLocked, setModalLocked] = useState<boolean>(false);
  const isUpdate = !!listId;

  const closeModal = () => {
    if (modalLocked) return;
    dispatch(switchListModal({ mounted: false }));
  };

  return (
    <BaseModal>
      <Frame className="ListModal" grow>
        <Cross className="ListModal-cross" onClick={closeModal} />
        <Flex horizontal="center">
          <H3>{!!isUpdate ? 'Update List' : 'Create List'}</H3>
        </Flex>
        <Hr spacer size="small" />
        <ListForm closeModal={closeModal} setModalLocked={setModalLocked} />
        <Hr spacer size="big" />
      </Frame>
    </BaseModal>
  );
};

export default ListModal;
