import React from 'react';

import './BaseModal.less';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  onClick?: () => void;
}

const BaseModal: React.FC<Props> = ({ children, onClick }) => (
  <div className="BaseModal">
    <div className="BaseModal-container">
      <div className="BaseModal-background" onClick={onClick} />
      <div className="BaseModal-content">{children}</div>
    </div>
  </div>
);

export default BaseModal;
