export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return val instanceof Promise;
}

export function getTimeStamp(): number {
  return Date.now();
}

// translate timestamp to string, for example: 123 -> 00:02:03
export function timestampToString(
  timestamp: number,
  format = "hh:mm:ss"
): string {
  const seconds = Math.floor(timestamp / 1000);
  const minutes = Math.floor(seconds / 60);

  type WrapKey = "s" | "m" | "h";
  const wrap = {
    s: seconds % 60,
    m: minutes % 60,
    h: Math.floor(minutes / 60)
  };

  for (const key in wrap) {
    const _ = "00" + wrap[key as WrapKey];
    format = format.replace(new RegExp(`${key}+`), _.substr(_.length - 2));
  }

  return format;
}
