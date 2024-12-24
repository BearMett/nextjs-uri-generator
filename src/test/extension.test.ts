import * as assert from 'assert';
import * as vscode from 'vscode';
import { ApiEndpointCodeLensProvider } from '../extension';

suite('ApiEndpointCodeLensProvider Test Suite', () => {
	const provider = new ApiEndpointCodeLensProvider();

	test('정규식이 HTTP 메소드를 올바르게 감지하는지 테스트', async () => {
		const testContent = `
			export function GET() {}
			export async function POST() {}
			export function PUT() {}
			export function DELETE() {}
			export function PATCH() {}
		`;

		const document = await vscode.workspace.openTextDocument({
			content: testContent,
			language: 'typescript'
		});

		const codeLenses = await provider.provideCodeLenses(document, new vscode.CancellationTokenSource().token);
		
		assert.strictEqual(codeLenses?.length, 10);
	});

	test('경로 생성이 올바르게 되는지 테스트', async () => {
		const testContent = `export function GET() {}`;
		const uri = vscode.Uri.file('/workspace/project/app/api/test/route.ts');
		
		const document = {
			getText: () => testContent,
			lineAt: (line: number) => ({ text: testContent }),
			lineCount: 1,
			uri: uri,
			languageId: 'typescript'
		} as vscode.TextDocument;

		const codeLenses = await provider.provideCodeLenses(document, new vscode.CancellationTokenSource().token);
		
		assert.strictEqual(codeLenses?.[0].command?.arguments?.[1], 'api/test/route.ts');
	});

	test('CodeLens 명령이 올바르게 설정되는지 테스트', async () => {
		const testContent = `export function GET() {}`;
		const document = await vscode.workspace.openTextDocument({
			content: testContent,
			language: 'typescript'
		});

		const codeLenses = await provider.provideCodeLenses(document, new vscode.CancellationTokenSource().token);
		
		assert.strictEqual(codeLenses?.[0].command?.command, 'extension.showEndpoint');
		assert.strictEqual(codeLenses?.[1].command?.command, 'extension.copyEndpoint');
	});
});
