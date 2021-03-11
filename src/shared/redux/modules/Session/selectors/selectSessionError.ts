import { RootState } from '../../rootType';
import { SessionError } from '../session.types';

export const selectSessionError = (state: RootState): SessionError => state.Session.error;
