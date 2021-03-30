// General
export const DEFAULT_PAGE_SIZE = 10;

// Delays
export const DELAY_FAST_MS = 150;
export const DELAY_MEDIUM_MS = 500;
export const DELAY_SLOW_MS = 1000;
export const DELAY_THREE_SEC = 3000;
export const DELAY_SIX_SEC = 6000;
export const TIME_RECENTLY_CREATED_BOOKMARK = 10;

// Url
export const DEFAULT_PROTOCOL = 'https://';

// Response statuses

export const REQUEST_NOT_CALLED = 'request-not-called';
export const REQUEST_STARTED = 'request-started';
export const REQUEST_SUCCEEDED = 'request-succeeded';
export const REQUEST_FAILED = 'request-failed';
export type ResponseStatus = typeof REQUEST_STARTED | typeof REQUEST_SUCCEEDED | typeof REQUEST_FAILED;
