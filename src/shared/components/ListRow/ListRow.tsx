import React from 'react';

import A from 'Components/A';
import { ListState } from 'Modules/Lists/lists.types';
import { SessionState } from 'Modules/Session/session.types';
import {
  Bookmark,
  Border,
  Edit,
  Fade,
  Flex,
  PlusCircleWithBackground,
  Private,
  Span,
  Tag,
  User,
} from '@antoniodcorrea/components';

import './ListRow.less';

interface Props extends Partial<ListState> {
  isPrivateRequestFailed: boolean;
  isPrivateRequestPending: boolean;
  sessionUserFollowsList: boolean;
  sessionUserOwnsList: boolean;
  sessionUserRole?: string;
  session?: SessionState;
  onEdit: () => void;
  onPrivateSwitch: () => void;
}

export const ListRow: React.FC<Props> = ({
  id,
  session,
  name,
  tags,
  bookmarksIds,
  members,
  description,
  onEdit,
  onPrivateSwitch,
  isPrivate,
  isPrivateRequestFailed,
  isPrivateRequestPending,
  sessionUserOwnsList,
  sessionUserFollowsList,
  sessionUserRole,
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
        {sessionUserRole && <Span size="nano">{sessionUserRole}</Span>}
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
          <User size="nano" className="ListRow-statIcon" /> {members?.length || 0}
        </Span>
      </Flex>
    </div>
    <div className={'ListRow-sideIcon' + (false ? ' ListRow--pending' : '')}>
      {sessionUserOwnsList && <img className="ListRow-userLogo" src={session?.image} />}
      {!sessionUserOwnsList && sessionUserFollowsList && (
        <PlusCircleWithBackground className="ListRow-listFollowed" size="medium" onClick={() => {}} />
      )}
      {!sessionUserOwnsList && !sessionUserFollowsList && (
        <PlusCircleWithBackground className="ListRow-listNotFollowed" size="medium" onClick={() => {}} />
      )}
    </div>
  </Border>
);

export default ListRow;
