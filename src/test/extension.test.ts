import * as assert from 'assert';
import * as vscode from 'vscode';
import { ApiEndpointCodeLensProvider } from '../api-endpoint-provider';
import * as path from 'path';
import { generateDefineHttpMethodTestFile } from '../resources/test-resources/export-parser/generateDefineHttpMethodTestFile';
import { MockPathResolver } from '../path-resolver';

suite('ApiEndpointCodeLensProvider Test Suite', () => {
	const mockPath = "api/test/route";
	const mockPathResolver = new MockPathResolver(mockPath);
	const provider = new ApiEndpointCodeLensProvider(mockPathResolver);

	test('외부 파일을 사용해서 HTTP 메소드 감지 테스트', async () => {
		const filePath = generateDefineHttpMethodTestFile(
			path.join(__dirname, '..', 'resources', 'test-resources', 'export-parser')
		);
		const uri = vscode.Uri.file(filePath);
		const document = await vscode.workspace.openTextDocument(uri);
		
		const codeLenses = await provider.provideCodeLenses(document, new vscode.CancellationTokenSource().token);

		assert.strictEqual(codeLenses?.length, 8);
		
		const showEndpointLenses = codeLenses!.filter(lens => lens.command?.command === 'extension.showEndpoint');
		const copyEndpointLenses = codeLenses!.filter(lens => lens.command?.command === 'extension.copyEndpoint');

		// 각 명령어 타입별 렌즈 개수 확인
		assert.strictEqual(showEndpointLenses.length, 4);
		assert.strictEqual(copyEndpointLenses.length, 4);

		// showEndpoint 렌즈 검증
		showEndpointLenses.forEach(lens => {
			assert.strictEqual(lens.command?.arguments?.[1], mockPath);
		});
	});
});
