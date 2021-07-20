import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cross from 'Assets/svg/cross.svg';
import BaseModal from 'Components/BaseModal';
import ListForm from 'Components/ListForm';
import { switchListModal } from 'Modules/Ui/actions/switchListModal';
import { selectUiListModal } from 'Modules/Ui/selectors/selectUiListModal';
import { Flex, H3, Hr } from 'Vendor/components';

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
    <BaseModal>
      <div className="ListModal">
        <Cross className="ListModal-cross" onClick={closeModal} />
        <Flex horizontal="center">
          <H3>{!!isUpdate ? 'Update List' : 'Create List'}</H3>
        </Flex>
        <Hr spacer size="small" />
        <ListForm closeModal={closeModal} setLocked={setLocked} />
        <Hr spacer size="big" />
      </div>
    </BaseModal>
  );
};

export default ListModal;
