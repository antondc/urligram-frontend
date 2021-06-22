import { SHARED_RESET, SharedActions } from 'Modules/Shared/shared.types';

export const sharedReset = (): SharedActions => ({
  type: SHARED_RESET,
  payload: {
    bookmarksSent: [],
    bookmarksReceived: [],
    loading: false,
    errors: [],
  },
});
