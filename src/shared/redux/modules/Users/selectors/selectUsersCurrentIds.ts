import { createSelector } from 'reselect';

import { UsersState } from '../users.types';
import { selectUsers } from './selectUsers';

export const selectUsersCurrentIds = createSelector(selectUsers, (Users: UsersState): string[] => Users?.currentIds);
