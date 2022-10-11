import { BookmarksState } from './Bookmarks/bookmarks.types';
import { LanguagesState } from './Languages/languages.types';
import { LinksState } from './Links/links.types';
import { ListsState } from './Lists/lists.types';
import { NotesState } from './Notes/notes.types';
import { NotificationsState } from './Notifications/notifications.types';
import { RoutesState } from './Routes/routes.types';
import { SessionState } from './Session/session.types';
import { TagsState } from './Tags/tags.types';
import { UiState } from './Ui/ui.types';
import { UsersState } from './Users/users.types';

export type RootState = {
  Users: UsersState;
  Bookmarks: BookmarksState;
  Languages: LanguagesState;
  Routes: RoutesState;
  Ui: UiState;
  Session: SessionState;
  Lists: ListsState;
  Links: LinksState;
  Tags: TagsState;
  Notes: NotesState;
  Notifications: NotificationsState;
};
