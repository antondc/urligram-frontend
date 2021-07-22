import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { uiScreenMobileLock } from 'Modules/Ui/actions/uiScreenMobileLock';
import { uiScreenMobileUnLock } from 'Modules/Ui/actions/uiScreenMobileUnLock';
import { BaseModal2 as BaseModal2Ui } from './BaseModal2';

import './BaseModal2.less';

interface Props {
  children: React.ReactElement;
  mounted: boolean;
  onCloseClick: () => void;
}

const BaseModal2: React.FC<Props> = ({ mounted, onCloseClick: onCloseClickCallback, children }) => {
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
    <BaseModal2Ui mounted={mounted} onCloseClick={onCloseClick}>
      {React.cloneElement(children, { setLocked })}
    </BaseModal2Ui>
  );
};

export default BaseModal2;
