import type { AnyAction, Dispatch } from 'redux';

export interface MiddlewareAPI<S, E extends AnyAction> {
  dispatch: Dispatch<E>;
  getState(): S;
}

export type Middleware<S, E extends AnyAction> = (
  api: MiddlewareAPI<S, E>
) => (next: Dispatch<E>) => (event: E) => ReturnType<Dispatch<E>>;
