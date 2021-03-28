import { ListLoadApiResponse } from 'Modules/Lists/lists.types';
import { tagsLoadSuccess } from 'Modules/Tags/actions/tagsLoadSuccess';
import { TagsActions, TagState } from 'Modules/Tags/tags.types';
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

    const { data: listData } = await HttpClient.get<void, ListLoadApiResponse>(`/lists/${listId}`);
    const { tags: tagsArray } = listData?.attributes;

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
