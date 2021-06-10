import React, { useEffect, useRef } from 'react';

import { createPopper } from '@popperjs/core';
import { Frame } from '../Frame';
import { Span } from '../Span';

import './Tooltip.less';

const DELAY_SLOW_SECONDS = 2;
const TIME_SHOWN_SECONDS = 3;

interface Props {
  content: string;
  parentElementId: string;
  placement?: 'top' | 'bottom' | 'right' | 'left';
  delay?: number; // In seconds
  timeShown?: number; // In seconds
}

export const Tooltip: React.FC<Props> = ({ content, parentElementId, delay, timeShown, placement = 'right' }) => {
  let MountDelayed;
  let UnMountDelayed;
  const tooltipElementRef = useRef(null);
  const computedDelay = delay === 0 ? 0 : delay || DELAY_SLOW_SECONDS;
  const computedTimeShown = timeShown === 0 ? 0 : timeShown || TIME_SHOWN_SECONDS;

  const unmountTooltip = () => {
    tooltipElementRef.current.removeAttribute('data-show');

    clearTimeout(MountDelayed);
    clearTimeout(UnMountDelayed);
  };

  const mountTooltip = () => {
    MountDelayed = setTimeout(() => {
      tooltipElementRef.current.setAttribute('data-show', '');
    }, computedDelay * 1000);

    UnMountDelayed = setTimeout(() => {
      unmountTooltip();
    }, computedDelay * 1000 + computedTimeShown * 1000);
  };

  useEffect(() => {
    const parentElement = document.getElementById(parentElementId);
    if (!parentElement) return;

    parentElement.addEventListener('mouseenter', mountTooltip);
    parentElement.addEventListener('mouseleave', unmountTooltip);

    return () => {
      parentElement.removeEventListener('mouseenter', mountTooltip);
      parentElement.removeEventListener('mouseleave', unmountTooltip);
    };
  });

  useEffect(() => {
    const parentElement = document.getElementById(parentElementId);

    createPopper(parentElement, tooltipElementRef.current, {
      placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
        // Important: to avoid creating scroll and resize listeners we need to pass this «modifier»
        // https://github.com/chakra-ui/chakra-ui/issues/2531
        {
          name: 'eventListeners',
          options: {
            scroll: false,
            resize: false,
          },
        },
      ],
    });
  }, [placement, parentElementId]);

  return (
    <div className="Tooltip" ref={tooltipElementRef} aria-describedby="tooltip">
      <Frame padding="small">
        <Span weight="semiBold">{content}</Span>
      </Frame>
      <div className="Tooltip-arrow" data-popper-arrow />
    </div>
  );
};

export default Tooltip;
