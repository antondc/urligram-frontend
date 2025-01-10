import React from 'react';
import { useSelector } from 'react-redux';

import A from 'Components/A';
import { RootState } from 'Modules/rootType';
import { NotificationState } from 'Modules/Ui/ui.types';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';

import './ConnectionRemoved.less';

interface Props {
  notification: NotificationState;
}

const ConnectionRemoved: React.FC<Props> = ({ notification }) => {
  const conection = useSelector((state: RootState) => selectUserById(state, { id: notification?.userId }));

  return (
    <div className="ConnectionRemoved">
      <div className="ConnectionRemoved-title">Connection removed.</div>
      <div className="ConnectionRemoved-text">
        You just removed your connection with{' '}
        <A className="ConnectionRemoved-user" href={`users/${conection?.id}`} frontend underlined>
          @{conection?.name}
        </A>
        .
      </div>
    </div>
  );
};

export default ConnectionRemoved;
