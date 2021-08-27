import React from 'react';
import { useSelector } from 'react-redux';

import Bookmark from 'Assets/svg/bookmark.svg';
import List from 'Assets/svg/list.svg';
import A from 'Components/A';
import { RenderInPortal } from 'Components/Portal';
import { ListState } from 'Modules/Lists/lists.types';
import { selectListNotifications } from 'Modules/Notifications/selectors/selectListNotifications';
import { selectCurrentRouteParams } from 'Modules/Routes/selectors/selectCurrentRouteParams';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { stringToDashCase } from 'Tools/utils/string/stringToDashCase';
import { AnimateHeight, DotsVertical, NotificationDot, Space, Tooltip, Triangle } from 'Vendor/components';
import { SidebarListListsSkeleton } from './SidebarListListsSkeleton';

import './SidebarListLists.less';

interface Props {
  title: string;
  lists: ListState[];
  loading?: boolean;
  href?: string;
  className?: string;
  listsShown?: boolean;
  onListTitleClick?: () => void;
}

const SidebarListLists: React.FC<Props> = ({
  lists,
  loading,
  title,
  href,
  className,
  listsShown = true,
  onListTitleClick = () => {},
}) => {
  const currentRouteParams = useSelector(selectCurrentRouteParams);
  const currentListId = Number(currentRouteParams?.listId);
  const session = useSelector(selectSession);
  const listNotifications = useSelector(selectListNotifications);
  const listsWithNotifications = listNotifications
    .filter((item) => item.viewPending === true)
    .map((item) => item.listId);
  if (!lists?.length && !loading) return null;

  return (
    <div className={'SidebarListLists' + (!!className ? ' ' + className : '')}>
      <div className="SidebarListLists-header">
        <List className="SidebarListLists-icon" />
        <A href={href} frontend styled={!!href} disabled={!href} underlined onClick={onListTitleClick}>
          {title}
        </A>
        <Space />
        <Triangle
          className={'SidebarListLists-triangle' + (listsShown ? ' SidebarListLists-triangle--show' : '')}
          size="pico"
        />
      </div>
      <AnimateHeight
        className="SidebarListLists-grid"
        mounted={listsShown}
        speed="fastest"
        ease={[1, 0.02, 0.83, 1.15]}
      >
        {!!loading && <SidebarListListsSkeleton />}
        {!loading &&
          lists?.map((item, index) => {
            const sessionListMembership = item?.members?.find((item) => item?.id === session?.id);
            const listHasNotifications = listsWithNotifications.includes(item?.id);

            return (
              <React.Fragment key={`${item?.id}-${index}`}>
                <div className="SidebarListLists-itemHeader">
                  <DotsVertical size="nano" />
                  <Space />
                  <A
                    className="SidebarListLists-name"
                    href={`lists/${item?.id}`}
                    frontend
                    underlined
                    active={currentListId === item?.id}
                  >
                    {item?.name}
                    <NotificationDot
                      type="alert"
                      size="small"
                      className={
                        'SidebarListLists-notificationDot' +
                        (sessionListMembership?.userListStatus === 'pending'
                          ? ' SidebarListLists-notificationDot--pending'
                          : '') +
                        (!!listHasNotifications ? ' SidebarListLists-notificationDot--pending' : '')
                      }
                    />
                  </A>
                </div>
                <RenderInPortal>
                  <Tooltip
                    parentElementId={`${stringToDashCase(title)}-members-${item?.id}`}
                    content="Users in this list"
                    delay={0.5}
                  />
                </RenderInPortal>
                <span
                  id={`${stringToDashCase(title)}-members-${item?.id}`}
                  className="SidebarListLists-descriptionItem"
                >
                  {/* Lists has at least the owned, plus the members */}
                  {!!(item?.members?.length + 1) && <span>{item?.members?.length + 1}@</span>}
                </span>
                <RenderInPortal>
                  <Tooltip
                    parentElementId={`${stringToDashCase(title)}-bookmarks-${item?.id}`}
                    content="Bookmarks in this list"
                    delay={0.5}
                  />
                </RenderInPortal>
                <span
                  id={`${stringToDashCase(title)}-bookmarks-${item?.id}`}
                  className="SidebarListLists-descriptionItem"
                >
                  {!!item?.bookmarksIds?.length && (
                    <>
                      <span>{item?.bookmarksIds?.length}</span>
                      <Bookmark className="SidebarListLists-bookmarkIcon" />
                    </>
                  )}
                </span>
              </React.Fragment>
            );
          })}
      </AnimateHeight>
    </div>
  );
};
export default SidebarListLists;
