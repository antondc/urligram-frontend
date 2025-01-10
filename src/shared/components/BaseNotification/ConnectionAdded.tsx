import React from 'react';
import { useSelector } from 'react-redux';

import A from 'Components/A';
import { RootState } from 'Modules/rootType';
import { NotificationState } from 'Modules/Ui/ui.types';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';

import './ConnectionAdded.less';

interface Props {
  notification: NotificationState;
}

const ConnectionAdded: React.FC<Props> = ({ notification }) => {
  const conection = useSelector((state: RootState) => selectUserById(state, { id: notification?.userId }));

  return (
    <div className="ConnectionAdded">
      <div className="ConnectionAdded-title">Connection added!</div>
      <div className="ConnectionAdded-text">
        You just followed{' '}
        <A className="ConnectionAdded-user" href={`users/${conection?.id}`} frontend underlined>
          @{conection?.name}
        </A>.
      </div>
    </div>
  );
};

export default ConnectionAdded;
