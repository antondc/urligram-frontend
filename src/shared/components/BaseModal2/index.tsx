import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { uiScreenMobileLock } from 'Modules/Ui/actions/uiScreenMobileLock';
import { uiScreenMobileUnLock } from 'Modules/Ui/actions/uiScreenMobileUnLock';
import { BaseModal2 as BaseModal2Ui } from './BaseModal2';

import './BaseModal2.less';

interface Props {
  mounted: boolean;
  onCloseClick: () => void;
}

const BaseModal2: React.FC<Props> = ({ mounted, onCloseClick: onCloseClickCallback, children }) => {
  const dispatch = useDispatch();

  const onCloseClick = () => {
    dispatch(uiScreenMobileUnLock());
    dispatch(onCloseClickCallback());
  };

  useEffect(() => {
    dispatch(uiScreenMobileLock());
  }, []);

  return (
    <BaseModal2Ui mounted={mounted} onCloseClick={onCloseClick}>
      {children}
    </BaseModal2Ui>
  );
};

export default BaseModal2;
