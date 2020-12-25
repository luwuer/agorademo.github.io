// 移位标识权重，方便调整控制机制
const logWeightMap = {
  off: 1,
  error: 1 >> 1,
  warn: 1 >> 2,
  info: 1 >> 3,
  all: 1 >> 4
};

export type LogLevel = "off" | "error" | "warn" | "info" | "all";
export class Logger {
  public readonly level: LogLevel;
  public readonly weight: number;
  constructor(level: LogLevel) {
    this.level = level;
    this.weight = logWeightMap[level];
  }

  public log(level: LogLevel, msg: string) {
    const weight = logWeightMap[level];
    if (this.weight < weight) return;

    switch (level) {
      case "error":
        this._error(msg);
        break;
      case "warn":
        this._warn(msg);
        break;
      default:
        this._info(msg);
    }
  }

  private _info(msg: string) {
    console.log(`[Logger info] ${msg}`);
  }

  private _warn(msg: string) {
    console.warn(`[Logger warn] ${msg}`);
  }

  private _error(msg: string) {
    console.error(`[Logger error] ${msg}`);
  }
}
