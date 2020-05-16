import { createBrowserHistory, createMemoryHistory, History } from 'history';

const history: History = isBrowser ? createBrowserHistory() : createMemoryHistory();

export default history;
