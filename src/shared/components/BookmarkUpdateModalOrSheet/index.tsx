import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BaseModal2 from 'Components/BaseModal2';
import BaseSheet from 'Components/BaseSheet';
import BookmarkUpdateForm from 'Components/BookmarkUpdateForm';
import { switchBookmarkUpdateModal } from 'Modules/Ui/actions/switchBookmarkUpdateModal';
import { uiScreenMobileLock } from 'Modules/Ui/actions/uiScreenMobileLock';
import { uiScreenMobileUnLock } from 'Modules/Ui/actions/uiScreenMobileUnLock';
import { selectUiBookmarkUpdateModalMounted } from 'Modules/Ui/selectors/selectUiBookmarkUpdateModalMounted';
import { selectUiScreenTypeIsMobile } from 'Modules/Ui/selectors/selectUiScreenTypeIsMobile';

export const BookmarkUpdateModalOrSheet: React.FC = () => {
  const dispatch = useDispatch();
  const uiScreenTypeIsMobile = useSelector(selectUiScreenTypeIsMobile);
  const bookmarkUpdateModalMounted = useSelector(selectUiBookmarkUpdateModalMounted);

  const onCloseClick = () => {
    dispatch(uiScreenMobileUnLock());
    dispatch(switchBookmarkUpdateModal({ mounted: false }));
  };

  useEffect(() => {
    bookmarkUpdateModalMounted && dispatch(uiScreenMobileLock());
  }, [bookmarkUpdateModalMounted]);

  if (uiScreenTypeIsMobile) {
    return (
      <BaseSheet mounted={bookmarkUpdateModalMounted} onCloseClick={onCloseClick}>
        <BookmarkUpdateForm />
      </BaseSheet>
    );
  }

  return (
    <BaseModal2 mounted={bookmarkUpdateModalMounted} onCloseClick={onCloseClick}>
      <BookmarkUpdateForm />
    </BaseModal2>
  );
};

export default BookmarkUpdateModalOrSheet;
