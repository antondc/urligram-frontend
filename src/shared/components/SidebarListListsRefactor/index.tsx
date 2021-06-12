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
}

const SidebarListListsRefactor: React.FC<Props> = ({ lists, loading, title, href }) => (
  <Frame className="SidebarListLists" grow borders={false}>
    <A href={href} frontend styled={!!href} disabled={!href}>
      <H4>{title}</H4>
    </A>
    <Hr size="small" spacer />
    <FadeInOut className="SidebarListLists-grid" valueToUpdate={loading} appear>
      {!lists?.length && <Span weight="semiBold">ⵁ Nothing here yet.</Span>}
      {!!lists?.length && loading && <SidebarListListsRefactorSkeleton />}
      {!!lists?.length &&
        !loading &&
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
                parentElementId={`${stringToDashCase(title)}-followers-${id}`}
                content="Followers of this user"
                delay={0.5}
              />
            </RenderInPortal>
            <Span
              id={`${stringToDashCase(title)}-followers-${id}`}
              className="SidebarListLists-descriptionItem"
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
                parentElementId={`${stringToDashCase(title)}-following-${id}`}
                content="People following to this user"
                delay={0.5}
              />
            </RenderInPortal>
            <Span
              id={`${stringToDashCase(title)}-following-${id}`}
              className="SidebarListLists-descriptionItem"
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
            {index < lists?.length - 1 && <Hr className="SidebarListLists-spacer" spacer size="micro" />}
          </React.Fragment>
        ))}
    </FadeInOut>
  </Frame>
);
export default SidebarListListsRefactor;
