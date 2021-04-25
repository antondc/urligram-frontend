import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cross from 'Assets/svg/cross.svg';
import BaseModal from 'Components/BaseModal';
import ListForm from 'Components/ListForm';
import { switchListModal } from 'Modules/Ui/actions/switchListModal';
import { selectUiListModal } from 'Modules/Ui/selectors/selectUiListModal';
import { Border, Flex, H3, Hr } from 'Vendor/components';

import './ListModal.less';

const ListModal: React.FC = () => {
  const dispatch = useDispatch();
  const { listId } = useSelector(selectUiListModal);
  const isUpdate = !!listId;

  const closeModal = () => {
    dispatch(switchListModal({ mounted: false }));
  };

  return (
    <BaseModal onClick={closeModal}>
      <Border className="ListModal" grow>
        <Cross className="ListModal-cross" onClick={closeModal} />
        <Flex horizontal="center">
          <H3>{!!isUpdate ? 'Update List' : 'Create List'}</H3>
        </Flex>
        <Hr spacer size="small" />
        <ListForm closeModal={closeModal} />
        <Hr spacer size="big" />
      </Border>
    </BaseModal>
  );
};

export default ListModal;
