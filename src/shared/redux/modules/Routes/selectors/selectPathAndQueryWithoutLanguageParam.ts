import { createSelector } from 'reselect';

import { selectLanguagesSlugList } from 'Modules/Languages/selectors/selectLanguagesSlugList';
import { selectCurrentPathAndQuery } from 'Modules/Routes/selectors/selectCurrentPathAndQuery';

export const selectPathAndQueryWithoutLanguageParam = createSelector(
  selectCurrentPathAndQuery,
  selectLanguagesSlugList,
  (currentPathAndQuery: string, languagesSlugList: string[]): string => {
    const regex = new RegExp(`/[${languagesSlugList}]{2}/`);
    const pathWithoutLanguageSlug = currentPathAndQuery.replace(regex, '/');

    return pathWithoutLanguageSlug;
  }
);
