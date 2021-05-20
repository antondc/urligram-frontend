import { RootState } from 'Modules/rootType';
import { SessionState } from '../session.types';

export const selectSession = (state: RootState): SessionState => state.Session;
