import React from 'react';

import { ListState } from 'Modules/Lists/lists.types';
import { Hr, Span, Tooltip } from '@antoniodcorrea/components';
import { SidebarListListsSkeleton } from './SidebarListListsSkeleton';

import './SidebarListLists.less';

interface Props {
  items: ListState[];
  loading?: boolean;
}

const SidebarListLists: React.FC<Props> = ({ items, loading }) => (
  <>
    {!loading && items?.length ? (
      items.map(({ id, name, members }, index) => (
        <React.Fragment key={id}>
          {!!index && <Hr spacer size="micro" />}
          <dd className="SidebarListListsUi-list">
            <div className="SidebarListListsUi-listName">
              <Span bold>+ {name}</Span>
            </div>
            <div id={id + '-' + index} className="SidebarListListsUi-listDescription">
              <Span size="small"> {members?.length && members?.length} items</Span>
            </div>
            <Tooltip parentElementId={id + '-' + index} content="This is something" />
          </dd>
        </React.Fragment>
      ))
    ) : (
      <SidebarListListsSkeleton />
    )}
  </>
);
export default SidebarListLists;
