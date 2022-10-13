import { Redirect } from './Redirect';

export type LoaderResult<T> = Promise<T | Redirect>;
