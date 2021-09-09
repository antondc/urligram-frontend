import React from 'react';

import Cross from 'Assets/svg/cross.svg';

import './BaseModal2.ui.less';

interface Props {
  onCloseClick: () => void;
  className?: string;
}

export const BaseModal2: React.FC<Props> = ({ children, onCloseClick, className }) => (
  <div className={'BaseModal2' + (className ? ' ' + className : '')}>
    <div className="BaseModal2-container">
      <div className="BaseModal2-background" onClick={onCloseClick} />
      <div className="BaseModal2-content">
        <Cross className="BaseModal2-cross" onClick={onCloseClick} />
        {children}
      </div>
    </div>
  </div>
);
