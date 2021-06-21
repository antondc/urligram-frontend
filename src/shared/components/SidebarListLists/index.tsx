import React from 'react';
import { useSelector } from 'react-redux';

import A from 'Components/A';
import { RenderInPortal } from 'Components/Portal';
import { ListState } from 'Modules/Lists/lists.types';
import { selectCurrentRouteParams } from 'Modules/Routes/selectors/selectCurrentRouteParams';
import { stringToDashCase } from 'Tools/utils/string/stringToDashCase';
import { AnimateHeight, Bookmark, DotsVertical, Space, Tooltip, Triangle } from 'Vendor/components';
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
  if (!lists?.length && !loading) return null;
  const currentRouteParams = useSelector(selectCurrentRouteParams);
  const currentListId = Number(currentRouteParams?.listId);

  return (
    <div className={'SidebarListLists' + (className ? ' ' + className : '')}>
      <div className="SidebarListLists-header">
        <A href={href} frontend styled={!!href} disabled={!href} underlined onClick={onListTitleClick}>
          {title}
        </A>
        <Space />
        <Triangle
          className={'SidebarListLists-triangle' + (listsShown ? ' SidebarListLists-triangle--show' : '')}
          size="pico"
        />
      </div>
      <AnimateHeight mounted={listsShown} speed="fastest" ease={[1, 0.02, 0.83, 1.15]}>
        <div className="SidebarListLists-grid">
          {!!loading && <SidebarListListsSkeleton />}
          {!loading &&
            lists?.map(({ id, name, members, bookmarksIds }, index) => (
              <React.Fragment key={`${id}-${index}`}>
                <div className="SidebarListLists-itemHeader">
                  <DotsVertical size="nano" />
                  <Space />
                  <A
                    className="SidebarListLists-name"
                    href={`lists/${id}`}
                    frontend
                    underlined
                    active={currentListId === id}
                  >
                    {name}
                  </A>
                </div>
                <RenderInPortal>
                  <Tooltip
                    parentElementId={`${stringToDashCase(title)}-members-${id}`}
                    content="Users in this list"
                    delay={0.5}
                  />
                </RenderInPortal>
                <span id={`${stringToDashCase(title)}-members-${id}`} className="SidebarListLists-descriptionItem">
                  {!!members?.length && (
                    <>
                      <span>{members?.length}</span>@
                    </>
                  )}
                </span>
                <RenderInPortal>
                  <Tooltip
                    parentElementId={`${stringToDashCase(title)}-bookmarks-${id}`}
                    content="Bookmarks in this list"
                    delay={0.5}
                  />
                </RenderInPortal>
                <span id={`${stringToDashCase(title)}-bookmarks-${id}`} className="SidebarListLists-descriptionItem">
                  {!!bookmarksIds?.length && (
                    <>
                      <span>{bookmarksIds?.length}</span>
                      <Bookmark className="SidebarListLists-bookmarkIcon" />
                    </>
                  )}
                </span>
              </React.Fragment>
            ))}
        </div>
      </AnimateHeight>
    </div>
  );
};
export default SidebarListLists;
