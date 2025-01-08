import React, { useEffect, useRef, useState } from 'react';

import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

interface Props {
  children: React.ReactElement;
  id: string | number;
}

const Droppable: React.FC<Props> = ({ children, id }) => {
  const elementRef = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    return dropTargetForElements({
      element: element,
      onDragStart: () => setIsDraggedOver(true),
      onDragEnter: () => {
        console.log('onDragEnterSidebar');

        setIsDraggedOver(true);
      },
      onDragLeave: () => {
        console.log('onDragLeaveSidebar');

        setIsDraggedOver(false);
      },
      onDrop: () => setIsDraggedOver(false),
      getData: () => ({ id }),
    });
  }, [id]);

  return <div ref={elementRef}>{React.cloneElement(children, { isDraggedOver })}</div>;
};

export default Droppable;
