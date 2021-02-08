import React from 'react';
import { createPortal } from 'react-dom';

import A from 'Components/A';
import { ListState } from 'Modules/Lists/lists.types';
import { stringToDashCase } from 'Tools/utils/string/stringToDashCase';
import { Hr, Span, Tooltip } from '@antoniodcorrea/components';
import { RenderInPortal } from '../Portal';
import { SidebarListListsSkeleton } from './SidebarListListsSkeleton';

import './SidebarListLists.less';

interface Props {
  items: ListState[];
  loading?: boolean;
  title?: string;
}

const SidebarListLists: React.FC<Props> = ({ items, loading, title: blockTitle }) => (
  <dl className="SidebarListLists-lists">
    {!loading ? (
      items.map(({ id, name, membersIds, bookmarksIds }, index) => (
        <React.Fragment key={id}>
          {!!index && <Hr spacer size="micro" />}
          <dd className="SidebarListLists-list">
            <div className="SidebarListLists-listName">
              <A href={`lists/${id}`} frontend>
                <Span bold>+ {name}</Span>
              </A>
            </div>
            <div id={id + '-' + index} className="SidebarListLists-listDescription">
              {membersIds?.length && (
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
                      {membersIds?.length + 1}
                      {bookmarksIds?.length && <> · </>}
                    </Span>
                  </A>
                </>
              )}
              {bookmarksIds?.length && (
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
      ))
    ) : (
      <SidebarListListsSkeleton />
    )}
  </dl>
);
export default SidebarListLists;
