import fs from 'fs';
import 'reflect-metadata';

import { IParserService } from './interface';
import { LogEntry, LogLevel } from './types';

import {
  directoryExists,
  parseLogFile,
  retrieveLogLines,
  segregateLogsByLevel,
  getLogFilePath,
} from './utils';

export class Parser implements IParserService {
  private inputPath = '';
  private outputPath = '';

  constructor(inputPath: string, outputPath: string) {
    this.inputPath = getLogFilePath(inputPath);
   
    this.outputPath = outputPath;

    this.validatePaths(this.inputPath, this.outputPath);
  }

  private validatePaths(inputPath: string, outputPath: string): void {
    const directExist = directoryExists(inputPath);

    if (!directExist) {
      throw new Error(`${inputPath} does not exist`);
    }

    if (!outputPath) {
      throw new Error('No output path provided');
    }
  }

  private writeLogEntries(logEntries: LogEntry[], filePath: string): void {
    try {
      const outputFile = fs.createWriteStream(filePath);
      outputFile.write(JSON.stringify(logEntries));
    } catch (error) {
      console.error('Error writing to file');
    }
  }

  public parse(logLevel = LogLevel.ERROR): void {
    const logLines = retrieveLogLines(this.inputPath);
    const logEntries = parseLogFile(logLines);
    const output = segregateLogsByLevel(logEntries, logLevel);

    this.writeLogEntries(output, this.outputPath);
  }
}
