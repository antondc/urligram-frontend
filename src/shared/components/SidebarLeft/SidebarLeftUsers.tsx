import React from 'react';
import { useSelector } from 'react-redux';

import User from 'Assets/svg/userFill.svg';
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

  const onUserClick = (userId: string) => {
    history.push(`/users/${userId}`);
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
                'SidebarLeftUsers-user' + (currentFollowerId === item?.id ? ' SidebarLeftUsers-user--active' : '')
              }
              onClick={() => onUserClick(item?.id)}
            >
              <User className="SidebarLeftUsers-icon" /> {item?.name}
            </li>
          ))}
        </ul>
      </SidebarLeftSubItemsAnimation>
    </div>
  );
};
export default SidebarLeftUsers;
