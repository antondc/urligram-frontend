import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { loadTagsReceive } from 'Modules/Tags/actions/loadTagsReceive';
import { ReceiveTagItem, ReceiveTagsResponse, TagState } from 'Modules/Tags/tags.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { sectionsMostUsedTagsReceive } from './sectionsMostUsedTagsReceive';
import { sectionsMostUsedTagsRequest } from './sectionsMostUsedTagsRequest';

export const sectionsMostUsedTagsLoad = (): ThunkAction<any, any, any, Action> => async (dispatch?: Dispatch) => {
  try {
    dispatch(sectionsMostUsedTagsRequest());

    const { data: myTagsData }: ReceiveTagsResponse = await HttpClient.get('/tags?page[size]=10');

    const myTagsByKey = {
      byKey: serializerFromArrayToByKey<ReceiveTagItem, TagState>({
        data: myTagsData,
        contentPath: 'attributes',
      }),
    };

    dispatch(loadTagsReceive(myTagsByKey));
    dispatch(
      sectionsMostUsedTagsReceive({
        MostUsedTags: {
          currentIds: myTagsData.map((item) => item.id),
        },
      })
    );
  } catch (err) {
    throw new Error(err);
  }

  return;
};
