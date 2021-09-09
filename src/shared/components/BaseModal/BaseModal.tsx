import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { uiScreenMobileLock } from 'Modules/Ui/actions/uiScreenMobileLock';
import { uiScreenMobileUnLock } from 'Modules/Ui/actions/uiScreenMobileUnLock';
import { BaseModal as BaseModalUi } from './BaseModal.ui';

export { BaseModalFooterLink } from './BaseModalFooterLink';
export { BaseModalText } from './BaseModalText';
export { BaseModalSection } from './BaseModalSection';
export { BaseModalTitle } from './BaseModalTitle';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  onCloseClick: () => void;
}

const BaseModal: React.FC<Props> = ({ onCloseClick: onCloseClickCallback, children, className }) => {
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
    <BaseModalUi className={className} onCloseClick={onCloseClick}>
      {React.cloneElement(<>{children}</>, { setLocked })}
    </BaseModalUi>
  );
};

export default BaseModal;
