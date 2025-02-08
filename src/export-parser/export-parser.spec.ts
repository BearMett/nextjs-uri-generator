import path from 'path';
import { generateDefineHttpMethodTestFile } from '../resources/test-resources/export-parser/generateDefineHttpMethodTestFile';
import { parseExportedFunctions } from './export-parser';
import { describe, it, expect } from 'vitest';

describe('parseExportedFunctions', () => {
  it('should parse exported functions correctly', () => {
    const filePath = generateDefineHttpMethodTestFile(path.join(__dirname, '..', 'resources', 'test-resources', 'export-parser'));
    const result = parseExportedFunctions(filePath);
    expect(result).toEqual([
        { name: 'GET', line: 1 },
        { name: 'POST', line: 9 },
        { name: 'PATCH', line: 9 },
        { name: 'DELETE', line: 3 },
    ]);
  });

  it('should not parse non-http methods', () => {
    const result = parseExportedFunctions('resources/test-resources/export-parser/exporting.ts');
    expect(result).not.toContain({ name: 'SHOULD_NOT_BE_PARSED', line: 8 });
  });
});
