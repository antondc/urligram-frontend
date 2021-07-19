import React from 'react';

import Cross from 'Assets/svg/cross.svg';
import { Fade } from '../../vendor/components';

import './BaseModal2.less';

interface Props {
  mounted: boolean;
  onCloseClick: () => void;
}

export const BaseModal2: React.FC<Props> = ({ children, mounted, onCloseClick }) => (
  <Fade mounted={mounted} speed="fastest" position="fixed" appear>
    <div className="BaseModal2">
      <div className="BaseModal2-container">
        <div className="BaseModal2-background" onClick={onCloseClick} />
        <div className="BaseModal2-content">
          <Cross className="BaseModal2-cross" onClick={onCloseClick} />
          {children}
        </div>
      </div>
    </div>
  </Fade>
);
