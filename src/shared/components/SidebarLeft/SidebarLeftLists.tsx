import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Bookmark from 'Assets/svg/bookmark.svg';
import { RenderInPortal } from 'Components/Portal';
import { ListState } from 'Modules/Lists/lists.types';
import { selectListWithNotificationsIds } from 'Modules/Lists/selectors/selectListWithNotificationsIds';
import { selectCurrentRouteParams } from 'Modules/Routes/selectors/selectCurrentRouteParams';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { switchListModal } from 'Modules/Ui/actions/switchListModal';
import history from 'Services/History';
import { AnimateHeight, Fade, NotificationDot, Tooltip } from 'Vendor/components';

import './SidebarLeftLists.less';

interface Props {
  lists: ListState[];
  loading?: boolean;
  listsShown?: boolean;
}

const SidebarLeftLists: React.FC<Props> = ({ lists, loading, listsShown = true }) => {
  const dispatch = useDispatch();

  const currentRouteParams = useSelector(selectCurrentRouteParams);
  const currentListId = Number(currentRouteParams?.listId);
  const session = useSelector(selectSession);
  const listsWithNotificationsIds = useSelector(selectListWithNotificationsIds);

  const switchUiListModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(switchListModal({ mounted: true }));
  };

  const onListClick = (listId: number) => {
    history.push(`/lists/${listId}`);
  };

  if (!lists?.length && !loading) return null;

  return (
    <div className="SidebarLeftLists">
      <Fade mounted={listsShown} appear speed="normal">
        <AnimateHeight mounted={listsShown} speed="fastest" ease={[1, 0.02, 0.83, 1.15]}>
          <table className="SidebarLeftLists-list">
            <tbody>
              {lists?.map((item, index) => {
                const sessionListMembership = item?.members?.find((item) => item?.id === session?.id);
                const listHasNotifications = listsWithNotificationsIds.includes(item?.id);

                return (
                  <tr
                    key={`${item?.id}-${index}`}
                    className={
                      'SidebarLeftLists-item' + (currentListId === item?.id ? ' SidebarLeftLists-item--active' : '')
                    }
                    onClick={() => onListClick(item?.id)}
                  >
                    <td className="SidebarLeftLists-nameCell">
                      <span className="SidebarLeftLists-nameContent">
                        {item?.name}
                        <NotificationDot
                          type="success"
                          size="small"
                          className={
                            'SidebarLeftLists-dot' +
                            (sessionListMembership?.userListStatus === 'pending'
                              ? ' SidebarLeftLists-dot--pending'
                              : '') +
                            (!!listHasNotifications ? ' SidebarLeftLists-dot--pending' : '')
                          }
                        />
                      </span>
                    </td>
                    <td>
                      <span className="SidebarLeftLists-detailContent" id={`SidebarLeftLists-members-${item?.id}`}>
                        {!!(item?.members?.length + 1) && `${item?.members?.length + 1}@`}
                      </span>
                      <RenderInPortal>
                        <Tooltip
                          parentElementId={`SidebarLeftLists-members-${item?.id}`}
                          content="Users in this list"
                          delay={0.5}
                        />
                      </RenderInPortal>
                    </td>
                    <td>
                      <span className="SidebarLeftLists-detailContent" id={`SidebarLeftLists-bookmarks-${item?.id}`}>
                        {item?.bookmarksIds?.length}
                        <Bookmark />
                      </span>
                      <RenderInPortal>
                        <Tooltip
                          parentElementId={`SidebarLeftLists-bookmarks-${item?.id}`}
                          content="Bookmarks in this list"
                          delay={0.5}
                        />
                      </RenderInPortal>
                    </td>
                  </tr>
                );
              })}
              <tr className="SidebarLeftLists-item SidebarLeftLists-addList" onClick={switchUiListModal}>
                <td className="SidebarLeftLists-nameCell">
                  <span className="SidebarLeftLists-nameContent">New list</span>
                </td>
                <td>
                  <span className="SidebarLeftLists-detailContent SidebarLeftLists-detailContent--hidden">spacer</span>
                </td>
                <td>
                  <span className="SidebarLeftLists-detailContent SidebarLeftLists-detailContent--hidden">spacer</span>
                </td>
              </tr>
            </tbody>
          </table>
        </AnimateHeight>
      </Fade>
      {}
    </div>
  );
};
export default SidebarLeftLists;
