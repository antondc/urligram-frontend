import {
  TAGS_LOAD_BY_USER_ID_FAILURE,
  TAGS_LOAD_BY_USER_ID_REQUEST,
  TAGS_LOAD_BY_USER_ID_SUCCESS,
  TagsActions,
  TagsLoadApiResponse,
  TagState,
} from 'Modules/Tags/tags.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';

export const tagsLoadByUserId = (userId: string): AppThunk<Promise<TagState[]>, TagsActions> => async (
  dispatch,
  getState
): Promise<TagState[]> => {
  const { Tags: tagsBeforeRequest } = getState();

  dispatch({
    type: TAGS_LOAD_BY_USER_ID_REQUEST,
    payload: {
      ...tagsBeforeRequest,
      loading: true,
    },
  });

  try {
    const { meta, data } = await HttpClient.get<void, TagsLoadApiResponse>(
      `/users/${userId}/tags${window.location.search}`
    );

    const { Tags: tagsAfterResponse } = getState();
    const tagsArray = data?.map((item) => item.attributes);

    dispatch({
      type: TAGS_LOAD_BY_USER_ID_SUCCESS,
      payload: {
        ...tagsAfterResponse,
        byKey: {
          ...tagsAfterResponse.byKey,
          ...serializerFromArrayToByKey<TagState, TagState>({ data: tagsArray }),
        },
        currentIds: data?.map((item) => item.id),
        meta: {
          sort: meta?.sort,
          totalItems: meta?.totalItems,
        },
        loading: false,
      },
    });

    return tagsArray;
  } catch (error) {
    const { Tags: tagsOnError } = getState();

    dispatch({
      type: TAGS_LOAD_BY_USER_ID_FAILURE,
      payload: {
        ...tagsOnError,
        loading: false,
      },
    });
  }

  return;
};
