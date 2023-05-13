import React from 'react';

import UserFollowButton from 'Components/UserFollowButton';
import { Routes } from 'Router/routes';
import { A, Img } from '@antoniodcorrea/components';

interface Props {
  className?: string;
  userId: string;
  userName: string;
  image: string;
  currentSlug: string;
}

export const UserImageWithFollow: React.FC<Props> = ({ className, userId, userName, image, currentSlug }) => (
  <div className={'UserImageWithFollow' + (className ? ' ' + className : '')}>
    <A href={`/${currentSlug}${Routes.Users.route}/${userId}`} frontend styled={false}>
      <Img className="UserImageWithFollow-image" src={image} title={`@${userName}`} alt={`@${userName}`} />
    </A>
    <UserFollowButton className="UserImageWithFollow-followButton" userId={userId} />
  </div>
);
