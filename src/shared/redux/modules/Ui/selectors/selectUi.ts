import get from 'lodash/get';

import { RootState } from 'Modules/rootType';
import { UiState } from 'Modules/Ui/ui.types';

export const selectUi = (state: RootState): UiState => get(state, 'Ui', {});
