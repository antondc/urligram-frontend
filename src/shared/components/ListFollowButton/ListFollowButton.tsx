import React from 'react';

import { EditCircle, Flex, PlusCircleWithBackground, Private, SpinnerCircularBrute } from 'Vendor/components';

import './ListFollowButton.less';

interface Props {
  className?: string;
  sessionUserOwnsList: boolean;
  sessionUserFollowsList: boolean;
  loading: boolean;
  recentlyChanged: boolean;
  isPrivate: boolean;
  size: 'small' | 'normal';
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
  size,
}) => (
  <Flex className={className} growVertical={false} vertical="top" horizontal="right" noWrap onMouseOut={onMouseOut}>
    {isPrivate && <Private size={size === 'normal' ? 'small' : 'micro'} className="ListRow-private" />}
    {!sessionUserOwnsList && !loading && sessionUserFollowsList && (
      <PlusCircleWithBackground
        className={'ListRow-listFollowed ' + (recentlyChanged ? ' ListRow-listFollowed--recentlyChanged' : '')}
        size={size}
        onClick={onUnfollowList}
        onMouseOut={onMouseOut}
      />
    )}
    {!sessionUserOwnsList && !loading && !sessionUserFollowsList && (
      <PlusCircleWithBackground
        className={'ListRow-listNotFollowed' + (recentlyChanged ? ' ListRow-listNotFollowed--recentlyChanged' : '')}
        size={size}
        onClick={onFollowList}
        onMouseOut={onMouseOut}
      />
    )}
    {sessionUserOwnsList && !loading && <EditCircle className="ListRow-listEdit" size={size} onClick={onEdit} />}
    {loading && <SpinnerCircularBrute className="ListRow-loader" size={size} />}
  </Flex>
);

export default ListFollowButton;
