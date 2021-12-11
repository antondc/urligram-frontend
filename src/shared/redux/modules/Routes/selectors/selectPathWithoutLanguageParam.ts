import { createSelector } from 'reselect';

import { selectLanguagesSlugList } from 'Modules/Languages/selectors/selectLanguagesSlugList';
import { selectCurrentPathname } from 'Modules/Routes/selectors/selectCurrentPathname';

export const selectPathWithoutLanguageParam = createSelector(
  selectCurrentPathname,
  selectLanguagesSlugList,
  (currentPathname: string, languagesSlugList: string[]): string => {
    const regex = new RegExp(`/[${languagesSlugList}]{2}/`);
    const pathWithoutLanguageSlug = currentPathname?.replace(regex, '/');

    return pathWithoutLanguageSlug;
  }
);
