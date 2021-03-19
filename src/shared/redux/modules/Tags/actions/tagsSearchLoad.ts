import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ReceiveTagItem, ReceiveTagsResponse, TagState } from 'Modules/Tags/tags.types';
import { QueryStringWrapper } from 'Root/src/shared/services/QueryStringWrapper';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { loadTagsReceive } from './loadTagsReceive';
import { tagsAllRequest } from './tagsAllRequest';

export const tagsSearchLoad = (tagStringFragment?: string): ThunkAction<any, any, any, Action> => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(tagsAllRequest());

    const queryString = !!tagStringFragment
      ? QueryStringWrapper.stringifyQueryParams({ filter: { tags: [tagStringFragment] } })
      : '';

    const { data }: ReceiveTagsResponse = await HttpClient.get(`tags?${queryString}`);

    const tagsByKey = {
      byKey: serializerFromArrayToByKey<ReceiveTagItem, TagState>({
        data: data,
        contentPath: 'attributes',
      }),
      searchIds: data.map((item) => item.id),
    };
    dispatch(loadTagsReceive(tagsByKey));
  } catch (err) {
    throw new Error(err);
  }

  return;
};
