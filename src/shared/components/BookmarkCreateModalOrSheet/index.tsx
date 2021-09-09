import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BaseModal from 'Components/BaseModal';
import BaseSheet from 'Components/BaseSheet';
import BookmarkCreateForm from 'Components/BookmarkCreateForm';
import { switchBookmarkCreateModal } from 'Modules/Ui/actions/switchBookmarkCreateModal';
import { uiScreenMobileLock } from 'Modules/Ui/actions/uiScreenMobileLock';
import { uiScreenMobileUnLock } from 'Modules/Ui/actions/uiScreenMobileUnLock';
import { selectUiBookmarkCreateModalMounted } from 'Modules/Ui/selectors/selectUiBookmarkCreateModalMounted';
import { selectUiScreenTypeIsMobile } from 'Modules/Ui/selectors/selectUiScreenTypeIsMobile';
import { Fade } from 'Vendor/components';

export const BookmarkCreateModalOrSheet: React.FC = () => {
  const dispatch = useDispatch();
  const uiScreenTypeIsMobile = useSelector(selectUiScreenTypeIsMobile);
  const bookmarkCreateModalMounted = useSelector(selectUiBookmarkCreateModalMounted);

  const onCloseClick = () => {
    dispatch(uiScreenMobileUnLock());
    dispatch(switchBookmarkCreateModal(false));
  };

  useEffect(() => {
    bookmarkCreateModalMounted && dispatch(uiScreenMobileLock());
  }, [bookmarkCreateModalMounted]);

  if (uiScreenTypeIsMobile) {
    return (
      <BaseSheet mounted={bookmarkCreateModalMounted} onCloseClick={onCloseClick}>
        <BookmarkCreateForm closeModal={onCloseClick} />
      </BaseSheet>
    );
  }

  return (
    <Fade mounted={bookmarkCreateModalMounted} speed="fastest" position="fixed" appear>
      <BaseModal onCloseClick={onCloseClick}>
        <BookmarkCreateForm closeModal={onCloseClick} />
      </BaseModal>
    </Fade>
  );
};

export default BookmarkCreateModalOrSheet;
