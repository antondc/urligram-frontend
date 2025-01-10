import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { preserveOffsetOnSource } from '@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';

import './Draggable.less';

interface Props {
  children: React.ReactElement;
  id: string | number;
}

export enum CardState {
  IDDLE = 'iddle',
  DRAGGING = 'dragging',
  PREVIEW = 'preview',
}

const Draggable: React.FC<Props> = ({ children, id }) => {
  const elementRef = useRef(null);
  const [cardState, setCardState] = useState<CardState>(CardState.IDDLE);
  const [containerState, setContainerState] = useState<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    return combine(
      draggable({
        element: element,
        getInitialData: () => ({ id }),
        onDragStart: () => setCardState(CardState.DRAGGING),
        onDrop: () => setCardState(CardState.IDDLE),
        onGenerateDragPreview({ nativeSetDragImage, location }) {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: preserveOffsetOnSource({ element, input: location.current.input }),
            render({ container }) {
              setContainerState(container);
              setCardState(CardState.PREVIEW);
            },
          });
        },
      })
    );
  }, [id]);

  return (
    <div className="Draggable" ref={elementRef}>
      <div className={'Draggable-base' + (cardState === CardState.DRAGGING ? ' Draggable-base--isDragging' : '')}>
        {React.cloneElement(children, { isDragging: cardState === CardState.DRAGGING })}
      </div>

      {cardState === CardState.PREVIEW && containerState
        ? createPortal(<div className="Draggable-preview">{children}</div>, containerState)
        : null}
    </div>
  );
};

export default Draggable;
