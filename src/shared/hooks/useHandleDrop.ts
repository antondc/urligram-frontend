import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { listBookmarkCreate } from 'Modules/Lists/actions/listBookmarkCreate';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

export const useHandleDrop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleDrop = ({ source, location }) => {
      const destination = location.current.dropTargets.length;
      if (!destination) {
        return;
      }

      const bookmarkId = source.data.id;
      const [destinationColumnRecord] = location.current.dropTargets;
      const listId = destinationColumnRecord.data.id;

      if (!listId || !bookmarkId) {
        return;
      }

      dispatch(listBookmarkCreate({ listId: listId, bookmarkId: bookmarkId }));
    };

    return monitorForElements({ onDrop: handleDrop });
  }, []);
};
