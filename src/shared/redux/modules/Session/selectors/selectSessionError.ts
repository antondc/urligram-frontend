import { RootState } from '../../rootType';

export const selectSessionError = (state: RootState): Error => state.Session.error;
