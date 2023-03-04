import React from 'react';

import { NotificationState } from 'Modules/Ui/ui.types';

import './BookmarkPrivateLimitReached.less';

interface Props {
  notification: NotificationState;
}

const BookmarkPrivateLimitReached: React.FC<Props> = () => (
  <div className="BookmarkPrivateLimitReached">
    <div className="BookmarkPrivateLimitReached-title">Your reached the limit of private bookmarks.</div>
    <div className="BookmarkPrivateLimitReached-text">
      Please consider saving it as public or making some other private bookmarks public.
    </div>
  </div>
);

export default BookmarkPrivateLimitReached;
