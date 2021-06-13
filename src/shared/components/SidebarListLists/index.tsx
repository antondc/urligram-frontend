import React from 'react';
import { useSelector } from 'react-redux';

import A from 'Components/A';
import { RenderInPortal } from 'Components/Portal';
import { ListState } from 'Modules/Lists/lists.types';
import { selectCurrentRouteParams } from 'Modules/Routes/selectors/selectCurrentRouteParams';
import { stringToDashCase } from 'Tools/utils/string/stringToDashCase';
import {
  AnimateHeight,
  Bookmark,
  DotsVertical,
  Flex,
  Frame,
  H4,
  Hr,
  Space,
  Span,
  Tooltip,
  Triangle,
} from 'Vendor/components';
import { SidebarListListsSkeleton } from './SidebarListListsSkeleton';

import './SidebarListLists.less';

interface Props {
  title: string;
  lists: ListState[];
  loading?: boolean;
  href?: string;
  padding?: boolean;
  borderBottom?: boolean;
  listsShown?: boolean;
  onListTitleClick?: () => void;
}

const SidebarListLists: React.FC<Props> = ({
  lists,
  loading,
  title,
  href,
  padding = true,
  borderBottom = true,
  listsShown = true,
  onListTitleClick = () => {},
}) => {
  if (!lists?.length && !loading) return null;
  const currentRouteParams = useSelector(selectCurrentRouteParams);
  const currentListId = Number(currentRouteParams?.listId);

  return (
    <Frame
      className="SidebarListLists"
      grow
      borderTop={false}
      borderRight={false}
      borderLeft={false}
      borderBottom={borderBottom}
      padding={!!padding ? 'normal' : 'none'}
    >
      <Flex horizontal="left" vertical="center">
        <A href={href} frontend styled={!!href} disabled={!href} underlined onClick={onListTitleClick}>
          <H4>{title}</H4>
        </A>
        <Space />
        <Triangle
          className={'SidebarListLists-triangle' + (listsShown ? ' SidebarListLists-triangle--show' : '')}
          size="pico"
        />
      </Flex>
      <Hr size="small" spacer />
      <AnimateHeight mounted={listsShown} speed="fastest" ease={[1, 0.02, 0.83, 1.15]}>
        <div className="SidebarListLists-grid">
          {!!loading && <SidebarListListsSkeleton />}
          {!loading &&
            lists?.map(({ id, name, members, bookmarksIds }, index) => (
              <React.Fragment key={`${id}-${index}`}>
                <Flex vertical="center" horizontal="left">
                  <Space />
                  <DotsVertical size="nano" />
                  <Space />
                  <Span weight="semiBold">
                    <A
                      className="SidebarListLists-link"
                      href={`lists/${id}`}
                      frontend
                      underlined
                      active={currentListId === id}
                    >
                      {name}
                    </A>
                  </Span>
                </Flex>
                <RenderInPortal>
                  <Tooltip
                    parentElementId={`${stringToDashCase(title)}-members-${id}`}
                    content="Users in this list"
                    delay={0.5}
                  />
                </RenderInPortal>
                <Span
                  id={`${stringToDashCase(title)}-members-${id}`}
                  className="SidebarListLists-descriptionItem"
                  size="micro"
                  weight="semiBold"
                >
                  {!!members?.length && (
                    <>
                      <span>{members?.length}</span>@
                    </>
                  )}
                </Span>
                <RenderInPortal>
                  <Tooltip
                    parentElementId={`${stringToDashCase(title)}-bookmarks-${id}`}
                    content="Bookmarks in this list"
                    delay={0.5}
                  />
                </RenderInPortal>
                <Span
                  id={`${stringToDashCase(title)}-bookmarks-${id}`}
                  className="SidebarListLists-descriptionItem"
                  size="micro"
                  weight="semiBold"
                >
                  {!!bookmarksIds?.length && (
                    <>
                      <span>{bookmarksIds?.length}</span>
                      <Bookmark size="micro" />
                    </>
                  )}
                </Span>
                {index < lists?.length - 1 && <Hr className="SidebarListLists-spacer" spacer size="micro" />}
              </React.Fragment>
            ))}
        </div>
      </AnimateHeight>
    </Frame>
  );
};
export default SidebarListLists;
