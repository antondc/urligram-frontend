import { tagsLoadSuccess } from 'Modules/Tags/actions/tagsLoadSuccess';
import { TagsActions, TagsLoadApiResponse, TagState } from 'Modules/Tags/tags.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { SectionsActions } from '../sections.types';
import { sectionsMostUsedTagsRequest } from './sectionsMostUsedTagsRequest';
import { sectionsMostUsedTagsSuccess } from './sectionsMostUsedTagsSuccess';

export const sectionsMostUsedTagsLoad = (): AppThunk<Promise<TagState[]>, TagsActions | SectionsActions> => async (
  dispatch,
  getState
): Promise<TagState[]> => {
  const { Sections: sectionsBeforeApi } = getState();
  try {
    dispatch(
      sectionsMostUsedTagsRequest({
        ...sectionsBeforeApi,
        MostUsedTags: {
          ...sectionsBeforeApi.MostUsedTags,
          loading: true,
        },
      })
    );

    const { data: myTagsData } = await HttpClient.get<void, TagsLoadApiResponse>('/tags?page[size]=10');

    const tagsArray = myTagsData.map((item) => item.attributes);
    const { Sections: sectionsAfterApi, Tags: tagsAfterApi } = getState();

    dispatch(
      tagsLoadSuccess({
        ...tagsAfterApi,
        byKey: {
          ...tagsAfterApi.byKey,
          ...serializerFromArrayToByKey<TagState, TagState>({ data: tagsArray }),
        },
        loading: false,
      })
    );
    dispatch(
      sectionsMostUsedTagsSuccess({
        ...sectionsAfterApi,
        MostUsedTags: {
          ...sectionsAfterApi.MostUsedTags,
          currentIds: myTagsData.map((item) => item.id),
          loading: false,
        },
      })
    );

    return tagsArray;
  } catch (error) {
    throw error;
  }
};
