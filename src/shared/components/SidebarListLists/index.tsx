import React from 'react';

import { ListState } from 'Modules/Lists/lists.types';
import { stringToDashCase } from 'Tools/utils/string/stringToDashCase';
import { A, Hr, Span, Tooltip } from '@antoniodcorrea/components';
import { SidebarListListsSkeleton } from './SidebarListListsSkeleton';

import './SidebarListLists.less';

interface Props {
  items: ListState[];
  loading?: boolean;
  title?: string;
}

const SidebarListLists: React.FC<Props> = ({ items, loading, title }) => (
  <dl className="SidebarListLists-lists">
    {!loading && items?.length ? (
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
                  <Tooltip
                    parentElementId={`${stringToDashCase(title)}-members-${id}`}
                    content="Users following this list"
                    delay={0.5}
                  />
                  <A href={`lists/${id}/users`} frontend>
                    <Span id={`${stringToDashCase(title)}-members-${id}`} size="small">
                      {membersIds?.length + 1}
                      {bookmarksIds?.length && <> · </>}
                    </Span>
                  </A>
                </>
              )}
              {bookmarksIds?.length && (
                <>
                  <Tooltip
                    parentElementId={`${stringToDashCase(title)}-bookmarks-${id}`}
                    content="Bookmarks within this list"
                    delay={0.5}
                  />
                  <A href={`lists/${id}`} frontend>
                    <Span id={`${stringToDashCase(title)}-bookmarks-${id}`} size="small">
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
