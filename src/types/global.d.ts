interface GlobalConfig {
  agoraDefault: {
    appid: string
    token: string
    channel: string
  }
  logLevel: string
}

interface Window {
  message: {
    success: Function,
    error: Function
  }
  logger: {
    log: Function
  };
  agora: any
}


let config: GlobalConfig

declare module 'clipboard'
