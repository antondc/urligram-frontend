import React from 'react';

import List from 'Assets/svg/list.svg';
import A from 'Components/A';
import { ListState } from 'Modules/Lists/lists.types';
import { SessionState } from 'Modules/Session/session.types';
import { Private, Tag } from '@antoniodcorrea/components';

import './ListRow.less';

interface Props extends Partial<ListState> {
  session?: SessionState;
  currentPathname?: string;
}

export const ListRow: React.FC<Props> = ({ id, name, tags, description, isPrivate, currentPathname }) => (
  <div className="ListRow" data-test-id="ListRow" key={id}>
    <div className="ListRow-title">
      <A href={`/lists/${id}`} frontend styled={false}>
        <List className="ListRow-titleIcon" />
        {name}
      </A>
    </div>
    <div className="ListRow-description">{description}</div>
    <div className="ListRow-tags">
      {tags?.map((item) => (
        <A
          className="ListRow-tag"
          href={`${currentPathname}?filter[tags][]=${item.name}`}
          key={item.id}
          styled={false}
          frontend
        >
          <Tag>{item.name}</Tag>
        </A>
      ))}
    </div>
    <div className="ListRow-icons">{isPrivate && <Private className="ListRow-icon" />}</div>
  </div>
);
