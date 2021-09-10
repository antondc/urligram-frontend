import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Cross from 'Assets/svg/cross.svg';
import { uiScreenMobileLock } from 'Modules/Ui/actions/uiScreenMobileLock';
import { uiScreenMobileUnLock } from 'Modules/Ui/actions/uiScreenMobileUnLock';
import { noop } from 'Tools/utils/general/noop';

import './BaseModal.less';

interface Props {
  children: React.ReactElement;
  className?: string;
  onCloseClick: () => void;
  onModalUnmount?: () => void;
}

const BaseModal: React.FC<Props> = ({
  onCloseClick: onCloseClickCallback,
  onModalUnmount: onModalUnmountCallback = noop,
  children,
  className,
}) => {
  const dispatch = useDispatch();
  // State available on children to avoid closing the modal on different situations
  const [locked, setLocked] = useState<boolean>(false);

  const onCloseClick = () => {
    if (locked) return;

    onCloseClickCallback();
    dispatch(uiScreenMobileUnLock());
  };

  useEffect(() => {
    dispatch(uiScreenMobileLock());

    return () => onModalUnmountCallback();
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
