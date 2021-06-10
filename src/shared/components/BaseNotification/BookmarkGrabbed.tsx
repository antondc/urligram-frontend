import React from 'react';
import { useSelector } from 'react-redux';

import A from 'Components/A';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { NotificationState } from 'Modules/Ui/ui.types';
import { Span } from 'Vendor/components';

interface Props {
  notification: NotificationState;
}

const BookmarkGrabbed: React.FC<Props> = ({ notification }) => {
  const sessionId = useSelector(selectSessionUserId);

  return (
    <div>
      <div>
        <Span weight="semiBold" size="normal">
          You now have this bookmark {notification.number}
        </Span>
      </div>
      <Span size="small" weight="semiBold">
        Your bookmark was created, click{' '}
        <A href={`users/${sessionId}/bookmarks?sort=-updatedAt`} frontend underlined>
          here
        </A>{' '}
        to see it{' '}
      </Span>
    </div>
  );
};

export default BookmarkGrabbed;
