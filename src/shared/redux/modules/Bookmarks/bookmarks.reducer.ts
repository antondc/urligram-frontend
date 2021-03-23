import { BookmarksState, types } from './bookmarks.types';

export const initialState: BookmarksState = {
  byKey: {},
  errors: [],
};

export const Bookmarks = (state = initialState, action: Record<string, any>): typeof initialState =>
  Object.hasOwnProperty.call(types, action.type) ? Object.assign({}, state, action.payload) : state;
