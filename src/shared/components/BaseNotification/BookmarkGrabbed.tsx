import React from 'react';
import { useSelector } from 'react-redux';

import A from 'Components/A';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { NotificationState } from 'Modules/Ui/ui.types';

interface Props {
  notification: NotificationState;
}

const BookmarkGrabbed: React.FC<Props> = ({ notification }) => {
  const sessionId = useSelector(selectSessionUserId);

  return (
    <div className="BookmarkGrabbed">
      <div className="BookmarkGrabbed-title">You now have this bookmark {notification.number}</div>
      <div className="BookmarkGrabbed-text">
        Your bookmark was created, click{' '}
        <A href={`users/${sessionId}/bookmarks?sort=-updatedAt`} frontend underlined>
          here
        </A>{' '}
        to see it{' '}
      </div>
    </div>
  );
};

export default BookmarkGrabbed;
