import React from 'react';

import { NotificationState } from 'Modules/Ui/ui.types';

interface Props {
  notification: NotificationState;
}

const BookmarkDeleted: React.FC<Props> = () => <span className="BookmarkDeleted">Your bookmark was successfully deleted</span>;

export default BookmarkDeleted;
