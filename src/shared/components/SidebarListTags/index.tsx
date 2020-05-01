import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { H4, Hr, Border, Tag } from '@antoniodcorrea/components';

import './SidebarListTags.less';

interface Props {
  title: string;
  items: {
    id: number;
    name: string;
  }[];
}

const SidebarListTags: React.FC<Props> = ({ title, items }) => {
  return (
    <Border grow className="SidebarListTags">
      <H4>{title}</H4>
      <Hr type="spacer" />
      <div className="SidebarListTags-tags">
        {items.map((item) => (
          <Tag size="big" className="SidebarListTags-tag" key={item.id}>
            {item.name}
          </Tag>
        ))}
      </div>
    </Border>
  );
};

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps, {})(SidebarListTags);
