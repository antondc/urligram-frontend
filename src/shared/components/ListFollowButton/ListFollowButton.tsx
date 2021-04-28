import React from 'react';

import { EditCircle, Flex, PlusCircleWithBackground, Private, SpinnerLoader } from 'Vendor/components';

import './ListFollowButton.less';

interface Props {
  className?: string;
  sessionUserOwnsList: boolean;
  sessionUserFollowsList: boolean;
  loading: boolean;
  recentlyChanged: boolean;
  isPrivate: boolean;
  onEdit: () => void;
  onMouseOut: () => void;
  onUnfollowList: () => void;
  onFollowList: () => void;
}

export const ListFollowButton: React.FC<Props> = ({
  className,
  loading,
  recentlyChanged,
  sessionUserOwnsList,
  sessionUserFollowsList,
  isPrivate,
  onEdit,
  onMouseOut,
  onUnfollowList,
  onFollowList,
}) => (
  <Flex className={className} growVertical={false} vertical="top" horizontal="right" noWrap onMouseOut={onMouseOut}>
    {isPrivate && <Private size="micro" className="ListRow-private" />}
    {!sessionUserOwnsList && !loading && sessionUserFollowsList && (
      <PlusCircleWithBackground
        className={'ListRow-listFollowed ' + (recentlyChanged ? ' ListRow-listFollowed--recentlyChanged' : '')}
        size="small"
        onClick={onUnfollowList}
        onMouseOut={onMouseOut}
      />
    )}
    {!sessionUserOwnsList && !loading && !sessionUserFollowsList && (
      <PlusCircleWithBackground
        className={'ListRow-listNotFollowed' + (recentlyChanged ? ' ListRow-listNotFollowed--recentlyChanged' : '')}
        size="small"
        onClick={onFollowList}
        onMouseOut={onMouseOut}
      />
    )}
    {sessionUserOwnsList && !loading && <EditCircle className="ListRow-listEdit" size="small" onClick={onEdit} />}
    {loading && <SpinnerLoader className="ListRow-loader" size="small" />}
  </Flex>
);

export default ListFollowButton;
