import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ReceiveTagItem, ReceiveTagsResponse, TagState } from 'Modules/Tags/tags.types';
import { serializerFromArrayToByKey } from 'Root/src/shared/tools/utils/serializers/serializerFromArrayToByKey';
import HttpClient from 'Services/HttpClient';
import { loadTagsReceive } from '../../Tags/actions/loadTagsReceive';
import { sectionsMyTagsReceive } from './sectionsMyTagsReceive';
import { sectionsMyTagsRequest } from './sectionsMyTagsRequest';

export const sectionsMyTagsLoad = (sessionId: string): ThunkAction<any, any, any, Action> => async (
  dispatch?: Dispatch
) => {
  dispatch(sectionsMyTagsRequest());

  const { data: myTagsData }: ReceiveTagsResponse = await HttpClient.get(`/users/${sessionId}/tags?page[size]=10`);

  const myTagsByKey = {
    byKey: serializerFromArrayToByKey<ReceiveTagItem, TagState>({
      data: myTagsData,
      contentPath: 'attributes',
    }),
  };

  dispatch(loadTagsReceive(myTagsByKey));
  dispatch(
    sectionsMyTagsReceive({
      MyTags: {
        currentIds: myTagsData.map((item) => item.id),
      },
    })
  );

  return;
};
