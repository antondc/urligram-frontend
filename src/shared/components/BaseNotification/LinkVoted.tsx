import React from 'react';

import { NotificationState } from 'Modules/Ui/ui.types';
import { Span } from 'Vendor/components';

interface Props {
  notification: NotificationState;
}

const LinkVoted: React.FC<Props> = () => (
  <div>
    <div>
      <Span size="normal" weight="semiBold">
        Your vote was successfully recorded
      </Span>
    </div>
    <Span size="small" weight="semiBold">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, nisi quaerat ad aliquid nostrum perferendis
      eveniet vitae minus temporibus reprehenderit provident, odio veritatis id molestiae excepturi? Vitae beatae
      perspiciatis modi!
    </Span>
  </div>
);

export default LinkVoted;
