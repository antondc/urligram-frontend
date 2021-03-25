import { TagsActions, TagsLoadApiResponse, TagState } from 'Modules/Tags/tags.types';
import { tagsLoadSuccess } from 'Root/src/shared/redux/modules/Tags/actions/tagsLoadSuccess';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { SectionsActions } from '../sections.types';
import { sectionsMyTagsRequest } from './sectionsMyTagsRequest';
import { sectionsMyTagsSuccess } from './sectionsMyTagsSuccess';

export const sectionsMyTagsLoad = (
  sessionId: string
): AppThunk<Promise<TagState[]>, TagsActions | SectionsActions> => async (dispatch, getState): Promise<TagState[]> => {
  const { Sections: sectionsBeforeApi } = getState();
  try {
    dispatch(
      sectionsMyTagsRequest({
        ...sectionsBeforeApi,
        MyTags: {
          ...sectionsBeforeApi.MyTags,
          loading: true,
        },
      })
    );

    const { data: myTagsData } = await HttpClient.get<void, TagsLoadApiResponse>(
      `/users/${sessionId}/tags?page[size]=10`
    );
    const { Sections: sectionsAfterApi, Tags: tagsAfterApi } = getState();

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
      sectionsMyTagsSuccess({
        ...sectionsAfterApi,
        MyTags: {
          ...sectionsAfterApi.MyTags,
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
