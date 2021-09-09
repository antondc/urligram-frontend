import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { uiScreenMobileLock } from 'Modules/Ui/actions/uiScreenMobileLock';
import { uiScreenMobileUnLock } from 'Modules/Ui/actions/uiScreenMobileUnLock';
import { BaseModal2 as BaseModal2Ui } from './BaseModal2.ui';

export { BaseModalFooterLink } from './BaseModalFooterLink';
export { BaseModalText } from './BaseModalText';
export { BaseModalSection } from './BaseModalSection';
export { BaseModalTitle } from './BaseModalTitle';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  onCloseClick: () => void;
}

const BaseModal2: React.FC<Props> = ({ onCloseClick: onCloseClickCallback, children, className }) => {
  const dispatch = useDispatch();
  const [locked, setLocked] = useState<boolean>(false);

  const onCloseClick = () => {
    if (locked) return;

    dispatch(uiScreenMobileUnLock());
    onCloseClickCallback();
  };

  useEffect(() => {
    dispatch(uiScreenMobileLock());
  }, []);

  return (
    <BaseModal2Ui className={className} onCloseClick={onCloseClick}>
      {React.cloneElement(<>{children}</>, { setLocked })}
    </BaseModal2Ui>
  );
};

export default BaseModal2;
