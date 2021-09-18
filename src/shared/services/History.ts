import { createBrowserHistory, createMemoryHistory, History } from 'history';

import { isDomAvailable } from 'Tools/utils/dom/isDomAvailable';

export { Location } from 'history';

const history: History = isDomAvailable ? createBrowserHistory() : createMemoryHistory();

export default history;
