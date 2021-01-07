import React, { useEffect, useRef, useState } from 'react';

import { Border, Fade, Span } from '@antoniodcorrea/components';

import './Tooltip.less';

interface Props {
  content: string;
  parentElementId: string;
}

const TIME_OUT_SLOW = 2000;
let myTimeOut;

export const Tooltip: React.FC<Props> = ({ content, parentElementId }) => {
  const tooltipRef = useRef(null);
  const [mounted, setMounted] = useState<boolean>(false);

  const mountTooltip = () => {
    myTimeOut = setTimeout(() => {
      setMounted(true);
    }, TIME_OUT_SLOW);
  };

  const unmountTooltip = () => {
    setMounted(false);
    clearTimeout(myTimeOut);
  };

  useEffect(() => {
    const parentElement = document.getElementById(parentElementId);
    const parentBoundingClientRect = parentElement.getBoundingClientRect();
    const parentBottom = String(parentBoundingClientRect.bottom - 20) + 'px';
    const parentRight = parentBoundingClientRect.right;
    const parentWidth = parentBoundingClientRect.width;
    const parentFinalWidth = String(parentRight - parentWidth + 13) + 'px';
    tooltipRef.current.style.top = parentBottom;
    tooltipRef.current.style.right = parentFinalWidth;
  }, []);

  useEffect(() => {
    const parentElement = document.getElementById(parentElementId);
    parentElement.addEventListener('mouseenter', mountTooltip);

    return window.removeEventListener('mouseenter', mountTooltip);
  }, []);

  useEffect(() => {
    const parentElement = document.getElementById(parentElementId);
    parentElement.addEventListener('mouseleave', unmountTooltip);

    return window.removeEventListener('mouseenter', unmountTooltip);
  }, []);

  return (
    <div ref={tooltipRef} className="Tooltip">
      <Fade mounted={mounted}>
        <Border className="Tooltip-border" data-test-id="Tooltip" padding="small">
          <Span bold>{content}</Span>
        </Border>
      </Fade>
    </div>
  );
};

export default Tooltip;
