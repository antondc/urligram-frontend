import React from 'react';
import { useSelector } from 'react-redux';

import Droppable from 'Components/DragDrop/Droppable';
import { useScrollBeforeCallback } from 'Hooks/useScrollBeforeCallback';
import { ListState } from 'Modules/Lists/lists.types';
import { selectListWithNotificationsIds } from 'Modules/Lists/selectors/selectListWithNotificationsIds';
import { selectCurrentRouteParams } from 'Modules/Routes/selectors/selectCurrentRouteParams';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import history from 'Services/History';
import { SidebarLeftList } from './SidebarLeftList';
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
          {lists?.map((item, index) => (
            <Droppable key={index} id={item?.id}>
              <SidebarLeftList
                sessionId={session?.id}
                item={item}
                currentListId={currentListId}
                listsWithNotificationsIds={listsWithNotificationsIds}
                onListClick={onListClick}
              />
            </Droppable>
          ))}
        </ul>
      </SidebarLeftSubItemsAnimation>
    </div>
  );
};
export default SidebarLeftLists;
