import { TagsActions, TagsLoadApiResponse, TagState } from 'Modules/Tags/tags.types';
import { tagsLoadSuccess } from 'Root/src/shared/redux/modules/Tags/actions/tagsLoadSuccess';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { SectionsActions } from '../sections.types';
import { sectionsTagsInThisListReceive } from './sectionsTagsInThisListReceive';
import { sectionsTagsInThisListRequest } from './sectionsTagsInThisListRequest';

export const sectionsTagsInThisListLoad = (
  listId: number
): AppThunk<Promise<TagState[]>, TagsActions | SectionsActions> => async (dispatch, getState): Promise<TagState[]> => {
  try {
    const { Sections: sectionsBeforeRequest } = getState();
    dispatch(
      sectionsTagsInThisListRequest({
        ...sectionsBeforeRequest,
        TagsInThisList: {
          ...sectionsBeforeRequest.TagsInThisList,
          loading: true,
        },
      })
    );

    const { data: myTagsData } = await HttpClient.get<void, TagsLoadApiResponse>(`/lists/${listId}`);
    const tagsArray = myTagsData.map((item) => item.attributes);

    const { Tags: tagsAfterApi, Sections: sectionsAfterResponse } = getState();
    dispatch(
      tagsLoadSuccess({
        ...tagsAfterApi,
        byKey: {
          ...tagsAfterApi.byKey,
          ...serializerFromArrayToByKey<TagState, TagState>({ data: tagsArray }),
        },
        loading: false,
      })
    );
    dispatch(
      sectionsTagsInThisListReceive({
        ...sectionsAfterResponse,
        TagsInThisList: {
          ...sectionsAfterResponse.TagsInThisList,
          currentIds: tagsArray?.map((item) => item.id) || [],
          loading: false,
        },
      })
    );

    return tagsArray;
  } catch (err) {
    throw new Error(err);
  }
};
