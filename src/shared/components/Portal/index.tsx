import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { isDomAvailable } from 'Tools/utils/dom/isDomAvailable';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  elementId?: string;
  className?: string;
}

export const RenderInPortal: React.FC<Props> = ({ children, elementId, className = '' }) => {
  const domAvailable = isDomAvailable();

  if (!domAvailable) return <></>;

  const existingElement = document.getElementById(elementId);
  if (!!existingElement) {
    return createPortal(children, existingElement);
  }

  const newElement = document.createElement('div');
  !!elementId && newElement.setAttribute('id', elementId);
  newElement.setAttribute('class', 'Portal' + (!!className ? ` ${className}` : ''));

  useEffect(() => {
    document.body.appendChild(newElement);

    return () => {
      document.body.removeChild(newElement);
    };
  }, [children]);

  return createPortal(children, newElement);
};
