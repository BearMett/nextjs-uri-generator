import * as assert from 'assert';
import * as vscode from 'vscode';
import { ApiEndpointCodeLensProvider } from '../api-endpoint-provider';
import * as path from 'path';
import { generateDefineHttpMethodTestFile } from '../resources/test-resources/export-parser/generateDefineHttpMethodTestFile';
suite('ApiEndpointCodeLensProvider Test Suite', () => {
	const provider = new ApiEndpointCodeLensProvider();

	test('외부 파일을 사용해서 HTTP 메소드 감지 테스트', async () => {
		const filePath = generateDefineHttpMethodTestFile(
			path.join(__dirname, '..', 'resources', 'test-resources', 'export-parser')
		);
		const uri = vscode.Uri.file(filePath);
		const document = await vscode.workspace.openTextDocument(uri);
		
		const codeLenses = await provider.provideCodeLenses(document, new vscode.CancellationTokenSource().token);

		// GET, DELETE, POST, PATCH 메소드에 대해 CodeLens가 생성되어야 함 
		console.log(JSON.stringify(codeLenses, null, 2));
		assert.strictEqual(codeLenses?.length, 8);
	});
});
