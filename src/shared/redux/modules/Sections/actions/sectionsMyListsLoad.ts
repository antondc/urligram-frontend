import { listsLoadReceive } from 'Modules/Lists/actions/listsLoadReceive';
import { ListsActions, ListsLoadApiResponse, ListState } from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { SectionsActions } from '../sections.types';
import { sectionsMyListsRequest } from './sectionsMyListsRequest';
import { sectionsMyListsSuccess } from './sectionsMyListsSuccess';

export const sectionsMyListsLoad = (
  sessionId: string
): AppThunk<Promise<ListState[]>, ListsActions | SectionsActions> => async (
  dispatch,
  getState
): Promise<ListState[]> => {
  const { Sections: sectionsBeforeApi } = getState();
  if (!sessionId) return;

  try {
    dispatch(
      sectionsMyListsRequest({
        ...sectionsBeforeApi,
        MyLists: {
          ...sectionsBeforeApi.MyLists,
          loading: true,
        },
      })
    );

    const { data } = await HttpClient.get<void, ListsLoadApiResponse>(
      `/users/${sessionId}/lists?page[size]=5&filter[role]=admin`
    );
    const { Sections: sectionsAfterApi, Lists: listsAfterApi } = getState();

    const listsArray = data?.map((item) => item.attributes);

    dispatch(
      listsLoadReceive({
        ...listsAfterApi,
        byKey: {
          ...listsAfterApi.byKey,
          ...serializerFromArrayToByKey<ListState, ListState>({ data: listsArray }),
        },
      })
    );

    dispatch(
      sectionsMyListsSuccess({
        ...sectionsAfterApi,
        MyLists: {
          ...sectionsAfterApi.MyLists,
          currentIds: data?.map((item) => item.id),
          loading: false,
        },
      })
    );

    return listsArray;
  } catch (err) {
    throw new Error(err);
  }
};
