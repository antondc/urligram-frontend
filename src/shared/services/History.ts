import { createBrowserHistory, createMemoryHistory, History } from 'history';

import { isDomAvailable } from 'Tools/utils/dom/isDomAvailable';

export { Location } from 'history';

const domAvailable = isDomAvailable();

const history: History = domAvailable ? createBrowserHistory() : createMemoryHistory();

export default history;
