import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Cross from 'Assets/svg/cross.svg';
import BaseModal from 'Components/BaseModal';
import BookmarkCreateForm from 'Components/BookmarkCreateForm';
import { switchBookmarkCreateModal } from 'Modules/Ui/actions/switchBookmarkCreateModal';
import { Border, Flex, H3, Hr } from 'Vendor/components';

import './BookmarkCreateModal.less';

const BookmarkCreateModal: React.FC = () => {
  const dispatch = useDispatch();
  const [modalLocked, setModalLocked] = useState<boolean>(false);

  const closeModal = () => {
    if (!!modalLocked) return;
    dispatch(switchBookmarkCreateModal(false));
  };

  return (
    <BaseModal onClick={closeModal}>
      <Border className="BookmarkCreateModal" grow>
        <Cross className="BookmarkCreateModal-cross" onClick={closeModal} />
        <Flex horizontal="center">
          <H3>Add bookmark</H3>
        </Flex>
        <Hr spacer size="small" />
        <BookmarkCreateForm closeModal={closeModal} setModalLocked={setModalLocked} />
        <Hr spacer size="big" />
      </Border>
    </BaseModal>
  );
};

export default BookmarkCreateModal;
