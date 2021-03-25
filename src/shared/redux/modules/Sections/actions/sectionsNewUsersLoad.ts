import { UsersActions, UsersLoadApiResponse, UserState } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { usersReceive } from '../../Users/actions/usersReceive';
import { SectionsActions } from '../sections.types';
import { sectionsNewUsersRequest } from './sectionsNewUsersRequest';
import { sectionsNewUsersSuccess } from './sectionsNewUsersSuccess';

export const sectionsNewUsersLoad = (): AppThunk<Promise<UserState[]>, UsersActions | SectionsActions> => async (
  dispatch,
  getState
): Promise<UserState[]> => {
  try {
    const { Sections: sectionsBeforeRequest } = getState();
    dispatch(
      sectionsNewUsersRequest({
        ...sectionsBeforeRequest,
        NewUsers: {
          ...sectionsBeforeRequest.NewUsers,
          loading: true,
        },
      })
    );

    const { data } = await HttpClient.get<void, UsersLoadApiResponse>('/users?sort=createdat&page[size]=5');

    const usersArray = data.map((item) => item.attributes);
    const { Users: usersAfterResponse, Sections: sectionsAfterResponse } = getState();

    dispatch(
      usersReceive({
        ...usersAfterResponse,
        byKey: {
          ...usersAfterResponse.byKey,
          ...serializerFromArrayToByKey<UserState, UserState>({
            data: usersArray,
          }),
        },
      })
    );

    dispatch(
      sectionsNewUsersSuccess({
        ...sectionsAfterResponse,
        NewUsers: {
          ...sectionsAfterResponse.NewUsers,
          currentIds: data.map((item) => item.id),
          loading: false,
        },
      })
    );

    return usersArray;
  } catch (err) {
    throw new Error(err);
  }
};
