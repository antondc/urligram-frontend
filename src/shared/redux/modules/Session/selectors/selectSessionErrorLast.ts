import { RootState } from 'Modules/rootType';
import { SessionError } from '../session.types';

export const selectSessionErrorLast = (state: RootState): SessionError =>
  state.Session.errors?.length ? state.Session.errors[state.Session.errors?.length - 1] : null;
