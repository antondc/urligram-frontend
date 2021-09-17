import React from 'react';

import { NotificationState } from 'Modules/Ui/ui.types';

interface Props {
  notification: NotificationState;
}

const LinkVoted: React.FC<Props> = () => (
  <div className="LinkVoted">
    <div className="LinkVoted-title"> Your vote was successfully recorded</div>
    <div className="LinkVoted-text">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, nisi quaerat ad aliquid nostrum perferendis
      eveniet vitae minus temporibus reprehenderit provident, odio veritatis id molestiae excepturi? Vitae beatae
      perspiciatis modi!
    </div>
  </div>
);

export default LinkVoted;
