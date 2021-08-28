import React from 'react';
import { useSelector } from 'react-redux';

import Bookmark from 'Assets/svg/bookmark.svg';
import A from 'Components/A';
import { RenderInPortal } from 'Components/Portal';
import { ListState } from 'Modules/Lists/lists.types';
import { selectListWithNotificationsIds } from 'Modules/Lists/selectors/selectListWithNotificationsIds';
import { selectCurrentRouteParams } from 'Modules/Routes/selectors/selectCurrentRouteParams';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { AnimateHeight, Fade, NotificationDot, Tooltip } from 'Vendor/components';

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

  if (!lists?.length && !loading) return null;

  return (
    <div className="SidebarLeftLists">
      <Fade mounted={listsShown} appear speed="normal">
        <AnimateHeight
          className="SidebarLeftLists-grid"
          mounted={listsShown}
          speed="fastest"
          ease={[1, 0.02, 0.83, 1.15]}
        >
          {lists?.map((item, index) => {
            const sessionListMembership = item?.members?.find((item) => item?.id === session?.id);
            const listHasNotifications = listsWithNotificationsIds.includes(item?.id);

            return (
              <React.Fragment key={`${item?.id}-${index}`}>
                <div className="SidebarLeftLists-itemHeader">
                  <A
                    className="SidebarLeftLists-name"
                    href={`lists/${item?.id}`}
                    frontend
                    underlined
                    active={currentListId === item?.id}
                  >
                    {item?.name}
                    <NotificationDot
                      type="success"
                      size="small"
                      className={
                        'SidebarLeftLists-notificationDot' +
                        (sessionListMembership?.userListStatus === 'pending'
                          ? ' SidebarLeftLists-notificationDot--pending'
                          : '') +
                        (!!listHasNotifications ? ' SidebarLeftLists-notificationDot--pending' : '')
                      }
                    />
                  </A>
                </div>
                <RenderInPortal>
                  <Tooltip
                    parentElementId={`SidebarLeftLists-members-${item?.id}`}
                    content="Users in this list"
                    delay={0.5}
                  />
                </RenderInPortal>
                <span id={`SidebarLeftLists-members-${item?.id}`} className="SidebarLeftLists-descriptionItem">
                  {/* Lists has at least the owned, plus the members */}
                  {!!(item?.members?.length + 1) && <span>{item?.members?.length + 1}@</span>}
                </span>
                <RenderInPortal>
                  <Tooltip
                    parentElementId={`SidebarLeftLists-bookmarks-${item?.id}`}
                    content="Bookmarks in this list"
                    delay={0.5}
                  />
                </RenderInPortal>
                <span id={`SidebarLeftLists-bookmarks-${item?.id}`} className="SidebarLeftLists-descriptionItem">
                  {!!item?.bookmarksIds?.length && (
                    <>
                      <span>{item?.bookmarksIds?.length}</span>
                      <Bookmark className="SidebarLeftLists-bookmarkIcon" />
                    </>
                  )}
                </span>
              </React.Fragment>
            );
          })}
        </AnimateHeight>
      </Fade>{' '}
    </div>
  );
};
export default SidebarLeftLists;
