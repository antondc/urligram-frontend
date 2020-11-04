import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Border from 'Ui/Border';
import H4 from 'Ui/H4';
import Hr from 'Ui/Hr';
import Span from 'Ui/Span';

import './SidebarListUsers.less';

interface Props {
  title: string;
  items: {
    id: number;
    name: string;
    bookmarks: number;
    following: number;
    followers: number;
  }[];
}

const SidebarListUsers: React.FC<Props> = ({ title, items }) => (
  <Border grow>
    <H4>{title}</H4>
    <Hr type="spacer" size="small" />
    <dl>
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          {!!index && <Hr type="spacer" size="micro" />}
          <div className="SidebarListUsers-user">
            <dt className="SidebarListUsers-userName">
              <Span bold>@emile13</Span>
            </dt>
            <dd className="SidebarListUsers-userDescription">10 · 34</dd>
          </div>
        </React.Fragment>
      ))}
    </dl>
  </Border>
);

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps, {})(SidebarListUsers);
