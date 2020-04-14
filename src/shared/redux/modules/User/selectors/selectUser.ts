import { UserState } from '../user.types';

export const selectUser = (state): UserState => state.User;
