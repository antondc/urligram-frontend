import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BaseModal2 from 'Components/BaseModal2';
import BaseSheet from 'Components/BaseSheet';
import BookmarkCreateForm from 'Components/BookmarkCreateForm';
import { switchBookmarkCreateModal } from 'Modules/Ui/actions/switchBookmarkCreateModal';
import { uiScreenMobileLock } from 'Modules/Ui/actions/uiScreenMobileLock';
import { uiScreenMobileUnLock } from 'Modules/Ui/actions/uiScreenMobileUnLock';
import { selectUiBookmarkCreateModalMounted } from 'Modules/Ui/selectors/selectUiBookmarkCreateModalMounted';
import { selectUiScreenTypeIsMobile } from 'Modules/Ui/selectors/selectUiScreenTypeIsMobile';

export const BookmarkCreateModalOrSheet: React.FC = () => {
  const dispatch = useDispatch();
  const uiScreenTypeIsMobile = useSelector(selectUiScreenTypeIsMobile);
  const bookmarkCreateModalMounted = useSelector(selectUiBookmarkCreateModalMounted);

  const onCloseClick = () => {
    dispatch(uiScreenMobileUnLock());
    dispatch(switchBookmarkCreateModal(false));
  };

  useEffect(() => {
    dispatch(uiScreenMobileLock());
  }, []);

  if (uiScreenTypeIsMobile) {
    return (
      <BaseSheet mounted={bookmarkCreateModalMounted} onCloseClick={onCloseClick}>
        <BookmarkCreateForm closeModal={onCloseClick} />
      </BaseSheet>
    );
  }

  return (
    <BaseModal2 mounted={bookmarkCreateModalMounted} onCloseClick={onCloseClick}>
      <BookmarkCreateForm closeModal={onCloseClick} />
    </BaseModal2>
  );
};

export default BookmarkCreateModalOrSheet;
