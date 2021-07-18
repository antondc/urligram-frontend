import {
  TAGS_LOAD_FAILURE,
  TAGS_LOAD_REQUEST,
  TAGS_LOAD_SUCCESS,
  TagsActions,
  TagsLoadApiResponse,
  TagState,
} from 'Modules/Tags/tags.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';

export const tagsLoad =
  (): AppThunk<Promise<TagState[]>, TagsActions> =>
  async (dispatch, getState): Promise<TagState[]> => {
    const { Tags: tagsBeforeApi } = getState();
    try {
      dispatch({
        type: TAGS_LOAD_REQUEST,
        payload: {
          ...tagsBeforeApi,
          loading: true,
        },
      });

      const { meta, data } = await HttpClient.get<void, TagsLoadApiResponse>(`/tags${window.location.search}`);
      const { Tags: tagsAfterApi } = getState();
      const tagsArray = data?.map((item) => item.attributes);

      dispatch({
        type: TAGS_LOAD_SUCCESS,
        payload: {
          ...tagsAfterApi,
          byKey: {
            ...tagsAfterApi.byKey,
            ...serializerFromArrayToByKey<TagState, TagState>({ data: tagsArray }),
          },
          currentIds: data?.map((item) => item.id),
          loading: false,
          meta: {
            sort: meta?.sort,
            totalItems: meta?.totalItems,
          },
        },
      });

      return tagsArray;
    } catch (error) {
      const { Tags: tagsOnError } = getState();

      dispatch({
        type: TAGS_LOAD_FAILURE,
        payload: {
          ...tagsOnError,
          loading: false,
        },
      });
    }

    return;
  };
