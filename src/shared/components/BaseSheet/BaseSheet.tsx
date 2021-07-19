import React from 'react';

import Cross from 'Assets/svg/cross.svg';
import { AnimateSheet } from 'Vendor/components';

import './BaseSheet.less';

interface Props {
  mounted: boolean;
  onCloseClick: () => void;
}

export const BaseSheet: React.FC<Props> = ({ children, onCloseClick, mounted }) => (
  <AnimateSheet className="Layout-animateSheetMobile" mounted={mounted}>
    <div className="BaseSheet">
      <Cross className="BaseSheet-cross" onClick={onCloseClick} />
      {children}
    </div>
  </AnimateSheet>
);

export default BaseSheet;
