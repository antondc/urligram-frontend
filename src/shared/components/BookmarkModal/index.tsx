import React from 'react';
import { useDispatch } from 'react-redux';

import Cross from 'Assets/svg/cross.svg';
import BaseModal from 'Components/BaseModal';
import LoginForm from 'Components/LoginForm';
import { switchBookmarkModal } from 'Modules/Ui/actions/switchBookmarkModal';
import { Border, Flex, H3, Hr } from '@antoniodcorrea/components';

import './BookmarkModal.less';

const BookmarkModal: React.FC = () => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(switchBookmarkModal(false));
  };

  return (
    <BaseModal onClick={closeModal}>
      <Border className="BookmarkModal" grow>
        <Cross className="BookmarkModal-cross" onClick={closeModal} />
        <Flex horizontal="center">
          <H3>Add bookmark</H3>
        </Flex>
        <Hr spacer size="small" />
        <LoginForm />
        <Hr spacer size="big" />
      </Border>
    </BaseModal>
  );
};

export default BookmarkModal;
