import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { uiScreenMobileLock } from 'Modules/Ui/actions/uiScreenMobileLock';
import { uiScreenMobileUnLock } from 'Modules/Ui/actions/uiScreenMobileUnLock';
import { BaseSheet as BaseSheetUi } from './BaseSheet';

interface Props {
  children: React.ReactElement;
  mounted: boolean;
  onCloseClick: () => void;
}

const BaseSheet: React.FC<Props> = ({ children, mounted, onCloseClick: onCloseClickCallback }) => {
  const dispatch = useDispatch();
  const [locked, setLocked] = useState<boolean>(false);

  const onCloseClick = () => {
    if (locked) return;

    dispatch(uiScreenMobileUnLock());
    onCloseClickCallback();
  };

  useEffect(() => {
    mounted && dispatch(uiScreenMobileLock());
  }, [mounted]);

  return (
    <BaseSheetUi onCloseClick={onCloseClick} mounted={mounted}>
      {React.cloneElement(children, { setLocked })}
    </BaseSheetUi>
  );
};

export default BaseSheet;
