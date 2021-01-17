import { Bookmarks } from './modules/Bookmarks/bookmarks.reducer';
import { Languages } from './modules/Languages/languages.reducer';
import { Links } from './modules/Links/links.reducer';
import { Routes } from './modules/Routes/routes.reducer';
import { Sections } from './modules/Sections/sections.reducer';
import { Session } from './modules/Session/session.reducer';
import { Ui } from './modules/Ui/ui.reducer';

export const RootReducers = {
  Languages,
  Routes,
  Session,
  Ui,
  Bookmarks,
  Links,
  Sections,
};
