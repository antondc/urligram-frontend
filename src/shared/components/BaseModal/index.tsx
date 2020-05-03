import React from 'react';
import LayoutContent from 'Common/LayoutContent';

import './BaseModal.less';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const BaseModal: React.FC<Props> = ({ children }) => (
  <div className="BaseModal">
    <LayoutContent className="BaseModal-center">
      <div className="BaseModal-content">{children}</div>
    </LayoutContent>
  </div>
);

export default BaseModal;
