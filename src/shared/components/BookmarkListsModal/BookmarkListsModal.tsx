import React from 'react';

import Cross from 'Assets/svg/cross.svg';
import BaseModal from 'Components/BaseModal';
import BookmarkLists from '../BookmarkLists';

import './BookmarkListsModal.less';

interface Props {
  bookmarkId: number;
  onCloseClick: () => void;
}

export const BookmarkListsModal: React.FC<Props> = ({ bookmarkId, onCloseClick }) => (
  <div className="BookmarkListsModal">
    <BaseModal>
      <div className="BookmarkListsModal-content">
        <Cross className="BookmarkListsModal-cross" onClick={onCloseClick} />
        <BookmarkLists bookmarkId={bookmarkId} />
      </div>
    </BaseModal>
  </div>
);

export default BookmarkListsModal;
