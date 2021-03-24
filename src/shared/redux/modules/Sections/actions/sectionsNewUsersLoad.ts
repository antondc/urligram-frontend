import { Dispatch } from 'redux';

import { RootState } from 'Modules/rootType';
import { UsersActions, UsersLoadApiResponse, UserState } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { usersReceive } from '../../Users/actions/usersReceive';
import { SectionsActions } from '../sections.types';
import { sectionsNewUsersReceive } from './sectionsNewUsersReceive';
import { sectionsNewUsersRequest } from './sectionsNewUsersRequest';

export const sectionsNewUsersLoad = (): AppThunk<Promise<UserState[]>> => async (
  dispatch: Dispatch<UsersActions | SectionsActions>,
  getState: () => RootState
): Promise<UserState[]> => {
  try {
    dispatch(sectionsNewUsersRequest());

    const { data } = await HttpClient.get<void, UsersLoadApiResponse>('/users?sort=createdat&page[size]=5');

    const usersArray = data.map((item) => item.attributes);

    const { Users } = getState();
    dispatch(
      usersReceive({
        ...Users,
        byKey: {
          ...Users.byKey,
          ...serializerFromArrayToByKey<UserState, UserState>({
            data: usersArray,
          }),
        },
        loading: false,
      })
    );

    dispatch(
      sectionsNewUsersReceive({
        NewUsers: {
          currentIds: data.map((item) => item.id),
        },
      })
    );

    return usersArray;
  } catch (err) {
    throw new Error(err);
  }
};
