import { LogLevel } from './types';

export interface IParserService {
  parse(logLevel: LogLevel): void;
}
