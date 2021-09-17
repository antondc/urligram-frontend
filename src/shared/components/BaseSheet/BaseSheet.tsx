import React from 'react';

import Cross from 'Assets/svg/cross.svg';
import { RenderInPortal } from 'Components/Portal';
import { AnimateSheet } from '@antoniodcorrea/components';

import './BaseSheet.less';

interface Props {
  mounted: boolean;
  onCloseClick: () => void;
}

export const BaseSheet: React.FC<Props> = ({ children, onCloseClick, mounted }) => (
  <RenderInPortal elementId="Layout-animateSheetMobile">
    <AnimateSheet className="Layout-animateSheetMobile" mounted={mounted}>
      <div className="BaseSheet">
        <Cross className="BaseSheet-cross" onClick={onCloseClick} />
        {children}
      </div>
    </AnimateSheet>
  </RenderInPortal>
);
