import React from 'react';
import LayoutContent from 'Common/LayoutContent';

import './BaseModal.less';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  onClick?: () => void;
}

const BaseModal: React.FC<Props> = ({ children, onClick }) => (
  <div className="BaseModal">
    <LayoutContent className="BaseModal-center">
      <div className="BaseModal-background" onClick={onClick} />
      <div className="BaseModal-content">{children}</div>
    </LayoutContent>
  </div>
);

export default BaseModal;
