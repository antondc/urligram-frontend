import { UserState } from './../user.types';
import { createSelector } from 'reselect';
import { selectUser } from './selectUser';

export const selectUserLoggedIn = createSelector(selectUser, (User: UserState): boolean => (User.id ? true : false));
