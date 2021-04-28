import React from 'react';

import { NotificationState } from 'Modules/Ui/ui.types';
import { Span } from 'Vendor/components';

interface Props {
  notification: NotificationState;
}

const BookmarkDeleted: React.FC<Props> = () => <Span size="normal">Your bookmark was successfully deleted</Span>;

export default BookmarkDeleted;
