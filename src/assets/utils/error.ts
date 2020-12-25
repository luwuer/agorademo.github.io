import { isPromise } from "./utils";

export function handleError(err: unknown) {
  // just console now
  console.error(`[Catch Error] ${err}`);
}

export function callWithErrorHandling<T = any>(
  fn: Function,
  args?: unknown[]
): T {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err);
  }

  return res;
}

export async function callAsyncWithErrorHandle<T = any>(
  fn: Function
): Promise<T> {
  const res = callWithErrorHandling(fn);
  if (res && isPromise(res)) {
    return res.catch(err => {
      handleError(err);
    });
  }

  return res;
}
