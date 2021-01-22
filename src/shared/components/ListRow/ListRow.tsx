import React from 'react';

import { ListState } from 'Modules/Lists/lists.types';
import { A, Border, Hr, Span, Tag } from '@antoniodcorrea/components';

import './ListRow.less';

interface ListRow extends Partial<ListState> {
  sinceTranslation: string;
}

export const ListRow: React.FC<ListRow> = ({
  id,
  name,
  image,
  tags,
  bookmarksIds,
  members,
  createdAt,
  sinceTranslation,
}) => (
  <Border grow className="ListRow" data-test-id="ListRow" key={'ListRow-' + id}>
    <div className="ListRow-left">
      <div className="ListRow-leftTop">
        <Span bold size="small" className="ListRow-title">
          @{name}
        </Span>
        <Hr spacer size="nano" />
        <div className="ListRow-details">
          <Span size="nano">
            <A href={'users'} styled frontend disabled={!members.length}>
              {members?.length} users
            </A>{' '}
            ·{' '}
            <A href={`lists/${id}`} styled frontend disabled={!bookmarksIds?.length}>
              {bookmarksIds?.length} bookmarks
            </A>{' '}
            · {sinceTranslation?.toLocaleLowerCase()} {createdAt}
          </Span>
        </div>
      </div>
      <div className="ListRow-tags">
        {tags?.map((item) => (
          <A href={`tags/${item.name}`} key={item.id} styled={false} frontend>
            <Tag className="ListRow-tag" size="small">
              {item.name}
            </Tag>
          </A>
        ))}
      </div>
    </div>
    <div className="ListRow-right">
      <A href={`lists/${id}`} styled={false} frontend>
        <img className="ListRow-image" src={image} />
      </A>
    </div>
  </Border>
);

export default ListRow;
