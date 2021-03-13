import { RootState } from '../../rootType';

export const selectSessionPasswordRequested = (state: RootState): boolean => state.Session.passwordRequested;
