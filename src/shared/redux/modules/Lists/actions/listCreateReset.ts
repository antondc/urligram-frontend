import { LIST_CREATE_RESET, ListsActions } from 'Modules/Lists/lists.types';
import { AppThunk } from '../../..';

export const listCreateReset = (): AppThunk<void, ListsActions> => (dispatch, getState): void => {
  const { Lists } = getState();
  dispatch({
    type: LIST_CREATE_RESET,
    payload: {
      ...Lists,
      errors: [],
    },
  });
};
