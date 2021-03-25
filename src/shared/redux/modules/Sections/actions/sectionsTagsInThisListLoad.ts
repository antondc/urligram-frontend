import { Dispatch } from 'redux';

import { RootState } from 'Modules/rootType';
import { TagsActions, TagsLoadApiResponse, TagState } from 'Modules/Tags/tags.types';
import { tagsLoadSuccess } from 'Root/src/shared/redux/modules/Tags/actions/tagsLoadSuccess';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { SectionsActions } from '../sections.types';
import { sectionsTagsInThisListReceive } from './sectionsTagsInThisListReceive';
import { sectionsTagsInThisListRequest } from './sectionsTagsInThisListRequest';

export const sectionsTagsInThisListLoad = (listId: number): AppThunk<Promise<TagState[]>> => async (
  dispatch: Dispatch<TagsActions | SectionsActions>,
  getState: () => RootState
): Promise<TagState[]> => {
  try {
    dispatch(sectionsTagsInThisListRequest());

    const { data: myTagsData } = await HttpClient.get<void, TagsLoadApiResponse>(`/lists/${listId}`);

    const tagsArray = myTagsData.map((item) => item.attributes);

    const { Tags: tagsAfterApi } = getState();
    dispatch(
      tagsLoadSuccess({
        ...tagsAfterApi,
        byKey: {
          ...tagsAfterApi.byKey,
          ...serializerFromArrayToByKey<TagState, TagState>({ data: tagsArray }),
        },
      })
    );
    dispatch(
      sectionsTagsInThisListReceive({
        TagsInThisList: {
          currentIds: tagsArray?.map((item) => item.id) || [],
        },
      })
    );

    return tagsArray;
  } catch (err) {
    throw new Error(err);
  }
};
