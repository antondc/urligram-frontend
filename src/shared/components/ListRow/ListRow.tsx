import React from 'react';

import A from 'Components/A';
import { ListState } from 'Modules/Lists/lists.types';
import { SessionState } from 'Modules/Session/session.types';
import { Bookmark, Border, Fade, Flex, Private, Span, Tag, User } from '@antoniodcorrea/components';
import ListFollowButton from '../ListFollowButton';

import './ListRow.less';

interface Props extends Partial<ListState> {
  isPrivateRequestFailed: boolean;
  isPrivateRequestPending: boolean;
  sessionUserOwnsList: boolean;
  session?: SessionState;
  onEdit: () => void;
  onPrivateSwitch: () => void;
}

export const ListRow: React.FC<Props> = ({
  id,
  name,
  tags,
  bookmarksIds,
  members,
  description,
  onPrivateSwitch,
  isPrivate,
  isPrivateRequestFailed,
  isPrivateRequestPending,
  sessionUserOwnsList,
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
      </Flex>
      <Flex horizontal="right" growVertical={false} noWrap>
        <Span size="micro" className="ListRow-stat">
          <Bookmark size="nano" className="ListRow-statIcon" /> {bookmarksIds?.length || 0}
        </Span>
        <Span size="micro" className="ListRow-stat">
          <User size="nano" className="ListRow-statIcon" /> {members?.length || 0}
        </Span>
      </Flex>
    </div>
    <ListFollowButton listId={id} className="ListRow-followButton" />
  </Border>
);

export default ListRow;
