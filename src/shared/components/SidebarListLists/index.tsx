import React from 'react';

import { ListState } from 'Modules/Lists/lists.types';
import { A, Hr, Span, Tooltip } from '@antoniodcorrea/components';
import { SidebarListListsSkeleton } from './SidebarListListsSkeleton';

import './SidebarListLists.less';

interface Props {
  items: ListState[];
  loading?: boolean;
}

const SidebarListLists: React.FC<Props> = ({ items, loading }) => (
  <dl className="SidebarListLists-lists">
    {!loading && items?.length ? (
      items.map(({ id, name, members }, index) => (
        <React.Fragment key={id}>
          {!!index && <Hr spacer size="micro" />}
          <dd className="SidebarListLists-list">
            <div className="SidebarListLists-listName">
              <A href={`lists/${id}`} frontend>
                <Span bold>+ {name}</Span>
              </A>
            </div>
            <div id={id + '-' + index} className="SidebarListLists-listDescription">
              <A href={`lists/${id}`} frontend>
                <Span size="small"> {members?.length && members?.length} items</Span>{' '}
              </A>
            </div>
            <Tooltip parentElementId={`${id}-${index}`} content="Bookmarks in this list" delay={1} />
          </dd>
        </React.Fragment>
      ))
    ) : (
      <SidebarListListsSkeleton />
    )}
  </dl>
);
export default SidebarListLists;
