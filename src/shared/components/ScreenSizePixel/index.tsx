import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { uiScreenTypeSet } from 'Modules/Ui/actions/uiScreenTypeSet';

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
        dispatch(uiScreenTypeSet('desktop'));
        break;
      case contentIsTablet:
        dispatch(uiScreenTypeSet('tablet'));
        break;
      case contentIsMobile:
        dispatch(uiScreenTypeSet('mobile'));
        break;

      default:
        break;
    }
  }, []);

  return <div className="ScreenSizePixel" id="ScreenSizePixel"></div>;
};

export default ScreenSizePixel;
