import { listsLoadReceive } from 'Modules/Lists/actions/listsLoadReceive';
import { ListsActions, ListsLoadApiResponse, ListState } from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { SectionsActions } from '../sections.types';
import { sectionsSimilarListsRequest } from './sectionsSimilarListsRequest';
import { sectionsSimilarListsSuccess } from './sectionsSimilarListsSuccess';

export const sectionsSimilarListsLoad = (
  listId: number
): AppThunk<Promise<ListState[]>, SectionsActions | ListsActions> => async (
  dispatch,
  getState
): Promise<ListState[]> => {
  try {
    const { Sections: sectionsBeforeRequest } = getState();
    dispatch(
      sectionsSimilarListsRequest({
        ...sectionsBeforeRequest,
        SimilarLists: {
          ...sectionsBeforeRequest.SimilarLists,
          loading: true,
        },
      })
    );

    const { data }: ListsLoadApiResponse = await HttpClient.get(`/lists/${listId}/similar?page[size]=5`);
    const listsArray = data?.map((item) => item.attributes);
    const { Sections: sectionsAfterResponse, Lists: listsAfterResponse } = getState();

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
      sectionsSimilarListsSuccess({
        ...sectionsAfterResponse,
        SimilarLists: {
          ...sectionsAfterResponse.SimilarLists,
          currentIds: data?.map((item) => item.id),
          loading: false,
        },
      })
    );
  } catch (err) {
    throw new Error(err);
  }

  return;
};
