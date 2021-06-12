import React from 'react';

import A from 'Components/A';
import { RenderInPortal } from 'Components/Portal';
import { ListState } from 'Modules/Lists/lists.types';
import { Bookmark, Flex, Hr, List, Space, Span, Tooltip } from 'Vendor/components';

import './SidebarLeft.less';

interface Props {
  lists: ListState[];
}

export const SidebarLeftLists: React.FC<Props> = ({ lists }) => (
  <dl className="SidebarLeft-listsGrid">
    {lists.map(({ id, name, members, bookmarksIds }, index) => (
      <React.Fragment key={id}>
        <div className="SidebarLeft-listName">
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
        </div>
        <RenderInPortal>
          <Tooltip parentElementId={`SidebarLeft-${id}`} content="Users following this list" delay={0.5} />
        </RenderInPortal>
        <A className="SidebarLeft-descriptionItem" href={`lists/${id}/users`} frontend>
          <Span id={`SidebarLeft-${id}`} size="micro" weight="semiBold">
            {members?.length && `${members?.length + 1}@`}
          </Span>
        </A>
        <RenderInPortal>
          <Tooltip parentElementId={`SidebarLeft-${id}`} content="Bookmarks within this list" delay={0.5} />
        </RenderInPortal>
        <A className="SidebarLeft-descriptionItem" href={`lists/${id}`} frontend>
          <Span id={`SidebarLeft-${id}`} size="micro" weight="semiBold">
            {bookmarksIds?.length && (
              <>
                {bookmarksIds?.length}
                <Bookmark size="micro" className="SidebarLeft-icon" />
              </>
            )}
          </Span>
        </A>
        {index < lists?.length - 1 && <Hr className="SidebarLeft-spacer" spacer size="micro" />}
      </React.Fragment>
    ))}
  </dl>
);
