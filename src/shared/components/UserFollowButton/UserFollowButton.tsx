import React from 'react';

import { PlusCircleWithBackground, SpinnerPie } from 'Vendor/components';

import './UserFollowButton.less';

interface Props {
  className?: string;
  loading?: boolean;
  recentlyChanged?: boolean;
  sessionUserFollowsUser?: boolean;
  onMouseOut: () => void;
  onFollow: () => void;
  onUnfollow: () => void;
}

export const UserFollowButton: React.FC<Props> = ({
  className,
  loading,
  recentlyChanged,
  sessionUserFollowsUser,
  onMouseOut,
  onFollow,
  onUnfollow,
}) => (
  <div className={'UserFollowButton' + (className ? ' ' + className : '')} onMouseOut={onMouseOut}>
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
    {loading && <SpinnerPie className="UserFollowButton-loader" />}
  </div>
);

export default UserFollowButton;
