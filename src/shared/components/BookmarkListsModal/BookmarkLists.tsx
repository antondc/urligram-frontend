import React from 'react';

import BaseModal from 'Components/BaseModal';

import './BookmarkLists.less';

interface Props {
  bookmarkId: number;
  modalMounted: boolean;
  onCloseClick: () => void;
}

export const BookmarkLists: React.FC<Props> = ({ bookmarkId, modalMounted, onCloseClick }) => (
  <BaseModal onClick={onCloseClick}>
    <span className="BookmarkLists" id={`BookmarkLists-${bookmarkId}`}>
      MODAL MOUNTED
    </span>
  </BaseModal>
);

export default BookmarkLists;
