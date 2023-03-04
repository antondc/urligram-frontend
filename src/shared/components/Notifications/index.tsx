import React from 'react';
import { useSelector } from 'react-redux';

import BaseNotification from 'Components/BaseNotification';
import { selectUiNotifications } from 'Modules/Ui/selectors/selectUiNotifications';
import { NotificationStatus } from 'Modules/Ui/ui.types';
import { FadeInOut } from '@antoniodcorrea/components';

import './Notifications.less';

const Notifications: React.FC = () => {
  const notifications = useSelector(selectUiNotifications);

  return (
    <div className="Notifications">
      {notifications.map((item) => (
        <FadeInOut valueToUpdate={item.status} key={item.id} speed="normal" appear>
          {item.status === NotificationStatus.Pending && <BaseNotification notification={item} key={item.id} />}
        </FadeInOut>
      ))}
    </div>
  );
};

export default Notifications;
