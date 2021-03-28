import React from 'react';

import { NotificationState } from 'Modules/Ui/ui.types';
import { Span } from '@antoniodcorrea/components';

interface Props {
  notification: NotificationState;
}

const BookmarkDeleted: React.FC<Props> = () => (
  <div>
    <div>
      <Span bold size="normal">
        Your bookmark was successfully deleted
      </Span>
    </div>
    <Span size="small">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, nisi quaerat ad aliquid nostrum perferendis
      eveniet vitae minus temporibus reprehenderit provident, odio veritatis id molestiae excepturi? Vitae beatae
      perspiciatis modi!
    </Span>
  </div>
);

export default BookmarkDeleted;
