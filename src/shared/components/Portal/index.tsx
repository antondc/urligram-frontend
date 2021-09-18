import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { isDomAvailable } from 'Tools/utils/dom/isDomAvailable';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  elementId?: string;
  className?: string;
}

export const RenderInPortal: React.FC<Props> = ({ children, elementId, className = '' }) => {
  if (!isDomAvailable) return <></>;

  const portalsElement = document.getElementById('Portals');
  const existingElement = document.getElementById(elementId);
  if (!!existingElement) {
    return createPortal(children, existingElement);
  }

  const newElement = document.createElement('div');
  !!elementId && newElement.setAttribute('id', elementId);
  newElement.setAttribute('class', 'Portal' + (!!className ? ` ${className}` : ''));

  useEffect(() => {
    portalsElement?.appendChild(newElement);

    return () => {
      portalsElement?.removeChild(newElement);
    };
  }, [children]);

  return createPortal(children, newElement);
};
