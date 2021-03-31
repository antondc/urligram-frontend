import React from 'react';

import A from 'Components/A';
import { ListState } from 'Modules/Lists/lists.types';
import { Bookmark, Border, Edit, Fade, Flex, List, Private, Span, Tag, User } from '@antoniodcorrea/components';

import './ListRow.less';

interface Props extends Partial<ListState> {
  isPrivateRequestFailed: boolean;
  isPrivateRequestPending: boolean;
  sessionUserFollowsList: boolean;
  sessionUserOwnsList: boolean;
  onEdit: () => void;
  onPrivateSwitch: () => void;
}

export const ListRow: React.FC<Props> = ({
  id,
  name,
  tags,
  bookmarksIds,
  membersIds,
  description,
  onEdit,
  onPrivateSwitch,
  isPrivate,
  isPrivateRequestFailed,
  isPrivateRequestPending,
  sessionUserOwnsList,
  sessionUserFollowsList,
}) => (
  <Border grow className="ListRow" data-test-id="ListRow" key={id}>
    <div className="ListRow-left">
      <Span size="normal" bold className="ListRow-title">
        <A href={`/lists/${id}`} frontend styled={false}>
          {name}
        </A>
      </Span>
      <Span className="ListRow-description" size="small">
        {description}
      </Span>
    </div>
    <div className="ListRow-center">
      {tags?.map((item) => (
        <A className="ListRow-tag" href={`/links?filter[tags][]=${item.name}`} key={item.id} styled={false} frontend>
          <Tag size="nano" variant="simple">
            {item.name}
          </Tag>
        </A>
      ))}
    </div>
    <div className="ListRow-right">
      <Flex vertical="center" horizontal="right" growVertical={false}>
        <Fade classname="ListRow-icon" mounted={sessionUserOwnsList && isPrivate} speed="fast">
          <Private
            size="micro"
            className={
              'ListRow-action ListRow-private' +
              (isPrivateRequestPending ? ' ListRow--pending' : '') +
              (isPrivateRequestFailed ? ' ListRow--failed' : '')
            }
            onClick={onPrivateSwitch}
          />
        </Fade>
        {sessionUserOwnsList && <Edit size="micro" className="ListRow-action" onClick={onEdit} />}
      </Flex>
      <Flex horizontal="right" growVertical={false} noWrap>
        <Span size="micro" className="ListRow-stat">
          <Bookmark size="nano" className="ListRow-statIcon" /> {bookmarksIds?.length || 0}
        </Span>
        <Span size="micro" className="ListRow-stat">
          <User size="nano" className="ListRow-statIcon" /> {membersIds?.length || 0}
        </Span>
      </Flex>
    </div>
    <List
      className={
        'ListRow-list ' +
        (sessionUserFollowsList ? ' ListRow-list--followed' : '') +
        (sessionUserOwnsList ? ' ListRow-list--owned' : '')
      }
      size="small"
    />
  </Border>
);

export default ListRow;
