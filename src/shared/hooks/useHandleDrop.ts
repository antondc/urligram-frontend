import { useEffect } from 'react';

import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

export const useHandleDrop = () => {
  useEffect(() => {
    const handleDrop = ({ source, location }) => {
      const destination = location.current.dropTargets.length;
      if (!destination) {
        return;
      }

      const draggedBookmarkDraggableId = source.data.id;
      const [destinationColumnRecord] = location.current.dropTargets;
      const destinationColumnId = destinationColumnRecord.data.id;

      if (!destinationColumnId) {
        return;
      }

      alert(
        JSON.stringify(
          {
            bookmarkId: draggedBookmarkDraggableId,
            listId: destinationColumnId,
          },
          null,
          2
        )
      );

      return;
    };

    return monitorForElements({ onDrop: handleDrop });
  }, []);
};
