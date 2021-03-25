import { TagsActions, TagsLoadApiResponse, TagState } from 'Modules/Tags/tags.types';
import { QueryStringWrapper } from 'Root/src/shared/services/QueryStringWrapper';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { tagsLoadRequest } from './tagsLoadRequest';
import { tagsLoadSuccess } from './tagsLoadSuccess';

export const tagsSearchLoad = (tagStringFragment?: string): AppThunk<Promise<TagState[]>, TagsActions> => async (
  dispatch,
  getState
): Promise<TagState[]> => {
  try {
    const { Tags } = getState();
    dispatch(
      tagsLoadRequest({
        ...Tags,
        loading: true,
      })
    );

    const queryString = !!tagStringFragment
      ? QueryStringWrapper.stringifyQueryParams({ filter: { tags: [tagStringFragment] } })
      : '';

    const { data } = await HttpClient.get<void, TagsLoadApiResponse>(`tags?${queryString}`);
    const tagsArray = data.map((item) => item.attributes);

    const { Tags: tagsAfterApi } = getState();
    dispatch(
      tagsLoadSuccess({
        ...tagsAfterApi,
        byKey: {
          ...tagsAfterApi.byKey,
          ...serializerFromArrayToByKey<TagState, TagState>({ data: tagsArray }),
        },
        searchIds: data.map((item) => item.id),
        loading: false,
      })
    );
  } catch (err) {
    throw new Error(err);
  }

  return;
};
