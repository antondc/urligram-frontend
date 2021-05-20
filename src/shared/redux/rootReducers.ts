import { Bookmarks } from './modules/Bookmarks/bookmarks.reducer';
import { Languages } from './modules/Languages/languages.reducer';
import { Session } from './modules/Session/session.reducer';
import { Tags } from './modules/Tags/tags.reducer';

export const RootReducers = {
  Session,
  Tags,
  Languages,
  Bookmarks,
};
