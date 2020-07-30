import { Languages } from './modules/Languages/languages.reducer';
import { Routes } from './modules/Routes/routes.reducer';
import { Session } from './modules/Session/session.reducer';
import { MockDataOne } from './modules/MockDataOne/mockDataOne.reducer';
import { MockDataTwo } from './modules/MockDataTwo/mockDataTwo.reducer';
import { Ui } from './modules/Ui/ui.reducer';
import { Bookmarks } from './modules/Bookmarks/bookmarks.reducer';

export const RootReducers = {
  Languages,
  Routes,
  Session,
  MockDataOne,
  MockDataTwo,
  Ui,
  Bookmarks,
};
