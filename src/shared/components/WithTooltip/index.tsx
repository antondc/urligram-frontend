import React, { useEffect, useRef, useState } from 'react';

import { Border, Fade, Span } from '@antoniodcorrea/components';

import './WithTooltip.less';

const TIME_OUT_SLOW = 2;

interface Props {
  content: string;
  parentElementId: string;
  timeOut?: number; // In seconds
}

export const WithTooltip: React.FC<Props> = ({ content, parentElementId, timeOut = TIME_OUT_SLOW, children }) => {
  let myTimeOut;
  const WithTooltipRef = useRef(null);

  const [mounted, setMounted] = useState<boolean>(false);

  const mountWithTooltip = () => {
    myTimeOut = setTimeout(() => {
      setMounted(true);
    }, timeOut * 1000);
  };

  const unmountWithTooltip = () => {
    setMounted(false);
    clearTimeout(myTimeOut);
  };

  useEffect(() => {
    const parentElement = document.getElementById(parentElementId);
    if (!parentElement) return;

    parentElement.addEventListener('mouseenter', mountWithTooltip);

    return window.removeEventListener('mouseenter', mountWithTooltip);
  }, []);

  useEffect(() => {
    const parentElement = document.getElementById(parentElementId);
    if (!parentElement) return;

    parentElement.addEventListener('mouseleave', unmountWithTooltip);

    return window.removeEventListener('mouseenter', unmountWithTooltip);
  }, []);

  return (
    <div className="WithTooltip">
      {children}
      <div ref={WithTooltipRef} className="WithTooltip-content">
        <Fade mounted={mounted}>
          <Border className="WithTooltip-border" data-test-id="WithTooltip" padding="small">
            <Span bold>{content}</Span>
          </Border>
        </Fade>
      </div>
    </div>
  );
};

export default WithTooltip;
