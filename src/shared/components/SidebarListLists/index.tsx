import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ListState } from 'Modules/Lists/lists.types';
import { Border, H4, Hr, Span, Tooltip } from '@antoniodcorrea/components';

import './SidebarListLists.less';

interface Props {
  id: string;
  title: string;
  items: ListState[];
}

const SidebarListLists: React.FC<Props> = ({ id, title, items }) => (
  <Border id={id} grow>
    <H4>{title}</H4>
    <Hr spacer size="small" />
    <dl className="SidebarListLists-lists">
      {!!items?.length &&
        items.map(({ id, name, members }, index) => (
          <React.Fragment key={id}>
            {!!index && <Hr spacer size="micro" />}
            <div className="SidebarListLists-list">
              <dl className="SidebarListLists-listName">
                <Span bold>+ {name}</Span>
              </dl>
              <dd id={id + '-' + index} className="SidebarListLists-listDescription">
                {members?.length && members?.length} items
              </dd>
              <Tooltip parentElementId={id + '-' + index} content="This is something" />
            </div>
          </React.Fragment>
        ))}
    </dl>
  </Border>
);

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps, {})(SidebarListLists);
