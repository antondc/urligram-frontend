import React from 'react';

import Folder from 'Assets/svg/folder.svg';
import { ListState, ListUserStatus } from 'Modules/Lists/lists.types';
import { NotificationDot } from '@antoniodcorrea/components';

import './SidebarLeftList.less';

interface Props {
  item: ListState;
  currentListId: number;
  listsWithNotificationsIds: Array<number>;
  sessionId: string;
  isDraggedOver?: boolean;
  onListClick: (id: number) => void;
}

export const SidebarLeftList: React.FC<Props> = ({
  sessionId,
  item,
  currentListId,
  listsWithNotificationsIds,
  onListClick,
  isDraggedOver,
}) => {
  const sessionListMembership = item?.members?.find((item) => item?.id === sessionId);
  const listHasNotifications = listsWithNotificationsIds.includes(item?.id);

  return (
    <li
      className={
        'SidebarLeftList' +
        (currentListId === item?.id ? ' SidebarLeftList--active' : '') +
        (currentListId === item?.id || isDraggedOver ? ' SidebarLeftList--isDraggedOver' : '')
      }
      onClick={() => onListClick(item?.id)}
    >
      <Folder className={'SidebarLeftList-listIcon'} />
      <span className="SidebarLeftList-listTitle">
        {item?.name}
        <NotificationDot
          type="success"
          size="small"
          className={
            'SidebarLeftList-dot' +
            (sessionListMembership?.userListStatus === ListUserStatus.Pending ? ' SidebarLeftList-dot--pending' : '') +
            (!!listHasNotifications ? ' SidebarLeftList-dot--pending' : '')
          }
        />
      </span>
    </li>
  );
};
