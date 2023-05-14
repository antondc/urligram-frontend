import React from 'react';

import { NotificationState } from 'Modules/Ui/ui.types';

import './BookmarkCreated.less';

interface Props {
  notification: NotificationState;
}

const BookmarkCreated: React.FC<Props> = () => (
  <span className="BookmarkCreated">Your bookmark was successfully created</span>
);

export default BookmarkCreated;
