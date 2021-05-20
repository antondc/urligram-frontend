import { BookmarksState } from './Bookmarks/bookmarks.types';
import { LanguagesState } from './Languages/languages.types';
import { SessionState } from './Session/session.types';
import { TagsState } from './Tags/tags.types';

export type RootState = {
  Session: SessionState;
  Bookmarks: BookmarksState;
  Languages: LanguagesState;
  Tags: TagsState;
};
