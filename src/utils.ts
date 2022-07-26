import fs from 'fs';
import path from 'path';

import { REGEX } from './constants';

import { ExtractLogField, LogEntry, LogLevel } from './types';

export function directoryExists(filepath: string) {
  return fs.existsSync(filepath);
}

export function  getLogFilePath(filePath: string) {
  return path.join(__dirname, '../logs', filePath);
}

/**
 * Enforce property field format
 * @param logField 
 * @returns 
 */
export function validateLogField(logField: string): boolean {
  const [timestamp = '', logLevel = '', details = ''] = logField.split(' - ');

  const timestampMatch = REGEX.firstWordRegex.test(timestamp);

  const jsonMatch = REGEX.jsonMatchRegex.test(details);

  const logLevelMatch = [...Object.keys(LogLevel)].includes(
    logLevel.toUpperCase(),
  );

  return timestampMatch && jsonMatch && logLevelMatch;
}

export function retrieveLogLines(filePath: string): string[] {
  let logLines = [] as string[];

  try {
    const logFile = fs.readFileSync(filePath, 'utf8');
    logLines = logFile.trim().split('\n');
  } catch (error: any) {
    console.error('Error retrieving log files', error.message);
  }

  return logLines;
}

export function parseLogFile(logLines: string[]): LogEntry[] {
  const logEntries: LogEntry[] = [];

  for (const logLine of logLines) {
    const isLogValid = validateLogField(logLine);

    if (!isLogValid) {
      console.log('Invlaid log line');
      continue;
    }

    const logEntry = parseLogLine(logLine);
    logEntries.push(logEntry);
  }

  return logEntries;
}

export function extractLogFields(logField: string): ExtractLogField {
  const timestampMatch = logField.match(REGEX.firstWordRegex)?.[0] ?? '';

  const jsonMatch = logField.match(REGEX.jsonMatchRegex)?.[0] ?? '{}';

  const loglevelMatch = (logField.match(REGEX.logLevel)?.[0] ?? '')
    .replace(/-/g, '')
    .trim() as LogLevel;

  return {
    timestamp: new Date(timestampMatch).valueOf(),
    loglevel: loglevelMatch,
    jsonObject: JSON.parse(jsonMatch),
  };
}

export function parseLogLine(logLine: string): LogEntry {
  const { timestamp, loglevel, jsonObject } = extractLogFields(logLine);
  const { transactionId, details, ...others } = jsonObject;

  return {
    timestamp,
    transactionId,
    loglevel,
    err: details,
    ...others,
  };
}

export function segregateLogsByLevel(
  logEntries: LogEntry[],
  logLevel: LogLevel =  LogLevel.ERROR,
): LogEntry[] {
  return logEntries.filter(({ loglevel: level }) => level === logLevel);
}
