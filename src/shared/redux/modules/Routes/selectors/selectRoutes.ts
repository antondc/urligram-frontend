import { RootState } from 'Modules/rootType';
import { RoutesState } from '../routes.types';

export const selectRoutes = (state: RootState): RoutesState => state.Routes;
