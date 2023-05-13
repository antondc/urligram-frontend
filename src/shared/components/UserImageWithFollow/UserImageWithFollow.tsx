import React from 'react';

import UserFollowButton from 'Components/UserFollowButton';
import { A, Img } from '@antoniodcorrea/components';

interface Props {
  className?: string;
  userId: string;
  userName: string;
  image: string;
}

export const UserImageWithFollow: React.FC<Props> = ({ className, userId, userName, image }) => (
  <div className={'UserImageWithFollow' + (className ? ' ' + className : '')}>
    <A href={`users/${userId}`} frontend styled={false}>
      <Img className="UserImageWithFollow-image" src={image} title={`@${userName}`} alt={`@${userName}`} />
    </A>
    <UserFollowButton className="UserImageWithFollow-followButton" userId={userId} />
  </div>
);
