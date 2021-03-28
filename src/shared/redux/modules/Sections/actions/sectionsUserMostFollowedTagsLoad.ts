import { tagsLoadSuccess } from 'Modules/Tags/actions/tagsLoadSuccess';
import { TagsActions, TagsLoadApiResponse, TagState } from 'Modules/Tags/tags.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { SectionsActions } from '../sections.types';
import { sectionsUserMostUsedTagsReceive } from './sectionsUserMostUsedTagsReceive';
import { sectionsUserMostUsedTagsRequest } from './sectionsUserMostUsedTagsRequest';

export const sectionsUserMostUsedTagsLoad = (
  userId: string
): AppThunk<Promise<TagState[]>, TagsActions | SectionsActions> => async (dispatch, getState): Promise<TagState[]> => {
  try {
    const { Sections: sectionsBeforeRequest } = getState();

    dispatch(
      sectionsUserMostUsedTagsRequest({
        ...sectionsBeforeRequest,
        UserMostUsedTags: {
          ...sectionsBeforeRequest.UserMostUsedTags,
          loading: true,
        },
      })
    );

    const { data: myTagsData } = await HttpClient.get<void, TagsLoadApiResponse>(`users/${userId}/tags?page[size]=10`);
    const { Tags: tagsAfterApi, Sections: sectionsAfterResponse } = getState();

    const tagsArray = myTagsData.map((item) => item.attributes);

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
      sectionsUserMostUsedTagsReceive({
        ...sectionsAfterResponse,
        UserMostUsedTags: {
          ...sectionsAfterResponse.UserMostUsedTags,
          currentIds: myTagsData.map((item) => item.id),
          loading: false,
        },
      })
    );

    return tagsArray;
  } catch (err) {
    throw new Error(err);
  }
};
