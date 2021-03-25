import { Dispatch } from 'redux';

import { RootState } from 'Modules/rootType';
import { TagsActions, TagsLoadApiResponse, TagState } from 'Modules/Tags/tags.types';
import { tagsLoadSuccess } from 'Root/src/shared/redux/modules/Tags/actions/tagsLoadSuccess';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { SectionsActions } from '../sections.types';
import { sectionsUserMostUsedTagsReceive } from './sectionsUserMostUsedTagsReceive';
import { sectionsUserMostUsedTagsRequest } from './sectionsUserMostUsedTagsRequest';

export const sectionsUserMostUsedTagsLoad = (userId: string): AppThunk<Promise<TagState[]>> => async (
  dispatch: Dispatch<TagsActions | SectionsActions>,
  getState: () => RootState
): Promise<TagState[]> => {
  try {
    dispatch(sectionsUserMostUsedTagsRequest());

    const { data: myTagsData } = await HttpClient.get<void, TagsLoadApiResponse>(`users/${userId}/tags?page[size]=10`);

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
      sectionsUserMostUsedTagsReceive({
        UserMostUsedTags: {
          currentIds: myTagsData.map((item) => item.id),
        },
      })
    );

    return tagsArray;
  } catch (err) {
    throw new Error(err);
  }
};
