import { BookmarksState } from './Bookmarks/bookmarks.types';
import { LanguagesState } from './Languages/languages.types';
import { LinksState } from './Links/links.types';
import { RoutesState } from './Routes/routes.types';
import { SectionsState } from './Sections/sections.types';
import { SessionState } from './Session/session.types';
import { UiState } from './Ui/ui.types';

export type RootState = {
  Bookmarks: BookmarksState;
  Links: LinksState;
  Languages: LanguagesState;
  Routes: RoutesState;
  Sections: SectionsState;
  Ui: UiState;
  Session: SessionState;
};
