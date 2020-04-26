import get from 'lodash/get';
import { UiState } from '../ui.types';

export const selectUi = (state): UiState => get(state, 'Ui', {});
