import { createBrowserHistory, createMemoryHistory, History } from 'history';
export { Location } from 'history';

const history: History = isBrowser ? createBrowserHistory() : createMemoryHistory();

export default history;
