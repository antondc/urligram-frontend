import { BookmarksState } from './Bookmarks/bookmarks.types';
import { LanguagesState } from './Languages/languages.types';
import { LinksState } from './Links/links.types';
import { ListsState } from './Lists/lists.types';
import { RoutesState } from './Routes/routes.types';
import { SectionsState } from './Sections/sections.types';
import { SessionState } from './Session/session.types';
import { UiState } from './Ui/ui.types';
import { UsersState } from './Users/users.types';

export type RootState = {
  Users: UsersState;
  Bookmarks: BookmarksState;
  Links: LinksState;
  Languages: LanguagesState;
  Routes: RoutesState;
  Sections: SectionsState;
  Ui: UiState;
  Session: SessionState;
  Lists: ListsState;
};
