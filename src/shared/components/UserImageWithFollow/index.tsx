import React from 'react';

import { UserImageWithFollow as UserImageWithFollowUi } from './UserImageWithFollow';

import './UserImageWithFollow.less';

interface Props {
  className?: string;
  userId: string;
  userName: string;
  image: string;
}

const UserImageWithFollow: React.FC<Props> = ({ className, userId, userName, image }) => (
  <UserImageWithFollowUi className={className} userId={userId} userName={userName} image={image} />
);

export default UserImageWithFollow;
