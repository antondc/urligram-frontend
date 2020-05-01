import { SessionState } from '../session.types';

export const selectSession = (state): SessionState => state.Session;
