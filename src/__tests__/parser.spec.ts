import { Parser } from '../parser.service';

describe('Parser Validation', () => {
  test('should throw error on missing files', () => {
    expect(() => new Parser('/debug.love', '/debug.log')).toThrow(Error);
  });

  test('should not throw error on valid files', () => {
    expect(() => new Parser('/mixed.log', 'errors.json')).not.toThrow(Error);
  });
});
