import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ReceiveTagItem, ReceiveTagsResponse, TagState } from 'Modules/Tags/tags.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { loadTagsReceive } from './loadTagsReceive';
import { tagsAllRequest } from './tagsAllRequest';

export const tagsAllLoad = (): ThunkAction<any, any, any, Action> => async (dispatch: Dispatch) => {
  try {
    dispatch(tagsAllRequest());

    const { data }: ReceiveTagsResponse = await HttpClient.get('tags');

    const tagsByKey = {
      byKey: serializerFromArrayToByKey<ReceiveTagItem, TagState>({
        data: data,
        contentPath: 'attributes',
      }),
      currentIds: data.map((item) => item.id),
    };
    dispatch(loadTagsReceive(tagsByKey));
  } catch (err) {
    throw new Error(err);
  }

  return;
};
