import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { uiScreenMobileLock } from 'Modules/Ui/actions/uiScreenMobileLock';
import { uiScreenMobileUnLock } from 'Modules/Ui/actions/uiScreenMobileUnLock';
import { BaseSheet as BaseSheetUi } from './BaseSheet';

interface Props {
  mounted: boolean;
  onCloseClick: () => void;
}

export const BaseSheet: React.FC<Props> = ({ children, mounted, onCloseClick: onCloseClickCallback }) => {
  const dispatch = useDispatch();

  const onCloseClick = () => {
    dispatch(uiScreenMobileUnLock());
    dispatch(onCloseClickCallback());
  };

  useEffect(() => {
    dispatch(uiScreenMobileLock());
  }, []);

  return (
    <BaseSheetUi onCloseClick={onCloseClick} mounted={mounted}>
      {children}
    </BaseSheetUi>
  );
};

export default BaseSheet;
