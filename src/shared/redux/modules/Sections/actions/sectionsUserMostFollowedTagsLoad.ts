import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ReceiveTagItem, ReceiveTagsResponse, TagState } from 'Modules/Tags/tags.types';
import { serializerFromArrayToByKey } from 'Root/src/shared/tools/utils/serializers/serializerFromArrayToByKey';
import HttpClient from 'Services/HttpClient';
import { loadTagsReceive } from '../../Tags/actions/loadTagsReceive';
import { sectionsUserMostUsedTagsReceive } from './sectionsUserMostUsedTagsReceive';
import { sectionsUserMostUsedTagsRequest } from './sectionsUserMostUsedTagsRequest';

export const sectionsUserMostUsedTagsLoad = (userId: string): ThunkAction<any, any, any, Action> => async (
  dispatch?: Dispatch
) => {
  dispatch(sectionsUserMostUsedTagsRequest());

  const { data: myTagsData }: ReceiveTagsResponse = await HttpClient.get(`users/${userId}/tags?page[size]=10`);

  const myTagsByKey = {
    byKey: serializerFromArrayToByKey<ReceiveTagItem, TagState>({
      data: myTagsData,
      contentPath: 'attributes',
    }),
  };

  dispatch(loadTagsReceive(myTagsByKey));
  dispatch(
    sectionsUserMostUsedTagsReceive({
      UserMostUsedTags: {
        currentIds: myTagsData.map((item) => item.id),
      },
    })
  );

  return;
};
