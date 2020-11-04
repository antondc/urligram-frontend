import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Border from 'Ui/Border';
import H4 from 'Ui/H4';
import Hr from 'Ui/Hr';
import Tag from 'Ui/Tag';

import './SidebarListTags.less';

interface Props {
  title: string;
  items: {
    id: number;
    name: string;
  }[];
}

const SidebarListTags: React.FC<Props> = ({ title, items }) => (
  <Border grow className="SidebarListTags">
    <H4>{title}</H4>
    <Hr type="spacer" size="small" />
    <div className="SidebarListTags-tags">
      {items.map((item) => (
        <Tag size="big" className="SidebarListTags-tag" key={item.id}>
          {item.name}
        </Tag>
      ))}
    </div>
  </Border>
);

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps, {})(SidebarListTags);
