import { Bookmarks } from './modules/Bookmarks/bookmarks.reducer';
import { Languages } from './modules/Languages/languages.reducer';
import { Links } from './modules/Links/links.reducer';
import { Lists } from './modules/Lists/lists.reducer';
import { Routes } from './modules/Routes/routes.reducer';
import { Sections } from './modules/Sections/sections.reducer';
import { Session } from './modules/Session/session.reducer';
import { Shared } from './modules/Shared/shared.reducer';
import { Tags } from './modules/Tags/tags.reducer';
import { Ui } from './modules/Ui/ui.reducer';
import { Users } from './modules/Users/users.reducer';

export const RootReducers = {
  Users,
  Languages,
  Routes,
  Session,
  Ui,
  Bookmarks,
  Links,
  Sections,
  Lists,
  Tags,
  Shared,
};
