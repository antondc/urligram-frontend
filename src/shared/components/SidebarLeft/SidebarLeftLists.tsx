import React from 'react';
import { useSelector } from 'react-redux';

import Folder from 'Assets/svg/folder.svg';
import FolderSolid from 'Assets/svg/folderSolid.svg';
import { useScrollBeforeCallback } from 'Hooks/useScrollBeforeCallback';
import { ListState, ListUserStatus } from 'Modules/Lists/lists.types';
import { selectListWithNotificationsIds } from 'Modules/Lists/selectors/selectListWithNotificationsIds';
import { selectCurrentRouteParams } from 'Modules/Routes/selectors/selectCurrentRouteParams';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import history from 'Services/History';
import { NotificationDot } from '@antoniodcorrea/components';
import { SidebarLeftSubItemsAnimation } from './SidebarLeftSubItemsAnimation';

import './SidebarLeftLists.less';

interface Props {
  lists: ListState[];
  loading?: boolean;
  listsShown?: boolean;
}

const SidebarLeftLists: React.FC<Props> = ({ lists, loading, listsShown = true }) => {
  const currentRouteParams = useSelector(selectCurrentRouteParams);
  const currentListId = Number(currentRouteParams?.listId);
  const session = useSelector(selectSession);
  const listsWithNotificationsIds = useSelector(selectListWithNotificationsIds);
  const { scrollBeforeCallback } = useScrollBeforeCallback();

  const onListClick = (listId: number) => {
    scrollBeforeCallback(() => history.push(`/lists/${listId}`));
  };

  if (!lists?.length && !loading) return null;

  return (
    <div className="SidebarLeftLists">
      <SidebarLeftSubItemsAnimation mounted={listsShown}>
        <ul className="SidebarLeftLists-lists">
          {lists?.map((item, index) => {
            const sessionListMembership = item?.members?.find((item) => item?.id === session?.id);
            const listHasNotifications = listsWithNotificationsIds.includes(item?.id);

            return (
              <li
                key={`${item?.id}-${index}`}
                className={
                  'SidebarLeftLists-list' + (currentListId === item?.id ? ' SidebarLeftLists-list--active' : '')
                }
                onClick={() => onListClick(item?.id)}
              >
                {currentListId === item?.id ? (
                  <Folder className="SidebarLeftLists-listIcon" />
                ) : (
                  <FolderSolid className="SidebarLeftLists-listIcon" />
                )}
                <span className="SidebarLeftLists-listTitle">
                  {item?.name}
                  <NotificationDot
                    type="success"
                    size="small"
                    className={
                      'SidebarLeftLists-dot' +
                      (sessionListMembership?.userListStatus === ListUserStatus.Pending
                        ? ' SidebarLeftLists-dot--pending'
                        : '') +
                      (!!listHasNotifications ? ' SidebarLeftLists-dot--pending' : '')
                    }
                  />
                </span>
              </li>
            );
          })}
        </ul>
      </SidebarLeftSubItemsAnimation>
    </div>
  );
};
export default SidebarLeftLists;
