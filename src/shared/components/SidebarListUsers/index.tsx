import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { H4, Span, Hr, Border } from '@antoniodcorrea/components';

import './SidebarListUsers.less';

interface Props {
  title: string;
  items: {
    id: number;
    name: string;
    links: number;
    following: number;
    followers: number;
  }[];
}

const SidebarListUsers: React.FC<Props> = ({ title, items }) => {
  return (
    <Border grow>
      <H4>{title}</H4>
      <Hr type="spacer" size="small" />
      <dl>
        {items.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <div className="SidebarListUsers-user">
                <dt className="SidebarListUsers-userName">
                  <Span bold>@emile13</Span>
                </dt>
                <dd className="SidebarListUsers-userDescription">10 · 34</dd>
              </div>
              <Hr type="spacer" size="micro" />
            </React.Fragment>
          );
        })}
      </dl>
    </Border>
  );
};

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps, {})(SidebarListUsers);
