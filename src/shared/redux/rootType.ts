import { BookmarksState } from './modules/Bookmarks/bookmarks.types';
import { LanguagesState } from './modules/Languages/languages.types';
import { LinksState } from './modules/Links/links.types';
import { MockDataOneState } from './modules/MockDataOne/mockDataOne.types';
import { MockDataTwoState } from './modules/MockDataTwo/mockDataTwo.types';
import { RoutesState } from './modules/Routes/routes.types';
import { SectionsState } from './modules/Sections/sections.types';
import { UiState } from './modules/Ui/ui.types';

export type RootState = {
  Bookmarks: BookmarksState;
  Links: LinksState;
  Languages: LanguagesState;
  Routes: RoutesState;
  Sections: SectionsState;
  Ui: UiState;
  MockDataOne: MockDataOneState;
  MockDataTwo: MockDataTwoState;
};
