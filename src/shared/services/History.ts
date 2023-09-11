import { createBrowserHistory, createMemoryHistory, History } from 'history';

import { isDomAvailable } from '@antoniodcorrea/utils-frontend';

export { Location } from 'history';

const history: History = isDomAvailable ? createBrowserHistory() : createMemoryHistory();

export default history;
