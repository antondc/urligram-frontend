import { createSelector } from 'reselect';
import { selectCurrentPathname } from 'Modules/Routes/selectors/selectCurrentPathname';
import { selectLanguagesSlugList } from 'Modules/Languages/selectors/selectLanguagesSlugList';

export const selectPathWithoutLanguageParam = createSelector(
  selectCurrentPathname,
  selectLanguagesSlugList,
  (currentPathname: string, languagesSlugList: string[]): string => {
    const regex = new RegExp(`/[${languagesSlugList}]{2}/`);
    const pathWithoutLanguageSlug = currentPathname.replace(regex, '/');

    return pathWithoutLanguageSlug;
  }
);
