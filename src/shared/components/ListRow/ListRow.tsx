import React from 'react';

import A from 'Components/A';
import { ListState } from 'Modules/Lists/lists.types';
import { SessionState } from 'Modules/Session/session.types';
import { Private, Space, Span, Tag } from 'Vendor/components';

import './ListRow.less';

interface Props extends Partial<ListState> {
  session?: SessionState;
  currentPathname?: string;
}

export const ListRow: React.FC<Props> = ({ id, name, tags, description, isPrivate, currentPathname }) => (
  <div className="ListRow" data-test-id="ListRow" key={id}>
    <div className="ListRow-main">
      <Span size="normal" weight="semiBold" className="ListRow-title">
        <A href={`/lists/${id}`} frontend styled={false}>
          {name}
        </A>
      </Span>
      <Span className="ListRow-description" size="nano">
        {description}
        <Space />
      </Span>
    </div>
    <div className="ListRow-tags">
      {tags?.map((item) => (
        <A
          className="ListRow-tag"
          href={`${currentPathname}?filter[tags][]=${item.name}`}
          key={item.id}
          styled={false}
          frontend
        >
          <Tag size="nano" variant="simple">
            {item.name}
          </Tag>
        </A>
      ))}
    </div>
    <div className="ListRow-icons">{isPrivate && <Private className="ListRow-icon" />}</div>
  </div>
);

export default ListRow;
