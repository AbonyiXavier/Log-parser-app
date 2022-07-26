import { LogLevel } from '../types';
import {
  validateLogField,
  retrieveLogLines,
  getLogFilePath,
  parseLogFile,
  extractLogFields,
  parseLogLine,
  segregateLogsByLevel,
} from '../utils';
import {
  INVALID_LOG_FIELDS,
  successfulLogField,
  VALID_LOG_ENTRY,
} from './__mocks__/utils';

describe('Unit tests for utility functions', () => {
  describe('Validates Log field', () => {
    describe('should validate log field successfully', () => {
      test('successful validation', () => {
        const logFieldResponse = validateLogField(successfulLogField);

        expect(logFieldResponse).toBe(true);
        expect(logFieldResponse).toBeTruthy();
      });
    });

    describe('should not validate an invalid log field', () => {
      test('no log level', () => {
        const logFieldResponse = validateLogField(
          INVALID_LOG_FIELDS.no_log_level,
        );

        expect(logFieldResponse).toBe(false);
        expect(logFieldResponse).toBeFalsy();
      });

      test('invalid timestamp', () => {
        const logFieldResponse = validateLogField(
          INVALID_LOG_FIELDS.no_time_stamp,
        );

        expect(logFieldResponse).toBe(false);
        expect(logFieldResponse).toBeFalsy();
      });

      test('no json', () => {
        const logFieldResponse = validateLogField(INVALID_LOG_FIELDS.no_json);

        expect(logFieldResponse).toBe(false);
        expect(logFieldResponse).toBeFalsy();
      });

      test('no details', () => {
        const logFieldResponse = validateLogField(
          INVALID_LOG_FIELDS.no_details,
        );

        expect(logFieldResponse).toBe(false);
        expect(logFieldResponse).toBeFalsy();
      });

      test('empty string', () => {
        const logFieldResponse = validateLogField(
          INVALID_LOG_FIELDS.empty_string,
        );

        expect(logFieldResponse).toBe(false);
        expect(logFieldResponse).toBeFalsy();
      });
    });
  });

  describe('Retrieve Log Lines', () => {
    describe('Should retrieve log lines successfully', () => {
      const filePath = getLogFilePath('/mixed.log');

      test('successfully retrieve log line', () => {
        const logLines = retrieveLogLines(filePath);
        expect(logLines.length).toBeGreaterThan(1);
      });
    });

    describe('Should fail to retrieve log lines successfully', () => {
      const filePath = getLogFilePath('/notfound.log');

      test('successfully retrieve log line', () => {
        const logLines = retrieveLogLines(filePath);
        expect(logLines.length).toBeFalsy();
        expect(logLines.length).toBe(0);
      });
    });
  });

  describe('Should get logfile path successfully', () => {
    describe('get log file path success', () => {
      test('successfully retrieve file path', () => {
        const filePath = getLogFilePath('/mixed.log');
        expect(filePath.length).toBeGreaterThan(5);
        expect(filePath).toContain('mixed');
      });
    });
  });

  describe('Parse log files', () => {
    describe('parse log files successfully', () => {
      test('logs files should pass', () => {
        const logEntry = parseLogFile([successfulLogField]);

        expect(logEntry.length).toBeGreaterThanOrEqual(1);
        expect(logEntry).toBeInstanceOf(Array);
      });
    });
  });

  describe('parse log files fails parsing', () => {
    test('logs files should fail', () => {
      const logEntry = parseLogFile([]);

      expect(logEntry.length).toBeFalsy();
      expect(logEntry).toBeInstanceOf(Array);
    });

    test('logs files should fail', () => {
      const logEntry = parseLogFile([INVALID_LOG_FIELDS.no_details]);

      expect(logEntry.length).toBeFalsy();
      expect(logEntry).toBeInstanceOf(Array);
    });

    test('logs files should fail', () => {
      const logEntry = parseLogFile([INVALID_LOG_FIELDS.empty_string]);

      expect(logEntry.length).toBeFalsy();
      expect(logEntry).toBeInstanceOf(Array);
    });
  });

  describe('Extract log fields', () => {
    describe('Success extract fields', () => {
      test('should extract log fields successfully', () => {
        const { timestamp, jsonObject, loglevel } =
          extractLogFields(successfulLogField);

        expect(timestamp).toBeTruthy();
        expect(jsonObject).toBeInstanceOf(Object);
        expect(
          [...Object.keys(LogLevel)].includes(loglevel.toUpperCase()),
        ).toBe(true);
      });
    });

    describe('fail to extract fields', () => {
      test('should fail to extract log fiels.', () => {
        const { timestamp, jsonObject, loglevel } = extractLogFields(
          INVALID_LOG_FIELDS.no_time_stamp,
        );

        expect(timestamp).toBeFalsy();
        expect(jsonObject).toBeInstanceOf(Object);
        expect(
          [...Object.keys(LogLevel)].includes(loglevel.toUpperCase()),
        ).toBe(true);
      });

      test('should fail to extract log fiels.', () => {
        const { timestamp, jsonObject, loglevel } = extractLogFields(
          INVALID_LOG_FIELDS.no_details,
        );

        expect(timestamp).toBeTruthy();
        expect(jsonObject).toBeDefined();
        expect(
          [...Object.keys(LogLevel)].includes(loglevel.toUpperCase()),
        ).toBe(true);
      });

      test('should fail to extract log fiels.', () => {
        const { timestamp, jsonObject, loglevel } = extractLogFields(
          INVALID_LOG_FIELDS.empty_string,
        );

        expect(timestamp).toBeFalsy();
        expect(jsonObject).toBeDefined();
        expect(
          [...Object.keys(LogLevel)].includes(loglevel.toUpperCase()),
        ).toBe(false);
      });
    });
  });

  describe('Parse log files', () => {
    describe('Should parse log files successfully', () => {
      test('successfully parse log files', () => {
        const {
          timestamp,
          transactionId,
          loglevel,
          err: details,
          ...others
        } = parseLogLine(successfulLogField);

        expect(timestamp).toBeTruthy();
        expect(details).toBeDefined();
        expect(others).toBeInstanceOf(Object);
        expect(
          [...Object.keys(LogLevel)].includes(loglevel.toUpperCase()),
        ).toBe(true);
      });
    });

    describe('Should fails to parse log files', () => {
      test('failed parse log files', () => {
        const {
          timestamp,
          transactionId,
          loglevel,
          err: details,
          ...others
        } = parseLogLine(INVALID_LOG_FIELDS.empty_string);

        expect(timestamp).toBeFalsy();
        expect(details).not.toBeDefined();
        expect(others).toBeDefined();
        expect(
          [...Object.keys(LogLevel)].includes(loglevel.toUpperCase()),
        ).toBe(false);
      });
    });
  });

  describe('Segregate Log level', () => {
    describe('Segregates log levels by log level available', () => {
      test('should segregate log levels successfully', () => {
        const warnsegregatedLogs = segregateLogsByLevel(VALID_LOG_ENTRY.warn, LogLevel.WARN);

        expect(warnsegregatedLogs).toBeInstanceOf(Array);
        expect(warnsegregatedLogs.length).toBeGreaterThanOrEqual(VALID_LOG_ENTRY.warn.length);
      });

      test('should segregate log levels successfully for default value of eeror', () => {
        const warnsegregatedLogs = segregateLogsByLevel(VALID_LOG_ENTRY.error);

        expect(warnsegregatedLogs).toBeInstanceOf(Array);
        expect(warnsegregatedLogs.length).toBeGreaterThanOrEqual(VALID_LOG_ENTRY.error.length);
      });
    });

    describe('Fail to segregates log levels by log level', () => {
      test('should  fail to segregate empty log levels', () => {
        const warnsegregatedLogs = segregateLogsByLevel([], LogLevel.WARN);

        expect(warnsegregatedLogs).toBeInstanceOf(Array);
        expect(warnsegregatedLogs.length).toBeFalsy();
      });
    });
  });  
});
