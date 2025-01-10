import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { listBookmarkCreate } from 'Modules/Lists/actions/listBookmarkCreate';
import { uiNotificationPush } from 'Modules/Ui/actions/uiNotificationPush';
import { NotificationStatus, NotificationStyle, NotificationType } from 'Modules/Ui/ui.types';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

export const useHandleDrop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleDrop = async ({ source, location }) => {
      const destination = location.current.dropTargets.length;
      if (!destination) {
        return;
      }

      const bookmarkId = source.data.id;
      const [destinationColumnRecord] = location.current.dropTargets;
      const listId = destinationColumnRecord.data.id;
      try {
        if (!listId || !bookmarkId) {
          throw new Error('Missing list or bookmark id');
        }

        await dispatch(listBookmarkCreate({ listId: listId, bookmarkId: bookmarkId }));
        await dispatch(
          uiNotificationPush({
            bookmarkId: bookmarkId,
            type: NotificationType.BookmarkAddedToList,
            style: NotificationStyle.Success,
            status: NotificationStatus.Pending,
          })
        );
      } catch (error) {
        console.error('error: ', error);

        await dispatch(
          uiNotificationPush({
            bookmarkId: bookmarkId,
            type: NotificationType.BookmarkNotAddedToList,
            style: NotificationStyle.Error,
            status: NotificationStatus.Pending,
          })
        );
      }
    };

    return monitorForElements({ onDrop: handleDrop });
  }, []);
};
