import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ReceiveListResponse } from 'Modules/Lists/lists.types';
import { loadTagsReceive } from 'Modules/Tags/actions/loadTagsReceive';
import { TagState } from 'Modules/Tags/tags.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { sectionsTagsInThisListReceive } from './sectionsTagsInThisListReceive';
import { sectionsTagsInThisListRequest } from './sectionsTagsInThisListRequest';

export const sectionsTagsInThisListLoad = (listId: number): ThunkAction<any, any, any, Action> => async (
  dispatch?: Dispatch
) => {
  try {
    dispatch(sectionsTagsInThisListRequest());

    const { data: listData }: ReceiveListResponse = await HttpClient.get(`/lists/${listId}`);
    const tagsInList = listData?.attributes?.tags?.slice(0, 10);

    const myTagsByKey = {
      byKey: serializerFromArrayToByKey<TagState, TagState>({
        data: tagsInList,
      }),
    };

    dispatch(loadTagsReceive(myTagsByKey));
    dispatch(
      sectionsTagsInThisListReceive({
        TagsInThisList: {
          currentIds: tagsInList?.map((item) => item.id) || [],
        },
      })
    );
  } catch (err) {
    throw new Error(err);
  }

  return;
};
