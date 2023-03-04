import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { uiScreenTypeSet } from 'Modules/Ui/actions/uiScreenTypeSet';
import { ScreenType } from 'Modules/Ui/ui.types';

import './ScreenSizePixel.less';

const ScreenSizePixel: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const element = window.document.getElementById('ScreenSizePixel');
    const styleBefore = window.getComputedStyle(element, '::before');
    const content = styleBefore?.content;
    const contentIsDesktop = content?.includes('desktop');
    const contentIsTablet = content?.includes('tablet');
    const contentIsMobile = content?.includes('mobile');

    switch (true) {
      case contentIsDesktop:
        dispatch(uiScreenTypeSet(ScreenType.Desktop));

        break;
      case contentIsTablet:
        dispatch(uiScreenTypeSet(ScreenType.Tablet));

        break;
      case contentIsMobile:
        dispatch(uiScreenTypeSet(ScreenType.Mobile));

        break;

      default:
        break;
    }
  }, []);

  return <div className="ScreenSizePixel" id="ScreenSizePixel"></div>;
};

export default ScreenSizePixel;
