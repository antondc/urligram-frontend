import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentRouteParams } from 'Modules/Routes/selectors/selectCurrentRouteParams';
import { UserState } from 'Modules/Users/users.types';
import history from 'Services/History';
import { SidebarLeftSubItemsAnimation } from './SidebarLeftSubItemsAnimation';

import './SidebarLeftUsers.less';

interface Props {
  users: UserState[];
  usersShown?: boolean;
}

const SidebarLeftUsers: React.FC<Props> = ({ users, usersShown = true }) => {
  const currentRouteParams = useSelector(selectCurrentRouteParams);
  const currentFollowerId = currentRouteParams?.userId;

  const onFollowerClick = (followerId: string) => {
    history.push(`/users/${followerId}`);
  };

  if (!users?.length) return null;

  return (
    <div className="SidebarLeftUsers">
      <SidebarLeftSubItemsAnimation mounted={usersShown}>
        <ul className="SidebarLeftUsers-users">
          {users?.map((item, index) => (
            <li
              key={`${item?.id}-${index}`}
              className={
                'SidebarLeftUsers-follower' +
                (currentFollowerId === item?.id ? ' SidebarLeftUsers-follower--active' : '')
              }
              onClick={() => onFollowerClick(item?.id)}
            >
              {item?.name}
            </li>
          ))}
        </ul>
      </SidebarLeftSubItemsAnimation>
    </div>
  );
};
export default SidebarLeftUsers;
