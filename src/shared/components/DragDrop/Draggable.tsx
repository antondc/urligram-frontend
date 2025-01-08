import React, { useEffect, useRef, useState } from 'react';

import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

import './Draggable.less';

interface Props {
  children: React.ReactElement;
  id: string | number;
}

const Draggable: React.FC<Props> = ({ children, id }) => {
  const elementRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    return combine(
      draggable({
        element: element,
        getInitialData: () => ({ id }),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      })
    );
  }, [id]);

  return (
    <div className={'Draggable' + (isDragging ? ' Draggable--isDragging' : '')} ref={elementRef}>
      {React.cloneElement(children, { isDragging })}
    </div>
  );
};

export default Draggable;
