import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { H4, Span, Hr, Border } from '@antoniodcorrea/components';

import './SidebarListLists.less';

interface Props {
  title: string;
  items: {
    id: number;
    name: string;
    count: number;
  }[];
}

const SidebarListLists: React.FC<Props> = ({ title, items }) => {
  return (
    <Border grow>
      <H4>{title}</H4>
      <Hr type="spacer" size="small" />
      <dl className="SidebarListLists-lists">
        {items.map((item) => (
          <React.Fragment key={item.id}>
            <div className="SidebarListLists-list">
              <dl className="SidebarListLists-listName">
                <Span bold>+ {item.name}</Span>
              </dl>
              <dd className="SidebarListLists-listDescription">{item.count} items</dd>
            </div>
            <Hr type="spacer" size="micro" />
          </React.Fragment>
        ))}
      </dl>
    </Border>
  );
};

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps, {})(SidebarListLists);
