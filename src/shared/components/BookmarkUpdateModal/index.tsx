import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Cross from 'Assets/svg/cross.svg';
import BaseModal from 'Components/BaseModal';
import BookmarkUpdateForm from 'Components/BookmarkUpdateForm';
import { switchBookmarkUpdateModal } from 'Modules/Ui/actions/switchBookmarkUpdateModal';
import { Flex, H3 } from 'Vendor/components';

import './BookmarkUpdateModal.less';

const BookmarkUpdateModal: React.FC = () => {
  const dispatch = useDispatch();
  const [modalLocked, setModalLocked] = useState<boolean>(false);

  const closeModal = () => {
    if (modalLocked) return;
    dispatch(switchBookmarkUpdateModal({ mounted: false }));
  };

  return (
    <BaseModal>
      <div className="BookmarkUpdateModal">
        <Cross className="BookmarkUpdateModal-cross" onClick={closeModal} />
        <Flex horizontal="center">
          <H3>Edit bookmark</H3>
        </Flex>
        <BookmarkUpdateForm closeModal={closeModal} setModalLocked={setModalLocked} />
      </div>
    </BaseModal>
  );
};

export default BookmarkUpdateModal;
