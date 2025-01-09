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

export type TCardState =
  | {
      type: CardState.IDDLE;
    }
  | {
      type: CardState.DRAGGING;
    }
  | {
      type: CardState.PREVIEW;
      container: HTMLElement;
    };

const Draggable: React.FC<Props> = ({ children, id }) => {
  const elementRef = useRef(null);
  const [cardState, setCardState] = useState<TCardState>({ type: CardState.IDDLE });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    return combine(
      draggable({
        element: element,
        getInitialData: () => ({ id }),
        onDragStart: () => setCardState({ type: CardState.DRAGGING }),
        onDrop: () => {
          setCardState({ type: CardState.IDDLE });
        },
        onGenerateDragPreview({ nativeSetDragImage, location }) {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: preserveOffsetOnSource({ element, input: location.current.input }),
            render({ container }) {
              setCardState({
                type: CardState.PREVIEW,
                container,
              });
            },
          });
        },
      })
    );
  }, [id]);

  const baseElement = React.cloneElement(
    <div className={'Draggable-base' + (cardState.type === CardState.DRAGGING ? ' Draggable-base--isDragging' : '')}>
      {children}
    </div>
  );

  const previewElement =
    cardState.type === CardState.PREVIEW
      ? createPortal(React.cloneElement(<div className="Draggable-preview">{children}</div>), cardState.container)
      : null;

  return (
    <div className="Draggable" ref={elementRef}>
      {baseElement}
      {previewElement}
    </div>
  );
};

export default Draggable;
