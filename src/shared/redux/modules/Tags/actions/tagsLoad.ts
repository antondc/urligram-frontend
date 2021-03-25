import { Dispatch } from 'redux';

import { RootState } from 'Modules/rootType';
import { TagsActions, TagsLoadApiResponse, TagState } from 'Modules/Tags/tags.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { tagsLoadRequest } from './tagsLoadRequest';
import { tagsLoadSuccess } from './tagsLoadSuccess';

export const tagsLoad = (): AppThunk<Promise<TagState[]>> => async (
  dispatch: Dispatch<TagsActions>,
  getState: () => RootState
): Promise<TagState[]> => {
  const { Tags: tagsBeforeApi } = getState();
  try {
    dispatch(
      tagsLoadRequest({
        ...tagsBeforeApi,
        loading: true,
      })
    );

    const { data } = await HttpClient.get<void, TagsLoadApiResponse>(`/tags${window.location.search}`);
    const { Tags: tagsAfterApi } = getState();
    const tagsArray = data.map((item) => item.attributes);

    dispatch(
      tagsLoadSuccess({
        ...tagsAfterApi,
        byKey: {
          ...tagsAfterApi.byKey,
          ...serializerFromArrayToByKey<TagState, TagState>({ data: tagsArray }),
        },
        currentIds: data.map((item) => item.id),
      })
    );

    return tagsArray;
  } catch (err) {}

  return;
};
