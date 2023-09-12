import { RootState } from 'Modules/rootType';
import { UiState } from '../ui.types';

export const selectUi = (state: RootState): UiState => state.Ui;
