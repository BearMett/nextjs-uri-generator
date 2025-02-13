import * as path from 'path';
import * as vscode from 'vscode';

export interface IPathResolver {
    resolveApiPath(documentUri: vscode.Uri): string | undefined;
}

export class NextjsPathResolver implements IPathResolver {
    constructor(private workspaceFolder?: vscode.WorkspaceFolder) {}

    resolveApiPath(documentUri: vscode.Uri): string | undefined {
        if (!this.workspaceFolder) {
            return undefined;
        }

        const fullPath = documentUri.fsPath;
        const relativePath = path.relative(this.workspaceFolder.uri.fsPath, fullPath);
        
        let urlPath = "";
        if (relativePath.includes("app/")) {
            urlPath = relativePath.split("app/")[1];
        } else if (relativePath.includes("pages/")) {
            urlPath = relativePath.split("pages/")[1];
        }

        return urlPath || undefined;
    }
}

// 테스트를 위한 mock resolver
export class MockPathResolver implements IPathResolver {
    constructor(private mockPath: string) {}

    resolveApiPath(_documentUri: vscode.Uri): string {
        return this.mockPath;
    }
}