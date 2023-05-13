import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { UserImageWithFollow as UserImageWithFollowUi } from './UserImageWithFollow';

import './UserImageWithFollow.less';

interface Props {
  className?: string;
  userId: string;
  userName: string;
  image: string;
}

const UserImageWithFollow: React.FC<Props> = ({ className, userId, userName, image }) => {
  const currentSlug = useSelector(selectCurrentLanguageSlug);

  return (
    <UserImageWithFollowUi
      className={className}
      userId={userId}
      userName={userName}
      image={image}
      currentSlug={currentSlug}
    />
  );
};

export default UserImageWithFollow;
