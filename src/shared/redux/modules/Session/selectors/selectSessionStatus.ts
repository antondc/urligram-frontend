import { RootState } from '../../rootType';
import { SessionStatus } from '../session.types';

export const selectSessionStatus = (state: RootState): SessionStatus => state.Session.status;
