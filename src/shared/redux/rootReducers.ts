import { Bookmarks } from './modules/Bookmarks/bookmarks.reducer';
import { Languages } from './modules/Languages/languages.reducer';
import { Links } from './modules/Links/links.reducer';
import { Routes } from './modules/Routes/routes.reducer';
import { Sections } from './modules/Sections/sections.reducer';
import { Session } from './modules/Session/session.reducer';
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
};
