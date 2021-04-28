import React from 'react';

import { PlusCircleWithBackground, SpinnerLoader } from 'Vendor/components';

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
          'UserFollowButton-listFollowed ' + (recentlyChanged ? ' UserFollowButton-listFollowed--recentlyChanged' : '')
        }
        size="micro"
        onClick={onUnfollow}
      />
    )}
    {!sessionUserFollowsUser && (
      <PlusCircleWithBackground
        className={
          'UserFollowButton-listNotFollowed' +
          (recentlyChanged ? ' UserFollowButton-listNotFollowed--recentlyChanged' : '')
        }
        size="micro"
        onClick={onFollow}
      />
    )}
    {loading && <SpinnerLoader className="UserFollowButton-loader" size="nano" />}
  </div>
);

export default UserFollowButton;
