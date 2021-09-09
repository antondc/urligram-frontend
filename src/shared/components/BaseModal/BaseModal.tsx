import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Cross from 'Assets/svg/cross.svg';
import { uiScreenMobileLock } from 'Modules/Ui/actions/uiScreenMobileLock';
import { uiScreenMobileUnLock } from 'Modules/Ui/actions/uiScreenMobileUnLock';

export { BaseModalFooterLink } from './BaseModalFooterLink';
export { BaseModalText } from './BaseModalText';
export { BaseModalFooter } from './BaseModalFooter';
export { BaseModalTitle } from './BaseModalTitle';

import './BaseModal.less';

interface Props {
  children: React.ReactElement;
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
    <div className={'BaseModal' + (className ? ' ' + className : '')}>
      <div className="BaseModal-container">
        <div className="BaseModal-background" onClick={onCloseClick} />
        <div className="BaseModal-content">
          <Cross className="BaseModal-cross" onClick={onCloseClick} />
          {React.cloneElement(children, { setLocked })}
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
