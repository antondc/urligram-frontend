// General
export const SITE_TITLE = 'Linking';
export const DEFAULT_PAGE_SIZE = 20;
export const COOKIE_POLICY_COOKIE = 'cookiePolicyCookie';

// Delays
export const DELAY_FASTEST_MS = 150;
export const DELAY_FASTEST_S = DELAY_FASTEST_MS / 1000;
export const DELAY_FAST_MS = 300;
export const DELAY_FAST_S = DELAY_FAST_MS / 1000;
export const DELAY_MEDIUM_MS = 500;
export const DELAY_MEDIUM_S = 500 / 1000;
export const DELAY_SLOW_MS = 1000;
export const DELAY_SLOW_S = DELAY_SLOW_MS / 1000;
export const DELAY_ONE_HALF_SEC_MS = 1500;
export const DELAY_ONE_HALF_SEC_S = DELAY_ONE_HALF_SEC_MS / 1000;
export const DELAY_TWO_SEC = 2000;
export const DELAY_THREE_SEC = 3000;
export const DELAY_SIX_SEC = 6000;
export const TIME_RECENTLY_CREATED_BOOKMARK = 7;

// Url
export const DEFAULT_PROTOCOL = 'https://';

// Response statuses
export const REQUEST_NOT_CALLED = 'request-not-called';
export const REQUEST_STARTED = 'request-started';
export const REQUEST_SUCCEEDED = 'request-succeeded';
export const REQUEST_FAILED = 'request-failed';
export type ResponseStatus = typeof REQUEST_STARTED | typeof REQUEST_SUCCEEDED | typeof REQUEST_FAILED;

// Animations
export const EASE_OUT_QUART_CUSTOM = [0.17, 0.84, 0.44, 1];
