import { listsLoadReceive } from 'Modules/Lists/actions/listsLoadReceive';
import { ListsActions, ListsLoadApiResponse, ListState } from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { SectionsActions } from '../sections.types';
import { sectionsPopularListsRequest } from './sectionsPopularListsRequest';
import { sectionsPopularListsSuccess } from './sectionsPopularListsSuccess';

export const sectionsPopularListsLoad = (): AppThunk<Promise<ListState[]>, SectionsActions | ListsActions> => async (
  dispatch,
  getState
): Promise<ListState[]> => {
  const { Sections: sectionsBeforeRequest } = getState();

  try {
    dispatch(
      sectionsPopularListsRequest({
        ...sectionsBeforeRequest,
        PopularLists: {
          ...sectionsBeforeRequest,
          loading: true,
        },
      })
    );
    const { data } = await HttpClient.get<void, ListsLoadApiResponse>('/lists?sort=-members&page[size]=5');
    const listsArray = data?.map((item) => item.attributes);
    const { Sections: sectionsAfterApi, Lists: listsAfterResponse } = getState();

    dispatch(
      listsLoadReceive({
        ...listsAfterResponse,
        byKey: {
          ...listsAfterResponse.byKey,
          ...serializerFromArrayToByKey<ListState, ListState>({ data: listsArray }),
        },
      })
    );

    dispatch(
      sectionsPopularListsSuccess({
        ...sectionsAfterApi,
        PopularLists: {
          ...sectionsAfterApi.PopularLists,
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
