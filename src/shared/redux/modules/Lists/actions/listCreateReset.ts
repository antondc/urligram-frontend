import { Dispatch } from 'redux';

import { LIST_CREATE_RESET, ListsActions } from 'Modules/Lists/lists.types';
import { RootState } from 'Modules/rootType';
import { AppThunk } from '../../..';

export const listCreateReset = (): AppThunk<void> => (
  dispatch: Dispatch<ListsActions>,
  getState: () => RootState
): void => {
  const { Lists } = getState();
  dispatch({
    type: LIST_CREATE_RESET,
    payload: {
      ...Lists,
      errors: [],
    },
  });
};
