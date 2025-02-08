import * as fs from 'fs';
import * as path from 'path';

export function generateDefineHttpMethodTestFile(outputDir: string): string {
    const fileContent = `
export function GET() {}

export async function DELETE() {}

const HANDLER = () => {};

const PATCH = async () => {};
export const SHOULD_NOT_BE_PARSED = () => {};
export {HANDLER as POST, PATCH};
    `.trim();

    const filePath = path.join(outputDir, 'defineHttpMethodTest.ts');
    fs.writeFileSync(filePath, fileContent, { encoding: 'utf8' });
    return filePath;
}