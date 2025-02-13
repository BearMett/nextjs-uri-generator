import path from 'path';
import { generateDefineHttpMethodTestFile } from '../resources/test-resources/export-parser/generateDefineHttpMethodTestFile';
import { parseExportedFunctions } from './export-parser';
import { describe, it, expect } from 'vitest';

describe('parseExportedFunctions', () => {
  const testFilePath = path.join(__dirname, '..', 'resources', 'test-resources', 'export-parser');

  it('should parse exported functions correctly', () => {
    const filePath = generateDefineHttpMethodTestFile(testFilePath);
    const result = parseExportedFunctions(filePath);
    expect(result).toEqual([
        { name: 'GET', line: 1 },
        { name: 'POST', line: 9 },
        { name: 'PATCH', line: 9 },
        { name: 'DELETE', line: 3 },
    ]);
  });

  it('should not parse non-http methods', () => {
    const filePath = generateDefineHttpMethodTestFile(testFilePath);
    const result = parseExportedFunctions(filePath);
    expect(result).not.toContain({ name: 'SHOULD_NOT_BE_PARSED', line: 8 });
  });
});
