import { createBrowserHistory, createMemoryHistory } from 'history';

const history = isBrowser ? createBrowserHistory() : createMemoryHistory();

export default history;
