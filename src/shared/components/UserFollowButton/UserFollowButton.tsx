import React from 'react';

import { PlusCircleWithBackground, Spinner, Tooltip } from '@antoniodcorrea/components';
import { RenderInPortal } from '../Portal';

import './UserFollowButton.less';

interface Props {
  className?: string;
  userId: string;
  userName: string;
  loading?: boolean;
  recentlyChanged?: boolean;
  sessionUserFollowsUser?: boolean;
  onMouseOut: () => void;
  onFollow: () => void;
  onUnfollow: () => void;
}

export const UserFollowButton: React.FC<Props> = ({
  className,
  userId,
  userName,
  loading,
  recentlyChanged,
  sessionUserFollowsUser,
  onMouseOut,
  onFollow,
  onUnfollow,
}) => (
  <div
    id={`UserFollowButton--${userId}`}
    className={'UserFollowButton' + (className ? ' ' + className : '')}
    onMouseOut={onMouseOut}
  >
    {sessionUserFollowsUser && (
      <PlusCircleWithBackground
        className={
          'UserFollowButton-followed ' + (recentlyChanged ? ' UserFollowButton-followed--recentlyChanged' : '')
        }
        size="micro"
        onClick={onUnfollow}
      />
    )}
    {!sessionUserFollowsUser && (
      <PlusCircleWithBackground
        className={
          'UserFollowButton-notFollowed' + (recentlyChanged ? ' UserFollowButton-notFollowed--recentlyChanged' : '')
        }
        size="micro"
        onClick={onFollow}
      />
    )}
    {loading && <Spinner className="UserFollowButton-loader" />}
    <RenderInPortal>
      <Tooltip
        parentElementId={`UserFollowButton--${userId}`}
        content={!sessionUserFollowsUser ? `Follow @${userName}` : `Unfollow @${userName}`}
        delay={1}
      />
    </RenderInPortal>
  </div>
);
