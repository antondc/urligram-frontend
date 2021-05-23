import React from 'react';
import { useSelector } from 'react-redux';

import BaseNotification from 'Components/BaseNotification';
import { FadeInOut, Hr } from 'Vendor/components';
import { selectUiNotifications } from 'Modules/Ui/selectors/selectUiNotifications';

import './Notifications.less';

const Notifications: React.FC = () => {
  const notifications = useSelector(selectUiNotifications);

  return (
    <div className="Notifications">
      <Hr spacer size="small" />
      {notifications.map((item) => (
        <FadeInOut valueToUpdate={item.status} key={item.id} appear>
          {item.status !== 'viewed' && <BaseNotification notification={item} key={item.id} />}
        </FadeInOut>
      ))}
    </div>
  );
};

export default Notifications;
