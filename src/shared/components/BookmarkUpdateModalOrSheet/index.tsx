import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BaseModal from 'Components/BaseModal';
import BaseSheet from 'Components/BaseSheet';
import BookmarkUpdateForm from 'Components/BookmarkUpdateForm';
import { switchBookmarkUpdateModal } from 'Modules/Ui/actions/switchBookmarkUpdateModal';
import { uiScreenMobileLock } from 'Modules/Ui/actions/uiScreenMobileLock';
import { uiScreenMobileUnLock } from 'Modules/Ui/actions/uiScreenMobileUnLock';
import { selectUiBookmarkUpdateModalMounted } from 'Modules/Ui/selectors/selectUiBookmarkUpdateModalMounted';
import { selectUiScreenTypeIsMobile } from 'Modules/Ui/selectors/selectUiScreenTypeIsMobile';
import { Fade } from 'Vendor/components';

const BookmarkUpdateModalOrSheet: React.FC = () => {
  const dispatch = useDispatch();
  const uiScreenTypeIsMobile = useSelector(selectUiScreenTypeIsMobile);
  const bookmarkUpdateModalMounted = useSelector(selectUiBookmarkUpdateModalMounted);

  const onClose = () => {
    dispatch(uiScreenMobileUnLock());
    dispatch(switchBookmarkUpdateModal({ mounted: false }));
  };

  useEffect(() => {
    bookmarkUpdateModalMounted && dispatch(uiScreenMobileLock());
  }, [bookmarkUpdateModalMounted]);

  if (uiScreenTypeIsMobile) {
    return (
      <BaseSheet mounted={bookmarkUpdateModalMounted} onCloseClick={onClose}>
        <BookmarkUpdateForm closeModal={onClose} />
      </BaseSheet>
    );
  }

  return (
    <Fade mounted={bookmarkUpdateModalMounted} speed="fastest" position="fixed" appear>
      <BaseModal onCloseClick={onClose}>
        <BookmarkUpdateForm closeModal={onClose} />
      </BaseModal>
    </Fade>
  );
};

export default BookmarkUpdateModalOrSheet;
