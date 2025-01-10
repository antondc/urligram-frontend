import React from 'react';
import { useSelector } from 'react-redux';

import A from 'Components/A';
import { RootState } from 'Modules/rootType';
import { NotificationState } from 'Modules/Ui/ui.types';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';

import './ConnectionRemovedFailed.less';

interface Props {
  notification: NotificationState;
}

const ConnectionRemovedFailed: React.FC<Props> = ({ notification }) => {
  const conection = useSelector((state: RootState) => selectUserById(state, { id: notification?.userId }));

  return (
    <div className="ConnectionRemovedFailed">
      <div className="ConnectionRemovedFailed-title">Connection failed!</div>
      <div className="ConnectionRemovedFailed-text">
        We failed to remove your connection to{' '}
        <A className="ConnectionRemovedFailed-user" href={`users/${conection?.id}`} frontend underlined>
          @{conection?.name}
        </A>
        .
      </div>
    </div>
  );
};

export default ConnectionRemovedFailed;
