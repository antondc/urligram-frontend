import { RootState } from 'Modules/rootType';
import { UiBaseModal } from '../ui.types';

export const selectBookmarkActionsIcons = (
  state: RootState
): {
  bookmarkId: number;
} & UiBaseModal => state.Ui?.bookmarkActionsIcons;
