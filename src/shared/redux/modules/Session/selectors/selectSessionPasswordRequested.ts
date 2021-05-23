import { RootState } from 'Modules/rootType';

export const selectSessionPasswordRequested = (state: RootState): boolean => state.Session.passwordRequested;
