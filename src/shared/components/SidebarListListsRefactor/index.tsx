import React from 'react';

import A from 'Components/A';
import { RenderInPortal } from 'Components/Portal';
import { ListState } from 'Modules/Lists/lists.types';
import { stringToDashCase } from 'Tools/utils/string/stringToDashCase';
import { Bookmark, FadeInOut, Flex, Frame, H4, Hr, List, Space, Span, Tooltip } from 'Vendor/components';
import { SidebarListListsRefactorSkeleton } from './SidebarListListsRefactorSkeleton';

import './SidebarListListsRefactor.less';

interface Props {
  title: string;
  lists: ListState[];
  loading?: boolean;
  href?: string;
  padding?: boolean;
  borderBottom?: boolean;
}

const SidebarListListsRefactor: React.FC<Props> = ({
  lists,
  loading,
  title,
  href,
  padding = true,
  borderBottom = true,
}) => {
  if (!lists?.length && !loading) return null;

  return (
    <Frame
      className="SidebarListListsRefactor"
      grow
      borderTop={false}
      borderRight={false}
      borderLeft={false}
      borderBottom={borderBottom}
      padding={!!padding ? 'normal' : 'none'}
    >
      <A href={href} frontend styled={!!href} disabled={!href} underlined>
        <H4>{title}</H4>
      </A>
      <Hr size="small" spacer />
      <FadeInOut className="SidebarListListsRefactor-grid" valueToUpdate={loading} appear speed="fastest">
        {!!loading && <SidebarListListsRefactorSkeleton />}
        {!loading &&
          !!lists?.length &&
          lists?.map(({ id, name, members, bookmarksIds }, index) => (
            <React.Fragment key={`${id}-${index}`}>
              <Flex vertical="center" horizontal="left">
                <Space />
                <List size="nano" />
                <Space />
                <Span weight="semiBold">
                  <A href={`lists/${id}`} frontend underlined>
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
                className="SidebarListListsRefactor-descriptionItem"
                size="micro"
                weight="semiBold"
              >
                {!!members?.length && (
                  <A href={`lists/${id}`} frontend styled={false}>
                    <span>{members?.length}</span>@
                  </A>
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
                className="SidebarListListsRefactor-descriptionItem"
                size="micro"
                weight="semiBold"
              >
                {!!bookmarksIds?.length && (
                  <A href={`lists/${id}`} frontend styled={false}>
                    <span>{bookmarksIds?.length}</span>
                    <Bookmark size="micro" />
                  </A>
                )}
              </Span>
              {index < lists?.length - 1 && <Hr className="SidebarListListsRefactor-spacer" spacer size="micro" />}
            </React.Fragment>
          ))}
      </FadeInOut>
    </Frame>
  );
};
export default SidebarListListsRefactor;
