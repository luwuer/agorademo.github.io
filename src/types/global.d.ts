interface GlobalConfig {
  agoraDefault: {
    appid: string
    token: string
    channel: string
  }
  logLevel: string
}

interface Window {
  logger: {
    log: Function
  };
}

let config: GlobalConfig

declare module 'clipboard'