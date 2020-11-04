import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Border from 'Ui/Border';
import H4 from 'Ui/H4';
import Hr from 'Ui/Hr';
import Span from 'Ui/Span';

import './SidebarListLists.less';

interface Props {
  title: string;
  items: {
    id: number;
    name: string;
    count: number;
  }[];
}

const SidebarListLists: React.FC<Props> = ({ title, items }) => (
  <Border grow>
    <H4>{title}</H4>
    <Hr type="spacer" size="small" />
    <dl className="SidebarListLists-lists">
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          {!!index && <Hr type="spacer" size="micro" />}
          <div className="SidebarListLists-list">
            <dl className="SidebarListLists-listName">
              <Span bold>+ {item.name}</Span>
            </dl>
            <dd className="SidebarListLists-listDescription">{item.count} items</dd>
          </div>
        </React.Fragment>
      ))}
    </dl>
  </Border>
);

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps, {})(SidebarListLists);
