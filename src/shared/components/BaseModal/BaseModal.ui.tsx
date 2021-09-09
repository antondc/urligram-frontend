import React from 'react';

import Cross from 'Assets/svg/cross.svg';

import './BaseModal.ui.less';

interface Props {
  onCloseClick: () => void;
  className?: string;
}

export const BaseModal: React.FC<Props> = ({ children, onCloseClick, className }) => (
  <div className={'BaseModal' + (className ? ' ' + className : '')}>
    <div className="BaseModal-container">
      <div className="BaseModal-background" onClick={onCloseClick} />
      <div className="BaseModal-content">
        <Cross className="BaseModal-cross" onClick={onCloseClick} />
        {children}
      </div>
    </div>
  </div>
);
