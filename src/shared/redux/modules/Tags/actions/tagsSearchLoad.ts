import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ReceiveTagItem, ReceiveTagsResponse, TagState } from 'Modules/Tags/tags.types';
import HttpClient from 'Services/HttpClient';
import { URLWrapper } from 'Services/URLWrapper';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { loadTagsReceive } from './loadTagsReceive';
import { tagsAllRequest } from './tagsAllRequest';

export const tagsSearchLoad = (searchString?: string): ThunkAction<any, any, any, Action> => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(tagsAllRequest());

    const path = '/tags';
    const urlObject = new URLWrapper(path);
    if (!!searchString) {
      urlObject.deleteSearchParam('filter[tags][]');
      urlObject.upsertSearchParam('filter[tags][]', searchString);
    }
    const apiEndpoint = urlObject.getPathAndSearch();

    const { data }: ReceiveTagsResponse = await HttpClient.get(apiEndpoint);

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
