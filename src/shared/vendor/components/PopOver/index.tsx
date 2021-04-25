import React, { useEffect } from 'react';

import { createPopper } from '@popperjs/core';

import './PopOver.less';

interface Props {
  elementId: string;
  placement?:
    | 'top'
    | 'bottom'
    | 'right'
    | 'left'
    | 'auto'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'right-start'
    | 'right-end'
    | 'left-start'
    | 'left-end';
}

export const PopOver: React.FC<Props> = ({ elementId, placement = 'auto', children }) => {
  useEffect(() => {
    const poperElement = document.getElementById(`PopOver-${elementId}`);
    poperElement?.setAttribute('data-show', '');
  }, []);

  useEffect(() => {
    const parentElement = document.getElementById(elementId);
    const poperElement = document.getElementById(`PopOver-${elementId}`);

    createPopper(parentElement, poperElement, {
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
  }, []);

  return (
    <div className="PopOver" id={`PopOver-${elementId}`} aria-describedby="PopOver">
      {children}
    </div>
  );
};

export default PopOver;
