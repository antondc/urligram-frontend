import { listsLoadReceive } from 'Modules/Lists/actions/listsLoadReceive';
import { ListsActions, ListsLoadApiResponse, ListState } from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { SectionsActions } from '../sections.types';
import { sectionsNewListsRequest } from './sectionsNewListsRequest';
import { sectionsNewListsSuccess } from './sectionsNewListsSuccess';

export const sectionsNewListsLoad = (): AppThunk<Promise<ListState[]>, ListsActions | SectionsActions> => async (
  dispatch,
  getState
): Promise<ListState[]> => {
  try {
    const { Sections: sectionsBeforeApi } = getState();
    dispatch(
      sectionsNewListsRequest({
        ...sectionsBeforeApi,
        NewLists: {
          ...sectionsBeforeApi.NewLists,
          loading: true,
        },
      })
    );

    const { data }: ListsLoadApiResponse = await HttpClient.get('/lists?sort=-createdAt&page[size]=5');
    const listsArray = data?.map((item) => item.attributes);
    const { Sections: sectionsAfterApi, Lists: listsAfterApi } = getState();

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
      sectionsNewListsSuccess({
        ...sectionsAfterApi,
        NewLists: {
          ...sectionsAfterApi.NewLists,
          currentIds: data?.map((item) => item.id),
          loading: false,
        },
      })
    );
  } catch (error) {
    throw error;
  }

  return;
};
