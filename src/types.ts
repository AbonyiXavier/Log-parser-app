export enum LogLevel {
  ERROR = 'error',
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
}

export type LogEntry = {
  timestamp: number;
  loglevel: LogLevel | string;
  transactionId: string;
  err: string;
};

export type ExtractLogField = {
  timestamp: number;
  loglevel: LogLevel;
  jsonObject: Record<string, any>;
};
