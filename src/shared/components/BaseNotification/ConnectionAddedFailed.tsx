import React from 'react';
import { useSelector } from 'react-redux';

import A from 'Components/A';
import { RootState } from 'Modules/rootType';
import { NotificationState } from 'Modules/Ui/ui.types';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';

import './ConnectionAddedFailed.less';

interface Props {
  notification: NotificationState;
}

const ConnectionAddedFailed: React.FC<Props> = ({ notification }) => {
  const conection = useSelector((state: RootState) => selectUserById(state, { id: notification?.userId }));

  return (
    <div className="ConnectionAddedFailed">
      <div className="ConnectionAddedFailed-title">Connection failed!</div>
      <div className="ConnectionAddedFailed-text">
        We failed to connect you to{' '}
        <A className="ConnectionAddedFailed-user" href={`users/${conection?.id}`} frontend underlined>
          @{conection?.name}
        </A>
        .
      </div>
    </div>
  );
};

export default ConnectionAddedFailed;
