import React from 'react';

import A from 'Components/A';
import { RenderInPortal } from 'Components/Portal';
import { ListState } from 'Modules/Lists/lists.types';
import { stringToDashCase } from 'Tools/utils/string/stringToDashCase';
import { Hr, Span, Tooltip } from 'Vendor/components';
import { SidebarListListsSkeleton } from './SidebarListListsSkeleton';

import './SidebarListLists.less';

interface Props {
  items: ListState[];
  loading?: boolean;
  title?: string;
}

const SidebarListLists: React.FC<Props> = ({ items, loading, title: blockTitle }) => {
  if (loading) return <SidebarListListsSkeleton />;
  if (!items?.length) return <Span weight="semiBold">ⵁ Nothing here yet.</Span>;

  return (
    <dl className="SidebarListLists-lists">
      {items.map(({ id, name, members, bookmarksIds }, index) => (
        <React.Fragment key={id}>
          {!!index && <Hr spacer size="micro" />}
          <dd className="SidebarListLists-list">
            <div className="SidebarListLists-listName">
              <A href={`lists/${id}`} frontend>
                <Span weight="semiBold">+ {name}</Span>
              </A>
            </div>
            <div id={id + '-' + index} className="SidebarListLists-listDescription">
              {!!members?.length && (
                <>
                  <RenderInPortal>
                    <Tooltip
                      parentElementId={`${stringToDashCase(blockTitle)}-members-${id}`}
                      content="Users following this list"
                      delay={0.5}
                    />
                  </RenderInPortal>
                  <A href={`lists/${id}/users`} frontend>
                    <Span id={`${stringToDashCase(blockTitle)}-members-${id}`} size="small">
                      {members?.length + 1}
                      {bookmarksIds?.length && <> · </>}
                    </Span>
                  </A>
                </>
              )}
              {!!bookmarksIds?.length && (
                <>
                  <RenderInPortal>
                    <Tooltip
                      parentElementId={`${stringToDashCase(blockTitle)}-bookmarks-${id}`}
                      content="Bookmarks within this list"
                      delay={0.5}
                    />
                  </RenderInPortal>
                  <A href={`lists/${id}`} frontend>
                    <Span id={`${stringToDashCase(blockTitle)}-bookmarks-${id}`} size="small">
                      {bookmarksIds?.length}
                    </Span>
                  </A>
                </>
              )}
            </div>
          </dd>
        </React.Fragment>
      ))}
    </dl>
  );
};
export default SidebarListLists;
