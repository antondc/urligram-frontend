import { AppThunk } from '../../../index';
import { SWITCH_LIST_MODAL, UiActions } from '../ui.types';

type Params = {
  mounted: boolean;
  listId?: number;
};

export const switchListModal = ({ mounted, listId }: Params): AppThunk<void, UiActions> => async (
  dispatch,
  getState
): Promise<void> => {
  const { Ui } = getState();

  dispatch({
    type: SWITCH_LIST_MODAL,
    payload: {
      screenLocked: !Ui.screenLocked,
      listModal: {
        ...Ui.listModal,
        mounted,
        listId,
      },
    },
  });
};
