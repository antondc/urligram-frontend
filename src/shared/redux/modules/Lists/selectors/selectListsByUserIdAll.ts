import { createSelector } from 'reselect';

import { selectUsers } from '../../Users/selectors/selectUsers';
import { ListState } from '../lists.types';
import { selectLists } from './selectLists';

const selectUserId = (_, { userId }: { userId: string }) => userId;
export const selectListsByUserIdAll = createSelector(
  selectLists,
  selectUsers,
  selectUserId,
  (Lists, Users, userId): ListState[] => Users?.byKey[userId]?.lists?.map((item) => Lists?.byKey[item.id])
);
